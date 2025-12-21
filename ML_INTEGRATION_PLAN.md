# Hugging Face ML Integration Plan for SpaceCraft Planogram MVP

> **Generated**: December 21, 2025
> **Purpose**: Comprehensive analysis and roadmap for integrating Hugging Face models into the planogram application

---

## Table of Contents

1. [Architecture & Feature Map](#1-architecture--feature-map)
2. [Data Flow & System Boundaries](#2-data-flow--system-boundaries)
3. [Placement Pipeline & Constraints](#3-placement-pipeline--constraints)
4. [ML Augmentation of Existing Features](#4-ml-augmentation-of-existing-features)
5. [New ML-Enabled Features](#5-new-ml-enabled-features)
6. [Integration Surfaces & Data Contracts](#6-integration-surfaces--data-contracts)
7. [Hugging Face Model Categories](#7-hugging-face-model-categories)
8. [MVP Data & Evaluation Strategy](#8-mvp-data--evaluation-strategy)
9. [Deployment, Risk & Guardrails](#9-deployment-risk--guardrails)
10. [Roadmap & Prioritization](#10-roadmap--prioritization)
11. [Model Hosting Options](#11-model-hosting-options)
12. [Production Considerations](#12-production-considerations)

---

## 1) Architecture & Feature Map

### Tech Stack Summary

| Layer | Technology | Key Components |
|-------|------------|----------------|
| **Frontend** | Next.js 16 + React 19 | react-grid-layout, Three.js (3D), Zustand, React Query, Zod |
| **Backend** | Django 5.2 + DRF 3.15 | ViewSets, Services layer, JWT auth (cookies) |
| **Database** | SQLite (dev) / PostgreSQL | Multi-tenant with Company filtering |
| **Existing AI** | OpenAI GPT-4o-mini | `planograms/services/ai_service.py` - layout analysis |

### Core Domain Entities

```
Company (tenant)
  ├── Users (auth, roles: admin/member)
  ├── Stores (physical locations: name, address, store_code)
  │     └── Projects (groupings: "Q4 Summer Display")
  │           └── Planograms (layout instances)
  ├── Displays (fixture templates: dimensions, shelf_count)
  └── Products (static catalog: 100+ items, 21 categories)
```

### Feature Map

| Feature | Current State | ML Opportunity |
|---------|---------------|----------------|
| **Planogram Creation** | Manual category selection, auto-layout | ML-suggested categories |
| **Layout Generation** | Algorithmic (score-based placement) | ML-optimized placement |
| **Product Selection** | Manual drag-drop from sidebar | Smart recommendations |
| **AI Overview** | GPT-4o-mini text summary | Richer analysis |
| **Export** | CSV download | Compliance checking |
| **3D Visualization** | Three.js renderer | Photo comparison |

---

## 2) Data Flow & System Boundaries

### High-Level Data Flow

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              USER INPUTS                                     │
├─────────────────────────────────────────────────────────────────────────────┤
│ • Create planogram: name, season, project, display, category_ids            │
│ • Configure display: width/height/depth inches, shelf_count                  │
│ • Drag-drop products from sidebar to grid                                    │
│ • Save layout (preserve_layout=true)                                         │
│ • Request AI Overview                                                        │
└─────────────────────────────────────────────────────────────────────────────┘
                                     │
                                     ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                          FRONTEND PROCESSING                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│ • Zod validation (api-schemas.ts)                                            │
│ • React Query mutations → API calls                                          │
│ • Grid rendering (react-grid-layout)                                         │
│ • 3D preview (Three.js)                                                      │
│ • Local state (Zustand store)                                                │
└─────────────────────────────────────────────────────────────────────────────┘
                                     │
                                     ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                           API LAYER (DRF)                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│ Sync Operations:                                                             │
│   • CRUD: /api/planograms/, /api/stores/, /api/projects/                     │
│   • Layout compute: GET /api/planograms/{slug}/ → grid_service.py            │
│   • Layout save: PUT /api/planograms/{slug}/layout/                          │
│                                                                              │
│ Async/Slow Operations:                                                       │
│   • AI Overview: GET /api/planograms/{slug}/ai-overview/ → OpenAI call       │
└─────────────────────────────────────────────────────────────────────────────┘
                                     │
                                     ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                             OUTPUTS                                          │
├─────────────────────────────────────────────────────────────────────────────┤
│ • Planogram JSON (stored in DB: layout field)                                │
│ • Grid response: { grid: {cols, rows, cellWidthIn}, rows: [LayoutItem[]] }   │
│ • CSV export (frontend-generated from layout)                                │
│ • AI text summary (rendered in dialog)                                       │
│ • 3D visualization (canvas render)                                           │
└─────────────────────────────────────────────────────────────────────────────┘
```

### System Boundaries (ML Integration Points)

| Boundary | Data Available | ML-Friendly? |
|----------|----------------|--------------|
| **Product catalog** | id, name, dimensions, metrics (static) | ✅ High - stable, structured |
| **Planogram creation** | categories, season, dimensions | ✅ High - clear inputs |
| **Layout computation** | product placement, grid geometry | ⚠️ Medium - must respect rules |
| **Export/download** | CSV with positions | ✅ High - structured output |
| **Photo upload** | No current implementation | 🆕 New boundary needed |
| **Store context** | name, address, store_code | ✅ High - stable |

---

## 3) Placement Pipeline & Constraints

### Current Placement Algorithm

**Location:** `planograms/services/grid_service.py`

**Pipeline:**
1. **Input**: `products_by_category`, `grid` (cols, rows, cellWidthIn)
2. **Rank categories** by average `overall_score` (descending)
3. **Divide columns** equally among categories (e.g., 20 cols ÷ 4 cats = 5 cols each)
4. **Per row**: iterate categories, fill each section left-to-right
5. **Product selection**: sorted by margin → score, first fit placed
6. **Uniqueness**: global tracking prevents repeats (except highest-scorer can appear 2×)
7. **Output**: `{ grid: {...}, rows: [{id, name, items: [LayoutItem]}] }`

### Constraint Classification

| Constraint | Type | Description | ML-Safe? |
|------------|------|-------------|----------|
| **Cell width = 6"** | Hard | Fixed grid cell size | ❌ Do not change |
| **Cols = floor(width / 6)** | Hard | Grid geometry | ❌ Do not change |
| **Rows = shelf_count** | Hard | Physical shelves | ❌ Do not change |
| **Product width → cells** | Hard | `<12" = 1 cell; ≥12" = floor(w/6)` | ❌ Do not change |
| **Height = 1 row always** | Hard | Products span exactly 1 row | ❌ Do not change |
| **No duplicate products** | Hard | Global uniqueness (except 2× rule) | ❌ Do not change |
| **Bulky on bottom 2 rows** | Soft | `pack_height ≥ 5"` → rows ≥ 2 | ⚠️ Could be ML-guided |
| **Category column allocation** | Soft | Equal division | ✅ ML could optimize |
| **Product ranking (margin, score)** | Soft | Priority within category | ✅ ML could re-rank |
| **Side-by-side highest scorer** | Soft | Feature for visibility | ⚠️ Could be ML-guided |

### ML-Friendly vs ML-Unsafe Areas

**ML-Friendly (augmentation OK):**
- Category selection before layout
- Product ranking within constraints
- Recommendations shown to user
- Post-layout validation/scoring
- Predictive metrics (sales_velocity adjustments)

**ML-Unsafe (deterministic engine controls):**
- Grid geometry (cols/rows from dimensions)
- Cell sizing and product-to-cell mapping
- Collision detection (placement fitting)
- Uniqueness enforcement

---

## 4) ML Augmentation of Existing Features

### Ranked Feature Enhancement Opportunities

#### 4.1 Enhanced Product Ranking (High Impact, Low Risk)

**(a) What it enables:** ML-derived `overall_score` that incorporates historical patterns, store-specific trends, and category adjacency effects.

**(b) Where it plugs in:** `products/services.py` → `get_products_for_categories()` → merge with ML-predicted scores before passing to `layout_by_score()`.

**(c) Data required:**
- Current: margin, sales_velocity, seasonality, expiration_stability
- New: store_id context, regional trends, past planogram performance

**(d) Risks/limitations:**
- Cold-start for new products
- Score drift if not retrained
- Must not override hard constraints

**(e) MVP slice:** Use embeddings model to find "similar products" and transfer scores from high performers.

---

#### 4.2 Smarter Category Suggestions (High Impact, Medium Effort)

**(a) What it enables:** When creating a planogram, suggest optimal category combinations based on season + store type + display dimensions.

**(b) Where it plugs in:**
- Backend: New endpoint `/api/planograms/suggest-categories/`
- Frontend: `planogram-categories-selector.tsx` → show ML recommendations

**(c) Data required:**
- Input: season, display dimensions, store_code
- Training: historical planogram → performance correlation

**(d) Risks/limitations:**
- Limited historical data in MVP
- May need synthetic training data initially

**(e) MVP slice:** Embeddings-based similarity: "stores like yours used these categories."

---

#### 4.3 AI Overview Enhancement (Medium Impact, Low Effort)

**(a) What it enables:** Richer, structured AI analysis with:
- Quantitative metrics (space utilization %, category balance)
- Specific improvement suggestions
- Comparison to "optimal" patterns

**(b) Where it plugs in:** `planograms/services/ai_service.py` - replace or augment GPT-4o-mini with Hugging Face.

**(c) Data required:**
- Same as current (planogram + layout JSON)
- Optional: embeddings of successful layouts for comparison

**(d) Risks/limitations:**
- Latency if using large models
- Quality variance in open-source LLMs

**(e) MVP slice:** Add pre-computed metrics to prompt; keep GPT-4o-mini but structure output better.

---

#### 4.4 SKU/Product Matching from Text (Medium Impact, Medium Effort)

**(a) What it enables:** When importing products or searching, fuzzy-match product names/descriptions to existing catalog using embeddings.

**(b) Where it plugs in:**
- Backend: `products/services.py` → new `find_similar_products()` function
- Frontend: `available-products-sidebar.tsx` → enhanced search

**(c) Data required:**
- Product names (existing)
- Optional: product descriptions, brand info

**(d) Risks/limitations:**
- Embedding model selection affects quality
- Need to handle edge cases (new products not in catalog)

**(e) MVP slice:** Precompute embeddings for all products; on search, embed query and find top-k nearest.

---

#### 4.5 Layout Validation/Scoring (Medium Impact, Low Effort)

**(a) What it enables:** After manual edits, score the layout against learned "good planogram" patterns.

**(b) Where it plugs in:**
- Backend: New service `planograms/services/layout_validator.py`
- Frontend: Display score badge on grid header

**(c) Data required:**
- Current layout JSON
- Reference embeddings of high-performing layouts

**(d) Risks/limitations:**
- "Good" is subjective without real sales data
- May conflict with user intent

**(e) MVP slice:** Rule-based scoring (utilization %, category balance) + optional ML overlay.

---

## 5) New ML-Enabled Features

### 5.1 Photo → Planogram Compliance Checking

**(a) What it enables:**
Field workers photograph actual store shelves; ML compares photo to planned planogram and highlights discrepancies (wrong products, missing facings, incorrect positions).

**(b) Why it makes sense:**
- Planograms are useless if not executed correctly
- Manual compliance audits are slow and error-prone
- High business value in retail operations

**(c) New workflows/personas:**
- **Field Merchandiser**: Snap photo → see violations highlighted
- **Regional Manager**: Dashboard of compliance rates across stores
- **Planogram Author**: See real-world feedback on designs

**(d) Coexistence with MVP:**
- New "Audit" tab in planogram detail view
- New API endpoint: `POST /api/planograms/{slug}/audit/` (accepts image)
- Results: `{ compliance_score, violations: [{product, expected_position, actual_position}] }`

**Required ML:**
- Object detection to identify products in photo
- Product matching (photo → catalog item)
- Position mapping (photo coordinates → grid position)

---

### 5.2 Natural Language Planogram Queries

**(a) What it enables:**
Users ask questions like:
- "Show me all planograms with beef products in summer"
- "Which store has the best-performing frozen section?"
- "What products are missing from Store 123's endcap?"

**(b) Why it makes sense:**
- Non-technical users struggle with complex filters
- Quick insights without navigating UI
- Scales with data volume

**(c) New workflows/personas:**
- **Category Manager**: Quick analytics without reports
- **Executive**: Dashboard with chat interface
- **Support Staff**: Answer customer questions fast

**(d) Coexistence with MVP:**
- New "Ask" floating widget or dedicated page
- Backend: `/api/query/` endpoint that converts NL → API calls
- Uses existing data models (planograms, stores, products)

---

### 5.3 Auto-Generated Execution Instructions

**(a) What it enables:**
Convert planogram layout into step-by-step text/visual instructions for in-store execution:
- "Shelf 1, left side: Place 2 units of Ribeye Steaks (13" wide)"
- "Shelf 3, center: Move Chicken Wings to position 4"

**(b) Why it makes sense:**
- Store staff don't use planogram software
- Printed/mobile instructions are the reality
- Reduces execution errors

**(c) New workflows/personas:**
- **Store Manager**: Print PDF of instructions
- **Merchandiser**: Mobile app with step-by-step guide
- **Training**: Onboard new staff faster

**(d) Coexistence with MVP:**
- New "Export Instructions" button next to CSV download
- Backend: `/api/planograms/{slug}/instructions/`
- Output: Markdown/PDF with images

---

### 5.4 Predictive Facings Recommendations

**(a) What it enables:**
Given a product, suggest optimal number of facings (horizontal repetitions) based on:
- Sales velocity
- Shelf capacity
- Adjacent products
- Seasonality

**(b) Why it makes sense:**
- Facings directly impact sales and replenishment frequency
- Currently not modeled (each product placed once by default)
- High-value optimization lever

**(c) New workflows/personas:**
- **Planogram Author**: See "suggested facings: 3" per product
- **Space Planner**: Optimize shelf allocation automatically
- **Analyst**: A/B test facing counts

**(d) Coexistence with MVP:**
- Extend LayoutItem to support `facings` count
- Modify `layout_by_score()` to optionally consume predictions
- Show recommendations in product sidebar

---

### 5.5 Anomaly Detection Across Stores

**(a) What it enables:**
Flag stores/planograms that deviate significantly from expected patterns:
- "Store 45 has 3× more frozen items than similar stores"
- "Planogram X has unusual category distribution"
- "Product Y is placed in non-standard position"

**(b) Why it makes sense:**
- Catch errors in bulk planogram generation
- Identify outliers that may indicate local optimization or mistakes
- Quality assurance at scale

**(c) New workflows/personas:**
- **Regional Manager**: Weekly anomaly report
- **QA Team**: Review flagged planograms before deployment
- **Analyst**: Investigate root causes

**(d) Coexistence with MVP:**
- Background job that runs nightly
- Results stored in new `PlanogramAudit` model
- Dashboard widget showing flagged items

---

### 5.6 Synthetic Layout Generation for Non-Standard Fixtures

**(a) What it enables:**
Generate layouts for circular, half-circle, or L-shaped fixtures that the current rectangular grid can't handle.

**(b) Why it makes sense:**
- Retail uses diverse fixture types (island displays, rotundas)
- Current system only supports rectangular
- Competitive differentiator

**(c) New workflows/personas:**
- **Fixture Designer**: Define custom shapes
- **Planogram Author**: Layout products on curved surfaces
- **Visual Merchandiser**: Preview in 3D

**(d) Coexistence with MVP:**
- New `fixture_shape` field on Display model
- New grid service that handles non-rectangular geometry
- ML could learn optimal placement on curves from examples

---

## 6) Integration Surfaces & Data Contracts

### Integration Map

| Feature | Integration Point | Input Payload | Output Payload | Consumption Mode |
|---------|------------------|---------------|----------------|------------------|
| **Enhanced Ranking** | `GET /api/products/` | `{category_ids, season, store_id}` | Products with ML `predicted_score` | Auto-apply (merge) |
| **Category Suggest** | `GET /api/planograms/suggest-categories/` | `{season, display_id, store_id}` | `{suggestions: [{category_ids, confidence}]}` | Recommendation |
| **Photo Compliance** | `POST /api/planograms/{slug}/audit/` | `{image: base64}` | `{score, violations: [...]}` | Warning/report |
| **NL Query** | `POST /api/query/` | `{question: string}` | `{answer: string, sources: [...]}` | Display result |
| **Execution Instructions** | `GET /api/planograms/{slug}/instructions/` | (none) | `{markdown, pdf_url}` | Download |
| **Facings Prediction** | `GET /api/products/{id}/facings/` | `{shelf_width, adjacent_products}` | `{suggested_facings: int}` | Suggestion |
| **Anomaly Detection** | `GET /api/anomalies/` | `{store_id?, date_range?}` | `[{planogram_id, type, severity}]` | Dashboard |
| **Layout Validation** | `POST /api/planograms/{slug}/validate/` | `{layout: JSON}` | `{score, issues: [...]}` | Warning |

### Example Payload Shapes

**Photo Compliance Input:**
```json
{
  "image": "data:image/jpeg;base64,/9j/4AAQ...",
  "planogram_slug": "summer-beef-endcap"
}
```

**Photo Compliance Output:**
```json
{
  "compliance_score": 0.85,
  "violations": [
    {
      "type": "missing_product",
      "expected": {"id": 42, "name": "Ribeye Steaks"},
      "grid_position": {"x": 2, "y": 1}
    },
    {
      "type": "wrong_position",
      "product": {"id": 15, "name": "Chicken Wings"},
      "expected_position": {"x": 8, "y": 2},
      "actual_position": {"x": 10, "y": 2}
    }
  ],
  "detected_products": [...]
}
```

**Category Suggestion Output:**
```json
{
  "suggestions": [
    {
      "category_ids": [1, 6, 17],
      "categories": ["Beef", "Fresh Fish", "Shellfish"],
      "confidence": 0.92,
      "reasoning": "High summer velocity for proteins"
    },
    {
      "category_ids": [20, 21],
      "categories": ["Ice Cream", "Frozen Fruit"],
      "confidence": 0.87,
      "reasoning": "Popular combo for freezer endcaps"
    }
  ]
}
```

---

## 7) Hugging Face Model Categories

### Feature → Model Type → Output → Usage

| Feature | Model Type | Example Models | Expected Output | App Interpretation |
|---------|------------|----------------|-----------------|-------------------|
| **Photo Compliance** | Object Detection | `facebook/detr-resnet-50`, `hustvl/yolos-tiny` | Bounding boxes + labels | Map to product IDs, compare positions |
| **Photo Compliance** | Image Embeddings | `openai/clip-vit-base-patch32`, `sentence-transformers/clip-ViT-B-32` | 512-d vectors | Match detected regions to catalog images |
| **Product Matching** | Text Embeddings | `sentence-transformers/all-MiniLM-L6-v2` | 384-d vectors | Cosine similarity for fuzzy search |
| **Category Suggest** | Text Embeddings | Same as above | Embed past planogram metadata | K-NN on similar contexts |
| **NL Query** | LLM | `mistralai/Mistral-7B-Instruct-v0.2`, `meta-llama/Llama-2-7b-chat-hf` | Natural language response | Parse and display |
| **NL Query** | Text-to-SQL | `defog/sqlcoder-7b-2` | SQL query | Execute against DB |
| **Execution Instructions** | LLM | Same as NL Query | Structured markdown | Render/download |
| **Layout Validation** | Anomaly Detection | Autoencoder, Isolation Forest (sklearn) | Anomaly score | Threshold for warnings |
| **Facings Prediction** | Regression | Custom MLP or XGBoost | Integer prediction | Suggest to user |
| **Enhanced Ranking** | Embedding + Regression | Embeddings + lightweight head | Float score | Merge with existing scores |

### Model Output → Application Flow

```
Object Detection Model
    ↓
Bounding boxes: [{x, y, width, height, label, confidence}]
    ↓
Product Matcher (CLIP embeddings)
    ↓
Product IDs: [42, 15, 7, ...]
    ↓
Position Mapper (grid geometry)
    ↓
Grid coordinates: [{product_id: 42, x: 2, y: 1}, ...]
    ↓
Comparator (expected vs actual)
    ↓
Violations: [{type: "wrong_position", ...}]
```

---

## 8) MVP Data & Evaluation Strategy

### Per-Feature Feasibility Assessment

#### Photo Compliance Checking

| Aspect | Details |
|--------|---------|
| **Minimum data** | 50-100 annotated shelf photos (bounding boxes, product labels) |
| **Labeling strategy** | Manual annotation of pilot stores; use Label Studio |
| **Synthetic data** | Render 3D planograms as "ideal" photos; add noise |
| **Offline metrics** | mAP@0.5 for detection; product ID accuracy |
| **Online metrics** | Time-to-audit reduction; violation detection rate |
| **Cold-start** | Use pre-trained DETR + CLIP zero-shot matching |

#### Product Matching (Text Search)

| Aspect | Details |
|--------|---------|
| **Minimum data** | Existing 100+ product names (already available) |
| **Labeling strategy** | None needed - unsupervised embeddings |
| **Offline metrics** | Recall@5 on held-out name variations |
| **Online metrics** | Search success rate (user selects result) |
| **Cold-start** | Pre-trained sentence-transformers work immediately |

#### Category Suggestions

| Aspect | Details |
|--------|---------|
| **Minimum data** | 20+ historical planograms with performance labels |
| **Labeling strategy** | Weak supervision: planograms marked "used" = positive |
| **Synthetic data** | Generate random combos, score by rule heuristics |
| **Offline metrics** | Precision@3 for suggested categories |
| **Online metrics** | Suggestion acceptance rate |

#### NL Query

| Aspect | Details |
|--------|---------|
| **Minimum data** | 50 example question-answer pairs |
| **Labeling strategy** | Manual creation of Q&A based on common queries |
| **Offline metrics** | Answer relevance (BLEU, human eval) |
| **Online metrics** | User satisfaction; follow-up question rate |
| **Cold-start** | Use RAG with existing DB; no training needed |

---

## 9) Deployment, Risk & Guardrails

### Latency/Cost Tradeoffs

| Feature | Acceptable Latency | Strategy |
|---------|-------------------|----------|
| **Photo Compliance** | 5-10 seconds | Async job; show loading indicator |
| **Product Search** | < 200ms | Pre-compute embeddings; local vector search |
| **Category Suggest** | < 1 second | Cache frequent combos; async background |
| **NL Query** | 2-5 seconds | Streaming response; show "thinking" |
| **Layout Validation** | < 500ms | Lightweight model; pre-compute features |

### Failure Modes & Mitigations

| Failure Mode | Mitigation |
|--------------|------------|
| **Model timeout** | Fallback to rule-based logic; show "unavailable" gracefully |
| **Low confidence prediction** | Threshold at 0.7; show "uncertain" badge; let user decide |
| **Wrong product detected** | Human-in-the-loop review; allow corrections |
| **API quota exceeded** | Rate limiting; queue system; degrade to cached results |
| **Model drift** | Monitor accuracy metrics; retrain quarterly |
| **Adversarial input** | Input validation; sanitize image sizes; limit text length |

### Human-in-the-Loop Patterns

| Feature | HITL Pattern |
|---------|--------------|
| **Photo Compliance** | Show violations as suggestions; user confirms/dismisses |
| **Category Suggest** | Recommendations appear as chips; user selects/ignores |
| **Facings Prediction** | Show number in input field; user can override |
| **Layout Validation** | Warnings panel; user chooses to fix or acknowledge |
| **NL Query** | Answer includes "Edit query" option |

### Confidence Thresholds

| Model Type | Low Confidence | Medium | High | Action |
|------------|----------------|--------|------|--------|
| Object Detection | < 0.5 | 0.5-0.8 | > 0.8 | Below 0.5: don't show |
| Text Matching | < 0.7 | 0.7-0.9 | > 0.9 | Below 0.7: show "uncertain" |
| Classification | < 0.6 | 0.6-0.85 | > 0.85 | Below 0.6: fall back |

---

## 10) Roadmap & Prioritization

### Phased Roadmap

#### Phase 1: Fast Wins Using Existing Data

| Task | Effort | Impact | Dependencies |
|------|--------|--------|--------------|
| **1.1 Product text search with embeddings** | Small | High | None - use existing product names |
| **1.2 Enhanced AI Overview prompting** | Small | Medium | Existing ai_service.py |
| **1.3 Layout validation rules** | Medium | Medium | Existing layout data |
| **1.4 Pre-compute product embeddings** | Small | Medium | Product catalog |
| **1.5 Historical data pipeline** | Medium | High | Sales data access |

#### Phase 2: New ML-Enabled Features

| Task | Effort | Impact | Dependencies |
|------|--------|--------|--------------|
| **2.1 Category suggestion endpoint** | Medium | High | Collect usage data from Phase 1 |
| **2.2 NL query (RAG-based)** | Medium | High | Schema documentation |
| **2.3 Execution instructions export** | Medium | Medium | Layout data + LLM |
| **2.4 Facings prediction prototype** | Large | High | Historical sales data |

#### Phase 3: Advanced Intelligence & Scale

| Task | Effort | Impact | Dependencies |
|------|--------|--------|--------------|
| **3.1 Photo compliance MVP** | Large | Very High | Annotated images, object detection |
| **3.2 Anomaly detection system** | Large | Medium | Multi-store data |
| **3.3 Non-rectangular fixtures** | Large | Medium | New geometry engine |
| **3.4 Fine-tuned ranking models** | Large | High | Performance feedback loop |

---

### Phase 1 Task Breakdown (Weeks 1-2)

**Week 1: Foundation**

| Day | Task | Notes |
|-----|------|-------|
| 1 | Set up Hugging Face Inference API; create `MLService` base class | Error handling, retries, timeouts |
| 2 | Design historical data schema; create `SalesMetrics` model | Link products ↔ planograms ↔ sales |
| 3 | Implement product embedding service with caching | Use `sentence-transformers/all-MiniLM-L6-v2` |
| 4 | Add `pgvector` to PostgreSQL; store embeddings | Production-ready vector search |
| 5 | Implement `/api/products/search/` with embedding fallback | If ML fails, fall back to text search |

**Week 2: Integration + Validation**

| Day | Task | Notes |
|-----|------|-------|
| 1 | Connect historical sales data to product metrics | Update `overall_score` calculation |
| 2 | Implement layout validation service with ML-informed rules | Use sales data to weight rules |
| 3 | Enhance AI Overview with computed metrics | Space utilization, category balance |
| 4 | Add monitoring: latency tracking, error rates | Datadog/Prometheus compatible |
| 5 | Load testing; documentation; Phase 1 review | Ensure <200ms p95 for search |

---

### Definition of Done

#### Phase 1 Complete:
- [ ] Product search returns results in < 200ms
- [ ] AI Overview includes quantitative metrics
- [ ] Layout validation shows at least 3 rule-based warnings
- [ ] Historical data pipeline ingesting sales data
- [ ] All changes pass existing linting and tests
- [ ] No user-facing errors from ML service failures

#### Phase 2 Complete:
- [ ] Category suggestions shown during planogram creation
- [ ] NL query answers basic questions (list, filter, count)
- [ ] Export instructions generates valid markdown
- [ ] Facings prediction shows suggested values
- [ ] User acceptance rate tracked in analytics

#### Phase 3 Complete:
- [ ] Photo compliance detects 80%+ of products in test images
- [ ] Anomaly detection flags outliers with < 10% false positive rate
- [ ] Non-rectangular fixtures render correctly in 3D
- [ ] ML-enhanced ranking outperforms rule-based in A/B test

---

## 11) Model Hosting Options

### Option A: Hugging Face Inference API (Serverless)

**How it works:** HTTP requests to Hugging Face's servers. They run the model and return results.

```
Your Backend → HTTP Request → Hugging Face Cloud → Response
```

| Aspect | Details |
|--------|---------|
| **Setup** | Just an API key |
| **Cost** | Free tier (rate-limited) or $0.06-0.60/1K requests |
| **Latency** | 100-500ms (cold start can be 2-5s) |
| **Models available** | 200K+ models on Hub |
| **Scaling** | Automatic |
| **Pros** | Zero ops, fast to start, always latest models |
| **Cons** | Cold starts, rate limits, data leaves your infra |

**Best for:** Prototyping, low-medium volume, non-latency-critical features

---

### Option B: Hugging Face Inference Endpoints (Dedicated)

**How it works:** Deploy a model to a dedicated GPU instance managed by Hugging Face.

```
Your Backend → HTTP Request → Your Dedicated HF Instance → Response
```

| Aspect | Details |
|--------|---------|
| **Setup** | Click-deploy from Hub, or Docker |
| **Cost** | ~$0.06/hr (CPU) to $1.30/hr (GPU) |
| **Latency** | 50-200ms (always warm) |
| **Scaling** | Manual or autoscale rules |
| **Pros** | Predictable latency, your own instance |
| **Cons** | Pay even when idle, more config |

**Best for:** Production workloads with consistent traffic

---

### Option C: Self-Hosted (Your Infrastructure)

**How it works:** Run models on your own servers using `transformers`, `vLLM`, or `TGI`.

```
Your Backend → Your GPU Server (EC2, etc.) → Response
```

| Aspect | Details |
|--------|---------|
| **Setup** | Significant - Docker, GPU drivers, model serving |
| **Cost** | AWS GPU: $0.50-3.00/hr; amortizes at scale |
| **Latency** | 20-100ms (full control) |
| **Scaling** | You manage (Kubernetes, etc.) |
| **Pros** | Full control, data stays internal |
| **Cons** | DevOps burden, GPU expertise needed |

**Best for:** High volume, strict data privacy, cost optimization at scale

---

### Option D: Hybrid (Recommended for Production)

**How it works:** Run lightweight models locally; call remote APIs for heavy models.

```
Embeddings: Backend cache (fast, free)
LLMs: Hugging Face API (when needed)
```

| Feature | Recommended Hosting | Rationale |
|---------|--------------------| -----------|
| **Product search embeddings** | Self-hosted (backend cache) | Run once at startup; no ongoing API calls |
| **Category suggestions** | HF Inference API → Endpoints | Start serverless, migrate when traffic grows |
| **NL Query (LLM)** | HF Inference API | Acceptable latency for async queries |
| **Photo compliance** | HF Inference Endpoints | Needs consistent latency, GPU required |
| **Layout validation** | Self-hosted (sklearn) | Lightweight, no GPU needed |

---

## 12) Production Considerations

### Infrastructure Components

| Component | Recommendation |
|-----------|----------------|
| **Embedding storage** | PostgreSQL with `pgvector` extension OR Pinecone/Qdrant |
| **Model caching** | Redis for hot embeddings; precompute on catalog changes |
| **Async jobs** | Celery + Redis for ML inference > 500ms |
| **Error handling** | Circuit breaker pattern; graceful degradation |
| **Monitoring** | Track inference latency, error rates, prediction distributions |
| **A/B testing** | Feature flags to compare ML vs rule-based outcomes |

### Historical Data Pipeline

```
┌─────────────────────────────────────────────────────────────────────┐
│                    HISTORICAL DATA PIPELINE                         │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  External Source          ETL Job              Django Models         │
│  ─────────────           ────────             ──────────────         │
│                                                                      │
│  Sales CSV/API  ────────► Celery Task ──────► ProductSalesMetric    │
│                           (daily)              - product_id          │
│                                                - store_id            │
│                                                - period (week/month) │
│                                                - units_sold          │
│                                                - revenue             │
│                                                                      │
│  Planogram Usage ───────► Event Stream ─────► PlanogramPerformance  │
│  (existing logs)                               - planogram_id        │
│                                                - execution_rate      │
│                                                - compliance_score    │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    ML TRAINING DATA                                  │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  Feature Engineering:                                                │
│  - Product features: dimensions, category, base metrics              │
│  - Context features: season, store type, display dimensions          │
│  - Historical features: avg sales velocity, seasonality curves       │
│                                                                      │
│  Labels:                                                             │
│  - Ranking: actual_sales_rank (from historical data)                 │
│  - Facings: optimal_facings (derived from sales/shelf-days)          │
│  - Layout quality: planogram_performance_score                       │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

### Photo Collection Strategy (Phase 3)

Since no existing photos are available:

| Stage | Action | Timeline |
|-------|--------|----------|
| **Pre-pilot** | Define annotation schema (product boxes, shelf regions) | Before collection |
| **Pilot** | Collect 100-200 photos from 2-3 stores | 2-4 weeks |
| **Annotation** | Label with Label Studio or Scale AI | 1-2 weeks |
| **Synthetic augmentation** | Render 3D planograms as training images | Parallel |
| **Model training** | Fine-tune DETR or YOLO on your products | 1-2 weeks |
| **Validation** | Test on held-out store | Before production |

**Synthetic data strategy:** The existing Three.js 3D view can generate "ideal" planogram images. Add lighting variation, camera angle noise, and partial occlusions to create training data without visiting stores.

---

## Summary

This plan provides a phased approach to integrating Hugging Face ML capabilities into the SpaceCraft planogram application:

1. **Phase 1** focuses on quick wins using existing data (embeddings-based search, enhanced AI overview, layout validation)
2. **Phase 2** introduces new ML-powered features (category suggestions, NL query, facings prediction)
3. **Phase 3** tackles advanced capabilities requiring new data collection (photo compliance, anomaly detection)

Key principles:
- ML **augments** the deterministic placement engine, never replaces hard constraints
- Human-in-the-loop for all predictions; users confirm or override
- Graceful degradation when ML services fail
- Start with Hugging Face Inference API, migrate to dedicated endpoints as traffic grows

The historical sales data availability significantly expands training possibilities, while the lack of existing photos means photo compliance moves to Phase 3 with a structured collection plan.
