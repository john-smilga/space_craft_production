(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/features/planogram/store/planogram-slice.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "usePlanogramStore",
    ()=>usePlanogramStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/react.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/middleware.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$zustand$2f$create$2d$selectors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/zustand/create-selectors.ts [app-client] (ecmascript)");
;
;
;
const usePlanogramStoreBase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["create"])()((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["devtools"])((set)=>({
        // Form state
        name: '',
        isEditingName: false,
        selectedDisplay: '',
        season: 'summer',
        shelfCount: 1,
        widthIn: 0,
        heightIn: 0,
        selectedCategoryIds: [],
        // Layout state
        gridData: null,
        rowLayouts: {},
        loading: true,
        skipNextInitialization: false,
        // UI state
        rowNotifications: {},
        // Available Products state
        availableItems: [],
        loadingAvailableItems: false,
        selectedAvailableItems: new Map(),
        targetRowId: null,
        // Sidebar state
        sidebarOpen: false,
        sidebarExpanded: false,
        availableProductsSidebarOpen: false,
        availableProductsSidebarExpanded: false,
        // Download state
        downloadLoading: false,
        // AI state
        aiDialogOpen: false,
        aiLoading: false,
        aiError: null,
        aiOverview: null,
        // Form actions
        setName: (name)=>set({
                name
            }, false, 'planogram/setName'),
        setIsEditingName: (isEditing)=>set({
                isEditingName: isEditing
            }, false, 'planogram/setIsEditingName'),
        setSelectedDisplay: (display)=>set({
                selectedDisplay: display
            }, false, 'planogram/setSelectedDisplay'),
        setSeason: (season)=>set({
                season
            }, false, 'planogram/setSeason'),
        setShelfCount: (count)=>set({
                shelfCount: count
            }, false, 'planogram/setShelfCount'),
        setWidthIn: (width)=>set({
                widthIn: width
            }, false, 'planogram/setWidthIn'),
        setHeightIn: (height)=>set({
                heightIn: height
            }, false, 'planogram/setHeightIn'),
        setSelectedCategoryIds: (ids)=>set({
                selectedCategoryIds: ids
            }, false, 'planogram/setSelectedCategoryIds'),
        toggleCategory: (categoryId)=>set((state)=>({
                    selectedCategoryIds: state.selectedCategoryIds.includes(categoryId) ? state.selectedCategoryIds.filter((id)=>id !== categoryId) : [
                        ...state.selectedCategoryIds,
                        categoryId
                    ]
                }), false, 'planogram/toggleCategory'),
        initializeForm: (data)=>set((state)=>({
                    name: data.name !== undefined ? data.name : state.name,
                    selectedDisplay: data.display_id || state.selectedDisplay,
                    season: data.season || state.season,
                    shelfCount: data.shelf_count && data.shelf_count > 0 ? data.shelf_count : state.shelfCount || 1,
                    widthIn: data.width_in || state.widthIn,
                    heightIn: data.height_in || state.heightIn,
                    selectedCategoryIds: data.category_ids || state.selectedCategoryIds
                }), false, 'planogram/initializeForm'),
        resetForm: ()=>set({
                name: '',
                isEditingName: false,
                selectedDisplay: '',
                season: 'summer',
                shelfCount: 1,
                widthIn: 0,
                heightIn: 0,
                selectedCategoryIds: []
            }, false, 'planogram/resetForm'),
        // Layout actions
        setGridData: (data)=>set({
                gridData: data
            }, false, 'planogram/setGridData'),
        setRowLayouts: (layouts)=>set({
                rowLayouts: layouts
            }, false, 'planogram/setRowLayouts'),
        updateRowLayout: (rowId, items)=>set((state)=>({
                    rowLayouts: {
                        ...state.rowLayouts,
                        [rowId]: items
                    }
                }), false, 'planogram/updateRowLayout'),
        setLoading: (loading)=>set({
                loading
            }, false, 'planogram/setLoading'),
        setSkipNextInitialization: (skip)=>set({
                skipNextInitialization: skip
            }, false, 'planogram/setSkipNextInitialization'),
        initializeLayouts: (layout)=>set((state)=>{
                if (state.skipNextInitialization) {
                    return {
                        skipNextInitialization: false
                    };
                }
                const layouts = {};
                layout.rows.forEach((row)=>{
                    layouts[row.id] = row.items.map((item)=>({
                            ...item,
                            meta: item.meta || {
                                id: parseInt(item.i),
                                name: 'Unknown',
                                category: '',
                                score: 0,
                                pack_width_in: 0,
                                pack_height_in: 0
                            }
                        }));
                });
                return {
                    gridData: layout,
                    rowLayouts: layouts,
                    loading: false
                };
            }, false, 'planogram/initializeLayouts'),
        // UI actions
        setRowNotification: (rowId, message)=>set((state)=>{
                const notifications = {
                    ...state.rowNotifications
                };
                if (message === null) {
                    delete notifications[rowId];
                } else {
                    notifications[rowId] = message;
                }
                return {
                    rowNotifications: notifications
                };
            }, false, 'planogram/setRowNotification'),
        clearRowNotifications: ()=>set({
                rowNotifications: {}
            }, false, 'planogram/clearRowNotifications'),
        // Available Products actions
        setAvailableItems: (items)=>set({
                availableItems: items
            }, false, 'planogram/setAvailableItems'),
        setLoadingAvailableItems: (loading)=>set({
                loadingAvailableItems: loading
            }, false, 'planogram/setLoadingAvailableItems'),
        incrementItemQuantity: (itemId)=>set((state)=>{
                const newMap = new Map(state.selectedAvailableItems);
                const currentQty = newMap.get(itemId) || 0;
                newMap.set(itemId, currentQty + 1);
                return {
                    selectedAvailableItems: newMap
                };
            }, false, 'planogram/incrementItemQuantity'),
        decrementItemQuantity: (itemId)=>set((state)=>{
                const newMap = new Map(state.selectedAvailableItems);
                const currentQty = newMap.get(itemId) || 0;
                if (currentQty <= 1) {
                    newMap.delete(itemId);
                } else {
                    newMap.set(itemId, currentQty - 1);
                }
                return {
                    selectedAvailableItems: newMap
                };
            }, false, 'planogram/decrementItemQuantity'),
        setSelectedAvailableItems: (items)=>set({
                selectedAvailableItems: items
            }, false, 'planogram/setSelectedAvailableItems'),
        clearSelectedAvailableItems: ()=>set({
                selectedAvailableItems: new Map()
            }, false, 'planogram/clearSelectedAvailableItems'),
        setTargetRowId: (rowId)=>set({
                targetRowId: rowId
            }, false, 'planogram/setTargetRowId'),
        openAvailableProductsSidebar: (rowId)=>{
            set({
                targetRowId: rowId,
                selectedAvailableItems: new Map(),
                availableProductsSidebarOpen: true
            }, false, 'planogram/openAvailableProductsSidebar');
        },
        closeAvailableProductsSidebar: ()=>{
            set({
                selectedAvailableItems: new Map(),
                availableProductsSidebarOpen: false
            }, false, 'planogram/closeAvailableProductsSidebar');
        },
        // Sidebar actions
        setSidebarOpen: (open)=>set({
                sidebarOpen: open
            }, false, 'planogram/setSidebarOpen'),
        setSidebarExpanded: (expanded)=>set({
                sidebarExpanded: expanded
            }, false, 'planogram/setSidebarExpanded'),
        toggleSidebar: ()=>set((state)=>({
                    sidebarOpen: !state.sidebarOpen
                }), false, 'planogram/toggleSidebar'),
        toggleSidebarExpand: ()=>set((state)=>({
                    sidebarExpanded: !state.sidebarExpanded
                }), false, 'planogram/toggleSidebarExpand'),
        setAvailableProductsSidebarOpen: (open)=>set({
                availableProductsSidebarOpen: open
            }, false, 'planogram/setAvailableProductsSidebarOpen'),
        setAvailableProductsSidebarExpanded: (expanded)=>set({
                availableProductsSidebarExpanded: expanded
            }, false, 'planogram/setAvailableProductsSidebarExpanded'),
        toggleAvailableProductsSidebar: ()=>set((state)=>({
                    availableProductsSidebarOpen: !state.availableProductsSidebarOpen
                }), false, 'planogram/toggleAvailableProductsSidebar'),
        toggleAvailableProductsSidebarExpand: ()=>set((state)=>({
                    availableProductsSidebarExpanded: !state.availableProductsSidebarExpanded
                }), false, 'planogram/toggleAvailableProductsSidebarExpand'),
        // Download actions
        setDownloadLoading: (loading)=>set({
                downloadLoading: loading
            }, false, 'planogram/setDownloadLoading'),
        downloadPlanogram: async (planogram, gridData)=>{
            set({
                downloadLoading: true
            }, false, 'planogram/downloadStart');
            try {
                const { generatePlanogramCSV } = await __turbopack_context__.A("[project]/lib/planogramCSV.ts [app-client] (ecmascript, async loader)");
                const csvContent = generatePlanogramCSV(planogram, gridData);
                const blob = new Blob([
                    csvContent
                ], {
                    type: 'text/csv'
                });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                const dateStr = new Date().toISOString().split('T')[0];
                a.download = `${planogram.name.replace(/[^a-z0-9]/gi, '_')}-${dateStr}.csv`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
                const toast = (await __turbopack_context__.A("[project]/node_modules/react-hot-toast/dist/index.mjs [app-client] (ecmascript, async loader)")).default;
                toast.success('Planogram downloaded successfully');
            } catch  {
                const toast = (await __turbopack_context__.A("[project]/node_modules/react-hot-toast/dist/index.mjs [app-client] (ecmascript, async loader)")).default;
                toast.error('Failed to download planogram');
            } finally{
                set({
                    downloadLoading: false
                }, false, 'planogram/downloadComplete');
            }
        },
        // AI actions
        setAIDialogOpen: (open)=>set({
                aiDialogOpen: open
            }, false, 'planogram/setAIDialogOpen'),
        setAILoading: (loading)=>set({
                aiLoading: loading
            }, false, 'planogram/setAILoading'),
        setAIError: (error)=>set({
                aiError: error
            }, false, 'planogram/setAIError'),
        setAIOverview: (overview)=>set({
                aiOverview: overview
            }, false, 'planogram/setAIOverview'),
        resetAI: ()=>set({
                aiLoading: false,
                aiError: null,
                aiOverview: null
            }, false, 'planogram/resetAI')
    }), {
    name: 'PlanogramStore'
}));
const usePlanogramStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$zustand$2f$create$2d$selectors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createSelectors"])(usePlanogramStoreBase);
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/features/planogram/store/index.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$planogram$2d$slice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/planogram/store/planogram-slice.ts [app-client] (ecmascript)");
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/features/planogram/queries/use-planogram-query.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "usePlanogramQuery",
    ()=>usePlanogramQuery
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/axios.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$generated$2f$api$2d$schemas$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/generated/api-schemas.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/features/planogram/store/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$planogram$2d$slice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/planogram/store/planogram-slice.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
;
;
;
;
async function fetchPlanogram(slug) {
    const { data } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`/planograms/${slug}/`);
    const validatedPlanogram = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$generated$2f$api$2d$schemas$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Planogram"].parse(data);
    return {
        planogram: validatedPlanogram,
        layout: validatedPlanogram.layout
    };
}
function usePlanogramQuery(slug) {
    _s();
    const initializeForm = __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$planogram$2d$slice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramStore"].use.initializeForm();
    const initializeLayouts = __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$planogram$2d$slice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramStore"].use.initializeLayouts();
    const setLoading = __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$planogram$2d$slice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramStore"].use.setLoading();
    const query = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            'planograms',
            slug
        ],
        queryFn: {
            "usePlanogramQuery.useQuery[query]": ()=>fetchPlanogram(slug)
        }["usePlanogramQuery.useQuery[query]"],
        enabled: !!slug,
        staleTime: 1000 * 60 * 5
    });
    // Initialize form and layouts when data changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "usePlanogramQuery.useEffect": ()=>{
            if (query.data) {
                const planogram = query.data.planogram;
                const displayId = planogram.display?.toString() || undefined;
                initializeForm({
                    name: planogram.name,
                    display_id: displayId,
                    season: planogram.season,
                    shelf_count: planogram.shelf_count,
                    width_in: parseFloat(planogram.width_in),
                    height_in: parseFloat(planogram.height_in),
                    category_ids: Array.isArray(planogram.category_ids) ? planogram.category_ids : []
                });
            }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }
    }["usePlanogramQuery.useEffect"], [
        query.data?.planogram?.id
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "usePlanogramQuery.useEffect": ()=>{
            if (query.data?.layout) {
                initializeLayouts(query.data.layout);
            } else if (!query.isLoading) {
                setLoading(false);
            }
        }
    }["usePlanogramQuery.useEffect"], [
        query.data?.layout,
        query.isLoading,
        initializeLayouts,
        setLoading
    ]);
    return query;
}
_s(usePlanogramQuery, "a2WYGfBTK2h5SdHXDFlUzH61Ec8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/features/planogram/queries/use-planograms-query.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "usePlanogramsQuery",
    ()=>usePlanogramsQuery
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/axios.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$react$2d$query$2f$hooks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/react-query/hooks.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$generated$2f$api$2d$schemas$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/generated/api-schemas.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
;
;
function usePlanogramsQuery() {
    _s();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$react$2d$query$2f$hooks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePaginatedQuery"])([
        'planograms'
    ], {
        "usePlanogramsQuery.usePaginatedQuery": async ()=>{
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get('/planograms/');
            return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$generated$2f$api$2d$schemas$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PaginatedPlanogramListList"].parse(response.data);
        }
    }["usePlanogramsQuery.usePaginatedQuery"]);
}
_s(usePlanogramsQuery, "8dRrW1kK8lRPrshcMFzQabx/L7w=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$react$2d$query$2f$hooks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePaginatedQuery"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/features/planogram/queries/use-create-planogram-mutation.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useCreatePlanogramMutation",
    ()=>useCreatePlanogramMutation
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/axios.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$react$2d$query$2f$hooks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/react-query/hooks.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$generated$2f$api$2d$schemas$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/generated/api-schemas.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
;
;
function useCreatePlanogramMutation() {
    _s();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$react$2d$query$2f$hooks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppMutation"])({
        "useCreatePlanogramMutation.useAppMutation": async (input)=>{
            const validatedInput = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$generated$2f$api$2d$schemas$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PlanogramCreateRequest"].parse(input);
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post('/planograms/', validatedInput);
            const validatedPlanogram = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$generated$2f$api$2d$schemas$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Planogram"].parse(response.data);
            // Transform to match expected structure (same as GET query)
            return {
                planogram: validatedPlanogram,
                layout: validatedPlanogram.layout
            };
        }
    }["useCreatePlanogramMutation.useAppMutation"], {
        successMessage: 'Planogram created successfully',
        errorMessage: 'Failed to create planogram',
        invalidateQueries: [
            [
                'planograms'
            ],
            [
                'projects'
            ]
        ]
    });
}
_s(useCreatePlanogramMutation, "Rrkdb75pulkTFL9gRtHlkUL7GMU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$react$2d$query$2f$hooks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppMutation"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/features/planogram/queries/use-update-planogram-mutation.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useUpdatePlanogramMutation",
    ()=>useUpdatePlanogramMutation
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/axios.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$react$2d$query$2f$hooks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/react-query/hooks.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$generated$2f$api$2d$schemas$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/generated/api-schemas.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
;
;
;
function useUpdatePlanogramMutation() {
    _s();
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$react$2d$query$2f$hooks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppMutation"])({
        "useUpdatePlanogramMutation.useAppMutation": async (variables)=>{
            const { slug, ...data } = variables;
            const validatedInput = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$generated$2f$api$2d$schemas$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PlanogramUpdateRequest"].parse(data);
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].put(`/planograms/${slug}/`, validatedInput);
            return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$generated$2f$api$2d$schemas$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PlanogramUpdate"].parse(response.data);
        }
    }["useUpdatePlanogramMutation.useAppMutation"], {
        successMessage: 'Planogram updated successfully',
        errorMessage: 'Failed to update planogram',
        invalidateQueries: [
            [
                'planograms'
            ]
        ],
        onSuccess: {
            "useUpdatePlanogramMutation.useAppMutation": (data)=>{
                queryClient.setQueryData([
                    'planograms',
                    data.name
                ], data);
                queryClient.invalidateQueries({
                    queryKey: [
                        'planograms',
                        data.name
                    ]
                });
            }
        }["useUpdatePlanogramMutation.useAppMutation"]
    });
}
_s(useUpdatePlanogramMutation, "PCT2dylvgWBOLOLa2HpT5W+s9FU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$react$2d$query$2f$hooks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppMutation"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/features/planogram/queries/use-delete-planogram-mutation.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useDeletePlanogramMutation",
    ()=>useDeletePlanogramMutation
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/axios.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useMutation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-hot-toast/dist/index.mjs [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
;
;
;
function useDeletePlanogramMutation() {
    _s();
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: {
            "useDeletePlanogramMutation.useMutation": async (variables)=>{
                await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].delete(`/planograms/${variables.slug}/`);
            }
        }["useDeletePlanogramMutation.useMutation"],
        onSuccess: {
            "useDeletePlanogramMutation.useMutation": (_data, variables)=>{
                queryClient.removeQueries({
                    queryKey: [
                        'planograms',
                        variables.slug
                    ]
                });
                queryClient.invalidateQueries({
                    queryKey: [
                        'planograms'
                    ]
                });
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].success('Planogram deleted successfully');
            }
        }["useDeletePlanogramMutation.useMutation"],
        onError: {
            "useDeletePlanogramMutation.useMutation": (error)=>{
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].error(error.message || 'Failed to delete planogram');
            }
        }["useDeletePlanogramMutation.useMutation"]
    });
}
_s(useDeletePlanogramMutation, "YK0wzM21ECnncaq5SECwU+/SVdQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/features/planogram/queries/use-ai-overview-mutation.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useAIOverviewMutation",
    ()=>useAIOverviewMutation
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useMutation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/axios.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$generated$2f$api$2d$schemas$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/generated/api-schemas.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/features/planogram/store/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$planogram$2d$slice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/planogram/store/planogram-slice.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
;
;
;
async function fetchAIOverview(variables) {
    const { data } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post(`/planograms/${variables.slug}/ai-overview/`);
    const validatedResponse = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$generated$2f$api$2d$schemas$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AIOverviewResponse"].parse(data);
    return validatedResponse.overview;
}
function useAIOverviewMutation() {
    _s();
    const setAILoading = __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$planogram$2d$slice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramStore"].use.setAILoading();
    const setAIError = __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$planogram$2d$slice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramStore"].use.setAIError();
    const setAIOverview = __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$planogram$2d$slice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramStore"].use.setAIOverview();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: fetchAIOverview,
        onMutate: {
            "useAIOverviewMutation.useMutation": ()=>{
                setAILoading(true);
                setAIError(null);
            }
        }["useAIOverviewMutation.useMutation"],
        onSuccess: {
            "useAIOverviewMutation.useMutation": (data)=>{
                setAIOverview(data);
                setAILoading(false);
            }
        }["useAIOverviewMutation.useMutation"],
        onError: {
            "useAIOverviewMutation.useMutation": (error)=>{
                if (error instanceof Error) {
                    setAIError(error.message || 'Failed to generate AI overview');
                } else {
                    setAIError('Failed to generate AI overview');
                }
                setAILoading(false);
            }
        }["useAIOverviewMutation.useMutation"]
    });
}
_s(useAIOverviewMutation, "wwwtpB20p0aLiHIvSy5P98MwIUg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/features/planogram/queries/use-available-products-query.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useAvailableProductsQuery",
    ()=>useAvailableProductsQuery
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/axios.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$generated$2f$api$2d$schemas$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/generated/api-schemas.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/features/planogram/store/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$planogram$2d$slice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/planogram/store/planogram-slice.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
;
;
;
;
async function fetchAvailableProducts(params) {
    if (params.categoryIds.length === 0) {
        return [];
    }
    const categoryIdsStr = params.categoryIds.join(',');
    const { data } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`/products/by-categories/?category_ids=${categoryIdsStr}&season=${params.season}`);
    const validatedResponse = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$generated$2f$api$2d$schemas$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ProductListResponse"].parse(data);
    const products = validatedResponse.products || [];
    return products.map((product)=>({
            id: product.id,
            name: product.name,
            category: product.category || 'Unknown',
            color: product.color || '#9ca3af',
            score: product.overall_score || 0,
            margin: product.margin || 0,
            pack_width_in: product.pack_width_in,
            pack_height_in: product.pack_height_in
        }));
}
function useAvailableProductsQuery(params) {
    _s();
    const setAvailableItems = __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$planogram$2d$slice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramStore"].use.setAvailableItems();
    const setLoadingAvailableItems = __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$planogram$2d$slice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramStore"].use.setLoadingAvailableItems();
    const query = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            'available-products',
            params.categoryIds,
            params.season
        ],
        queryFn: {
            "useAvailableProductsQuery.useQuery[query]": ()=>fetchAvailableProducts(params)
        }["useAvailableProductsQuery.useQuery[query]"],
        enabled: params.categoryIds.length > 0,
        staleTime: 1000 * 60 * 10
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useAvailableProductsQuery.useEffect": ()=>{
            setLoadingAvailableItems(query.isLoading);
        }
    }["useAvailableProductsQuery.useEffect"], [
        query.isLoading,
        setLoadingAvailableItems
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useAvailableProductsQuery.useEffect": ()=>{
            if (query.data) {
                setAvailableItems(query.data);
            }
        }
    }["useAvailableProductsQuery.useEffect"], [
        query.data,
        setAvailableItems
    ]);
    return query;
}
_s(useAvailableProductsQuery, "a2WYGfBTK2h5SdHXDFlUzH61Ec8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/features/planogram/queries/index.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$queries$2f$use$2d$planogram$2d$query$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/planogram/queries/use-planogram-query.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$queries$2f$use$2d$planograms$2d$query$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/planogram/queries/use-planograms-query.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$queries$2f$use$2d$create$2d$planogram$2d$mutation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/planogram/queries/use-create-planogram-mutation.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$queries$2f$use$2d$update$2d$planogram$2d$mutation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/planogram/queries/use-update-planogram-mutation.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$queries$2f$use$2d$delete$2d$planogram$2d$mutation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/planogram/queries/use-delete-planogram-mutation.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$queries$2f$use$2d$ai$2d$overview$2d$mutation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/planogram/queries/use-ai-overview-mutation.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$queries$2f$use$2d$available$2d$products$2d$query$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/planogram/queries/use-available-products-query.ts [app-client] (ecmascript)");
;
;
;
;
;
;
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/features/displays/queries/use-displays-query.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useDisplaysQuery",
    ()=>useDisplaysQuery
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/axios.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$react$2d$query$2f$hooks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/react-query/hooks.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$generated$2f$api$2d$schemas$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/generated/api-schemas.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
;
;
function useDisplaysQuery() {
    _s();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$react$2d$query$2f$hooks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePaginatedQuery"])([
        'displays'
    ], {
        "useDisplaysQuery.usePaginatedQuery": async ()=>{
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get('/displays/');
            return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$generated$2f$api$2d$schemas$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PaginatedDisplayListList"].parse(response.data);
        }
    }["useDisplaysQuery.usePaginatedQuery"]);
}
_s(useDisplaysQuery, "8dRrW1kK8lRPrshcMFzQabx/L7w=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$react$2d$query$2f$hooks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePaginatedQuery"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/features/displays/queries/use-display-query.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useDisplayQuery",
    ()=>useDisplayQuery
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/axios.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$generated$2f$api$2d$schemas$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/generated/api-schemas.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
;
;
function useDisplayQuery(displaySlug) {
    _s();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            'display',
            displaySlug
        ],
        queryFn: {
            "useDisplayQuery.useQuery": async ()=>{
                if (!displaySlug) {
                    throw new Error('Display slug is required');
                }
                const response = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`/displays/${displaySlug}/`);
                return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$generated$2f$api$2d$schemas$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Display"].parse(response.data);
            }
        }["useDisplayQuery.useQuery"],
        enabled: !!displaySlug
    });
}
_s(useDisplayQuery, "4ZpngI1uv+Uo3WQHEZmTQ5FNM+k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/features/displays/queries/use-display-types-query.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useDisplayTypesQuery",
    ()=>useDisplayTypesQuery
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/axios.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$generated$2f$api$2d$schemas$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/generated/api-schemas.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
;
;
function useDisplayTypesQuery() {
    _s();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            'display-types'
        ],
        queryFn: {
            "useDisplayTypesQuery.useQuery": async ()=>{
                const response = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get('/displays/types/');
                const validatedResponse = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$generated$2f$api$2d$schemas$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PaginatedDisplayTypeList"].parse(response.data);
                return {
                    types: validatedResponse.results
                };
            }
        }["useDisplayTypesQuery.useQuery"]
    });
}
_s(useDisplayTypesQuery, "4ZpngI1uv+Uo3WQHEZmTQ5FNM+k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/features/displays/queries/use-standard-displays-query.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useStandardDisplaysQuery",
    ()=>useStandardDisplaysQuery
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/axios.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$generated$2f$api$2d$schemas$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/generated/api-schemas.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
;
;
function useStandardDisplaysQuery() {
    _s();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            'standard-displays'
        ],
        queryFn: {
            "useStandardDisplaysQuery.useQuery": async ()=>{
                const response = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get('/displays/standards/');
                const validatedResponse = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$generated$2f$api$2d$schemas$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PaginatedDisplayList"].parse(response.data);
                return {
                    standards: validatedResponse.results
                };
            }
        }["useStandardDisplaysQuery.useQuery"]
    });
}
_s(useStandardDisplaysQuery, "4ZpngI1uv+Uo3WQHEZmTQ5FNM+k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/features/displays/queries/use-create-display-mutation.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useCreateDisplayMutation",
    ()=>useCreateDisplayMutation
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/axios.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$react$2d$query$2f$hooks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/react-query/hooks.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$generated$2f$api$2d$schemas$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/generated/api-schemas.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
;
;
function useCreateDisplayMutation() {
    _s();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$react$2d$query$2f$hooks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppMutation"])({
        "useCreateDisplayMutation.useAppMutation": async (input)=>{
            const validatedInput = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$generated$2f$api$2d$schemas$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DisplayCreateRequest"].parse(input);
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post('/displays/', validatedInput);
            return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$generated$2f$api$2d$schemas$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Display"].parse(response.data);
        }
    }["useCreateDisplayMutation.useAppMutation"], {
        successMessage: 'Display created successfully',
        errorMessage: 'Failed to create display',
        invalidateQueries: [
            [
                'displays'
            ]
        ]
    });
}
_s(useCreateDisplayMutation, "Rrkdb75pulkTFL9gRtHlkUL7GMU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$react$2d$query$2f$hooks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppMutation"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/features/displays/queries/use-delete-display-mutation.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useDeleteDisplayMutation",
    ()=>useDeleteDisplayMutation
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/axios.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$react$2d$query$2f$hooks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/react-query/hooks.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
;
function useDeleteDisplayMutation(displaySlug) {
    _s();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$react$2d$query$2f$hooks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppMutation"])({
        "useDeleteDisplayMutation.useAppMutation": async ()=>{
            await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].delete(`/displays/${displaySlug}/`);
        }
    }["useDeleteDisplayMutation.useAppMutation"], {
        successMessage: 'Display deleted successfully',
        errorMessage: 'Failed to delete display',
        invalidateQueries: [
            [
                'displays'
            ],
            [
                'display',
                displaySlug
            ]
        ]
    });
}
_s(useDeleteDisplayMutation, "Rrkdb75pulkTFL9gRtHlkUL7GMU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$react$2d$query$2f$hooks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppMutation"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/features/displays/queries/index.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$displays$2f$queries$2f$use$2d$displays$2d$query$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/displays/queries/use-displays-query.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$displays$2f$queries$2f$use$2d$display$2d$query$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/displays/queries/use-display-query.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$displays$2f$queries$2f$use$2d$display$2d$types$2d$query$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/displays/queries/use-display-types-query.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$displays$2f$queries$2f$use$2d$standard$2d$displays$2d$query$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/displays/queries/use-standard-displays-query.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$displays$2f$queries$2f$use$2d$create$2d$display$2d$mutation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/displays/queries/use-create-display-mutation.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$displays$2f$queries$2f$use$2d$delete$2d$display$2d$mutation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/displays/queries/use-delete-display-mutation.ts [app-client] (ecmascript)");
;
;
;
;
;
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/features/planogram/hooks/use-planogram-data.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "usePlanogramData",
    ()=>usePlanogramData
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v3/external.js [app-client] (ecmascript) <export * as z>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/axios.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/features/planogram/store/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$planogram$2d$slice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/planogram/store/planogram-slice.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$generated$2f$api$2d$schemas$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/generated/api-schemas.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$displays$2f$queries$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/features/displays/queries/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$displays$2f$queries$2f$use$2d$displays$2d$query$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/displays/queries/use-displays-query.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
;
;
;
;
;
;
// Schema for layout item structure (not in API schemas since it's frontend-specific structure)
const LayoutItemSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    i: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    x: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number(),
    y: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number(),
    w: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number(),
    h: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number(),
    meta: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
        id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number(),
        name: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
        category: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
        color: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
        score: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number(),
        pack_width_in: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number(),
        pack_height_in: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number()
    })
});
const GridResponseSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    grid: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
        cols: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number(),
        rows: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number(),
        cellWidthIn: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number()
    }),
    rows: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
        id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number(),
        category: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().nullable(),
        name: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
        items: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(LayoutItemSchema)
    }))
});
const PlanogramDetailResponseSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    planogram: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$generated$2f$api$2d$schemas$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Planogram"],
    layout: GridResponseSchema.optional()
});
function usePlanogramData(planogramSlug) {
    _s();
    const initializeForm = __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$planogram$2d$slice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramStore"].use.initializeForm();
    const initializeLayouts = __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$planogram$2d$slice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramStore"].use.initializeLayouts();
    const setAvailableItems = __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$planogram$2d$slice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramStore"].use.setAvailableItems();
    const setLoadingAvailableItems = __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$planogram$2d$slice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramStore"].use.setLoadingAvailableItems();
    // Fetch planogram data
    const planogramQuery = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            'planograms',
            planogramSlug
        ],
        queryFn: {
            "usePlanogramData.useQuery[planogramQuery]": async ()=>{
                if (!planogramSlug) {
                    throw new Error('Planogram slug is required');
                }
                const { data } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`/planograms/${planogramSlug}/`);
                // Validate response structure matches expected format
                try {
                    return PlanogramDetailResponseSchema.parse(data);
                } catch (error) {
                    console.error('Planogram response validation failed:', error);
                    throw new Error('Invalid planogram response format');
                }
            }
        }["usePlanogramData.useQuery[planogramQuery]"],
        enabled: !!planogramSlug,
        staleTime: 1000 * 60 * 5
    });
    // Fetch company displays (custom displays)
    const { data: companyDisplays = [] } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$displays$2f$queries$2f$use$2d$displays$2d$query$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDisplaysQuery"])();
    // Fetch standard displays
    const { data: standardsData } = useStandardDisplaysQuery();
    const standardDisplays = standardsData?.standards || [];
    // Fetch leaf categories (categories that have products directly as children, not subcategories)
    const leafCategoriesQuery = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            'categories',
            'leaf'
        ],
        queryFn: {
            "usePlanogramData.useQuery[leafCategoriesQuery]": async ()=>{
                const { data } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get('/categories/leaf/');
                return data;
            }
        }["usePlanogramData.useQuery[leafCategoriesQuery]"]
    });
    const leafCategories = leafCategoriesQuery.data?.categories || [];
    // Fetch available products
    const fetchAvailableProducts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "usePlanogramData.useCallback[fetchAvailableProducts]": async (overridePlanogram)=>{
            const planogram = overridePlanogram || planogramQuery.data?.planogram;
            if (!planogram) {
                return;
            }
            const categoryIds = Array.isArray(planogram.category_ids) ? planogram.category_ids : [];
            const currentSeason = planogram.season || 'summer';
            if (categoryIds.length === 0) {
                setAvailableItems([]);
                return;
            }
            setLoadingAvailableItems(true);
            try {
                const categoryIdsStr = categoryIds.join(',');
                const response = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`/products/by-categories/?category_ids=${categoryIdsStr}&season=${currentSeason}`);
                // Validate response structure using generated schema
                const validatedResponse = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$generated$2f$api$2d$schemas$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ProductListResponse"].parse(response.data);
                const products = validatedResponse.products || [];
                // Convert to AvailableItem format
                const items = products.map({
                    "usePlanogramData.useCallback[fetchAvailableProducts].items": (product)=>({
                            id: product.id,
                            name: product.name,
                            category: product.category ?? 'Unknown',
                            color: product.color ?? '#9ca3af',
                            score: product.overall_score,
                            margin: product.margin,
                            pack_width_in: product.pack_width_in,
                            pack_height_in: product.pack_height_in
                        })
                }["usePlanogramData.useCallback[fetchAvailableProducts].items"]);
                setAvailableItems(items);
            } catch (error) {
                console.error('Error fetching available products:', error);
                setAvailableItems([]);
            } finally{
                setLoadingAvailableItems(false);
            }
        }
    }["usePlanogramData.useCallback[fetchAvailableProducts]"], [
        planogramQuery.data,
        setAvailableItems,
        setLoadingAvailableItems
    ]);
    // Initialize form state from planogram data
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "usePlanogramData.useEffect": ()=>{
            if (planogramQuery.data?.planogram) {
                const planogram = planogramQuery.data.planogram;
                // Use display ID directly
                const displayId = planogram.display?.toString() || undefined;
                // Initialize form state
                initializeForm({
                    name: planogram.name,
                    display_id: displayId,
                    season: planogram.season,
                    shelf_count: planogram.shelf_count,
                    width_in: parseFloat(planogram.width_in),
                    height_in: parseFloat(planogram.height_in),
                    category_ids: Array.isArray(planogram.category_ids) ? planogram.category_ids : []
                });
                // Fetch available products when planogram loads
                fetchAvailableProducts();
            }
        // Only depend on planogram ID to avoid infinite loops
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }
    }["usePlanogramData.useEffect"], [
        planogramQuery.data?.planogram?.id
    ]);
    // Initialize layouts from planogram data
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "usePlanogramData.useEffect": ()=>{
            if (planogramQuery.data?.layout) {
                initializeLayouts(planogramQuery.data.layout);
            }
        }
    }["usePlanogramData.useEffect"], [
        planogramQuery.data?.layout,
        initializeLayouts
    ]);
    return {
        planogramData: planogramQuery.data,
        planogramLoading: planogramQuery.isLoading,
        refetchPlanogram: planogramQuery.refetch,
        companyDisplays,
        standardDisplays,
        leafCategories,
        leafCategoriesLoading: leafCategoriesQuery.isLoading,
        leafCategoriesError: leafCategoriesQuery.error?.message,
        fetchAvailableProducts
    };
}
_s(usePlanogramData, "whT+uMrHnM0AQ0TdCszEm0PmK8c=", true, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"],
        __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$displays$2f$queries$2f$use$2d$displays$2d$query$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDisplaysQuery"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/features/planogram/hooks/use-planogram-form.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "usePlanogramForm",
    ()=>usePlanogramForm
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$queries$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/features/planogram/queries/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$queries$2f$use$2d$update$2d$planogram$2d$mutation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/planogram/queries/use-update-planogram-mutation.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$queries$2f$use$2d$delete$2d$planogram$2d$mutation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/planogram/queries/use-delete-planogram-mutation.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/features/planogram/store/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$planogram$2d$slice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/planogram/store/planogram-slice.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
;
;
function usePlanogramForm(planogramSlug, planogramData, refetchPlanogram, fetchAvailableProducts) {
    _s();
    const name = __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$planogram$2d$slice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramStore"].use.name();
    const selectedDisplay = __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$planogram$2d$slice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramStore"].use.selectedDisplay();
    const season = __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$planogram$2d$slice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramStore"].use.season();
    const shelfCount = __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$planogram$2d$slice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramStore"].use.shelfCount();
    const widthIn = __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$planogram$2d$slice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramStore"].use.widthIn();
    const heightIn = __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$planogram$2d$slice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramStore"].use.heightIn();
    const selectedCategoryIds = __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$planogram$2d$slice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramStore"].use.selectedCategoryIds();
    const setName = __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$planogram$2d$slice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramStore"].use.setName();
    const setSelectedDisplay = __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$planogram$2d$slice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramStore"].use.setSelectedDisplay();
    const setSeason = __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$planogram$2d$slice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramStore"].use.setSeason();
    const setShelfCount = __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$planogram$2d$slice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramStore"].use.setShelfCount();
    const setSelectedCategoryIds = __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$planogram$2d$slice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramStore"].use.setSelectedCategoryIds();
    const setSkipNextInitialization = __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$planogram$2d$slice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramStore"].use.setSkipNextInitialization();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"])();
    const projectSlug = params?.projectSlug;
    const updateMutation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$queries$2f$use$2d$update$2d$planogram$2d$mutation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUpdatePlanogramMutation"])();
    const deleteMutation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$queries$2f$use$2d$delete$2d$planogram$2d$mutation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDeletePlanogramMutation"])();
    // Save layout handler
    const handleSaveLayout = async (layout)=>{
        // Set flag to skip next initialization to prevent flashing
        setSkipNextInitialization(true);
        if (!planogramData?.planogram) {
            return;
        }
        const { name, width_in, height_in, shelf_count } = planogramData.planogram;
        try {
            await updateMutation.mutateAsync({
                slug: planogramSlug,
                name,
                width_in,
                height_in,
                shelf_count,
                layout,
                preserve_layout: true
            });
            await refetchPlanogram();
        } catch  {
        // Error handled by mutation
        }
    };
    // Handle regenerate button click
    const handleRegenerate = async ()=>{
        if (!planogramData?.planogram) {
            return;
        }
        // Validate name is not empty
        if (!name || !name.trim()) {
            return;
        }
        const updates = {};
        // Include name if it changed
        if (name.trim() !== planogramData.planogram.name) {
            updates.name = name.trim();
        }
        // Only include fields that have changed
        // Note: Display cannot be changed after creation per API limitations
        if (season && season !== planogramData.planogram.season) {
            updates.season = season;
        }
        if (shelfCount > 0 && shelfCount !== (planogramData.planogram.shelf_count ?? 1)) {
            updates.shelf_count = shelfCount;
        }
        if (selectedCategoryIds.length > 0) {
            const currentIds = Array.isArray(planogramData.planogram.category_ids) ? planogramData.planogram.category_ids : [];
            if (JSON.stringify(selectedCategoryIds.sort()) !== JSON.stringify(currentIds.sort())) {
                updates.category_ids = selectedCategoryIds;
            }
        }
        // Always set preserve_layout to false when regenerating
        updates.preserve_layout = false;
        // Only make request if there are changes
        if (Object.keys(updates).length > 0) {
            try {
                const result = await updateMutation.mutateAsync({
                    slug: planogramSlug,
                    name: name.trim(),
                    width_in: widthIn.toString(),
                    height_in: heightIn.toString(),
                    shelf_count: shelfCount > 0 ? shelfCount : planogramData.planogram.shelf_count ?? 1,
                    ...updates
                });
                if (result) {
                    const updatedPlanogram = result;
                    // Update state directly from the response
                    if (updatedPlanogram.name) {
                        setName(updatedPlanogram.name);
                    }
                    if (updatedPlanogram.season) {
                        setSeason(updatedPlanogram.season);
                    }
                    // Always update shelf_count, default to 1 if missing
                    setShelfCount(updatedPlanogram.shelf_count && updatedPlanogram.shelf_count > 0 ? updatedPlanogram.shelf_count : 1);
                    if (Array.isArray(updatedPlanogram.category_ids)) {
                        setSelectedCategoryIds(updatedPlanogram.category_ids);
                    }
                    // Refetch to get latest state (including display and slug)
                    await refetchPlanogram();
                    // Refetch available products after regeneration (in case season or categories changed)
                    await fetchAvailableProducts();
                }
            } catch  {
            // Error handled by mutation
            }
        }
    };
    // Handle display change - regenerate planogram immediately
    const handleDisplayChange = async (displayId)=>{
        setSelectedDisplay(displayId);
        // Trigger regeneration when display changes
        if (planogramData?.planogram) {
            try {
                // Note: Display cannot be changed after creation per API limitations
                // Just update the UI state
                const result = await updateMutation.mutateAsync({
                    slug: planogramSlug,
                    name: planogramData.planogram.name,
                    width_in: planogramData.planogram.width_in,
                    height_in: planogramData.planogram.height_in,
                    shelf_count: planogramData.planogram.shelf_count,
                    preserve_layout: false
                });
                if (result) {
                    const updatedPlanogram = result;
                    // Update shelf count from the new display
                    setShelfCount(updatedPlanogram.shelf_count && updatedPlanogram.shelf_count > 0 ? updatedPlanogram.shelf_count : 1);
                    await refetchPlanogram();
                }
            } catch  {
            // Error handled by mutation
            }
        }
    };
    return {
        updatePlanogramMutation: updateMutation,
        deleteMutation,
        handleSaveLayout,
        handleRegenerate,
        handleDisplayChange
    };
}
_s(usePlanogramForm, "jYWGmn4fLlgvkmT/OWs71BcPle0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"],
        __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$queries$2f$use$2d$update$2d$planogram$2d$mutation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUpdatePlanogramMutation"],
        __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$queries$2f$use$2d$delete$2d$planogram$2d$mutation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDeletePlanogramMutation"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/features/planogram/hooks/use-planogram-layout.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "usePlanogramLayout",
    ()=>usePlanogramLayout
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/features/planogram/store/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$planogram$2d$slice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/planogram/store/planogram-slice.ts [app-client] (ecmascript)");
;
// Helper function to calculate width in cells (matches backend logic)
// Option 2: Items 0-6" = 1 cell, 6-12" = 1 cell, 12+ = floor-based
function widthCellsFor(widthIn, cellWidthIn) {
    if (widthIn <= 0) {
        return 0;
    }
    if (widthIn < 12) {
        return 1;
    }
    // For 12+ inches, use floor division (12" = 2 cells, 18" = 3 cells, etc.)
    return Math.max(2, Math.floor(widthIn / cellWidthIn));
}
function usePlanogramLayout() {
    const gridData = __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$planogram$2d$slice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramStore"].use.gridData();
    const rowLayouts = __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$planogram$2d$slice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramStore"].use.rowLayouts();
    const setRowLayouts = __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$planogram$2d$slice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramStore"].use.setRowLayouts();
    const availableItems = __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$planogram$2d$slice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramStore"].use.availableItems();
    const selectedAvailableItems = __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$planogram$2d$slice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramStore"].use.selectedAvailableItems();
    const targetRowId = __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$planogram$2d$slice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramStore"].use.targetRowId();
    const clearSelectedAvailableItems = __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$planogram$2d$slice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramStore"].use.clearSelectedAvailableItems();
    const closeAvailableProductsSidebar = __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$planogram$2d$slice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramStore"].use.closeAvailableProductsSidebar();
    // Handle adding selected items to a row
    const handleAddSelectedItems = ()=>{
        if (!gridData || targetRowId === null || selectedAvailableItems.size === 0) {
            return;
        }
        const maxCols = gridData.grid.cols;
        const newItems = [];
        // Loop through each selected item and its quantity
        selectedAvailableItems.forEach((quantity, itemId)=>{
            const item = availableItems.find((i)=>i.id === itemId);
            if (!item) {
                return;
            }
            // Add the item 'quantity' number of times
            for(let i = 0; i < quantity; i++){
                const itemWidth = widthCellsFor(item.pack_width_in, gridData.grid.cellWidthIn);
                // Always try to place in the target row first
                let placed = false;
                let finalX = 0;
                let finalRowId = targetRowId;
                // Get the target row
                const targetRow = gridData.rows.find((r)=>r.id === targetRowId);
                if (targetRow) {
                    const rowLayout = rowLayouts[targetRowId] && rowLayouts[targetRowId].length > 0 ? rowLayouts[targetRowId] : targetRow.items;
                    // Combine existing items with items we're adding in this batch (for collision detection)
                    const itemsInThisRow = newItems.filter((item)=>item.y + 1 === targetRowId);
                    const allItemsInRow = [
                        ...rowLayout,
                        ...itemsInThisRow
                    ];
                    // Try to find a position from left to right, starting from x=0
                    let testX = 0;
                    while(testX + itemWidth <= maxCols){
                        // Check for collisions with existing items and items we're adding
                        const hasCollision = allItemsInRow.some((existingItem)=>{
                            const existingRight = existingItem.x + existingItem.w;
                            const itemRight = testX + itemWidth;
                            return testX >= existingItem.x && testX < existingRight || itemRight > existingItem.x && itemRight <= existingRight || testX < existingItem.x && itemRight > existingRight;
                        });
                        if (!hasCollision) {
                            // Found a good position!
                            finalX = testX;
                            finalRowId = targetRowId;
                            placed = true;
                            break;
                        }
                        testX++;
                    }
                    // If no perfect position found in target row, place at the rightmost position (allow overflow)
                    if (!placed) {
                        const rightmostX = allItemsInRow.length > 0 ? Math.max(...allItemsInRow.map((item)=>item.x + item.w)) : 0;
                        finalX = rightmostX;
                        finalRowId = targetRowId;
                        placed = true;
                    }
                }
                // Add the item
                const finalRow = gridData.rows.find((r)=>r.id === finalRowId);
                if (finalRow) {
                    // Use timestamp-based unique ID to avoid duplicates
                    const timestamp = Date.now();
                    const randomSuffix = Math.random().toString(36).substring(2, 9);
                    const uniqueId = `${item.id}-${timestamp}-${randomSuffix}`;
                    newItems.push({
                        i: uniqueId,
                        x: finalX,
                        y: finalRowId - 1,
                        w: itemWidth,
                        h: 1,
                        meta: {
                            id: item.id,
                            name: item.name,
                            category: item.category,
                            color: item.color || '#9ca3af',
                            score: item.score,
                            pack_width_in: item.pack_width_in,
                            pack_height_in: item.pack_height_in
                        }
                    });
                }
            }
        });
        // Group new items by row and update rowLayouts
        const itemsByRow = {};
        newItems.forEach((item)=>{
            const rowId = item.y + 1; // Convert y back to rowId
            if (!itemsByRow[rowId]) {
                itemsByRow[rowId] = [];
            }
            itemsByRow[rowId].push(item);
        });
        // Update each affected row
        if (Object.keys(itemsByRow).length > 0) {
            const updated = {
                ...rowLayouts
            };
            Object.entries(itemsByRow).forEach(([rowIdStr, items])=>{
                const rowId = parseInt(rowIdStr);
                const row = gridData.rows.find((r)=>r.id === rowId);
                const existingRowLayout = updated[rowId] || row?.items || [];
                updated[rowId] = [
                    ...existingRowLayout,
                    ...items
                ];
            });
            setRowLayouts(updated);
            // Clear selections and close sidebar
            clearSelectedAvailableItems();
            closeAvailableProductsSidebar();
        }
    };
    return {
        handleAddSelectedItems
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/features/planogram/hooks/use-grid-actions.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useGridActions",
    ()=>useGridActions
]);
// Helper function to calculate width in cells (matches backend logic)
// Option 2: Items 0-6" = 1 cell, 6-12" = 1 cell, 12+ = floor-based
function widthCellsFor(widthIn, cellWidthIn) {
    if (widthIn <= 0) {
        return 0;
    }
    if (widthIn < 12) {
        return 1;
    }
    // For 12+ inches, use floor division (12" = 2 cells, 18" = 3 cells, etc.)
    return Math.max(2, Math.floor(widthIn / cellWidthIn));
}
function useGridActions({ gridData, rowLayouts, setRowLayouts, setSelectedItem, setRowNotifications, selectedItem }) {
    const handleLayoutChange = (rowId, newLayout)=>{
        setRowLayouts((prev)=>{
            // Get current layout from state, or fallback to gridData, or empty array
            const currentLayout = prev[rowId] || gridData?.rows.find((r)=>r.id === rowId)?.items || [];
            // If currentLayout is empty, don't process (wait for proper initialization)
            if (currentLayout.length === 0) {
                return prev;
            }
            // Create a map of existing items by their id for faster lookup
            const existingItemsMap = new Map(currentLayout.map((item)=>[
                    item.i,
                    item
                ]));
            // Also create a map from gridData as ultimate fallback
            const gridDataRow = gridData?.rows.find((r)=>r.id === rowId);
            const gridDataItemsMap = gridDataRow ? new Map(gridDataRow.items.map((item)=>[
                    item.i,
                    item
                ])) : new Map();
            // Merge new layout positions with existing meta data
            const updatedLayout = newLayout.map((newItem)=>{
                // First try to find in current layout state
                const existingItem = existingItemsMap.get(newItem.i);
                if (existingItem && existingItem.meta && existingItem.meta.name) {
                    // Preserve all existing meta data, only update position/size
                    return {
                        ...newItem,
                        meta: existingItem.meta
                    };
                }
                // If not found in state, try to get from gridData as fallback
                const gridDataItem = gridDataItemsMap.get(newItem.i);
                if (gridDataItem && gridDataItem.meta && gridDataItem.meta.name) {
                    return {
                        ...newItem,
                        meta: gridDataItem.meta
                    };
                }
                // If we still can't find it, skip updating this item (don't create Unknown)
                // This prevents corruption of the layout
                console.warn(`Item ${newItem.i} not found in currentLayout or gridData, skipping update`);
                return existingItem || gridDataItem || newItem;
            });
            return {
                ...prev,
                [rowId]: updatedLayout
            };
        });
    };
    const handleItemClick = (rowId, itemId, x, y, editMode)=>{
        if (editMode) {
            setSelectedItem({
                rowId,
                itemId,
                x,
                y
            });
        }
    };
    const handleRemoveItem = (itemId)=>{
        if (!gridData || !selectedItem) {
            return;
        }
        const row = gridData.rows.find((r)=>r.id === selectedItem.rowId);
        if (!row) {
            return;
        }
        const currentLayout = rowLayouts[selectedItem.rowId] || row.items;
        const itemToRemove = currentLayout.find((item)=>item.i === itemId);
        if (!itemToRemove) {
            return;
        }
        // Remove from grid
        setRowLayouts((prev)=>({
                ...prev,
                [selectedItem.rowId]: currentLayout.filter((item)=>item.i !== itemId)
            }));
        setSelectedItem(null);
    };
    const handleReplaceItem = (oldItemId, newItem)=>{
        if (!gridData || !selectedItem) {
            return;
        }
        const row = gridData.rows.find((r)=>r.id === selectedItem.rowId);
        if (!row) {
            return;
        }
        const currentLayout = rowLayouts[selectedItem.rowId] || row.items;
        const oldItem = currentLayout.find((item)=>item.i === oldItemId);
        if (!oldItem) {
            return;
        }
        // Calculate new width
        const newWidth = widthCellsFor(newItem.pack_width_in, gridData.grid.cellWidthIn);
        // Replace item
        setRowLayouts((prev)=>({
                ...prev,
                [selectedItem.rowId]: currentLayout.map((item)=>item.i === oldItemId ? {
                        ...item,
                        i: String(newItem.id),
                        w: newWidth,
                        meta: {
                            id: newItem.id,
                            name: newItem.name,
                            category: newItem.category,
                            color: newItem.color,
                            score: newItem.score,
                            pack_width_in: newItem.pack_width_in,
                            pack_height_in: newItem.pack_height_in
                        }
                    } : item)
            }));
        setSelectedItem(null);
    };
    const handleAddItem = (rowId, item)=>{
        if (!gridData) {
            return;
        }
        const currentLayout = rowLayouts[rowId] || gridData.rows.find((r)=>r.id === rowId)?.items || [];
        // Calculate item width in cells
        const itemWidth = widthCellsFor(item.pack_width_in, gridData.grid.cellWidthIn);
        const maxCols = gridData.grid.cols;
        // Check if item fits at all
        if (itemWidth > maxCols) {
            setRowNotifications((prev)=>({
                    ...prev,
                    [rowId]: `"${item.name}" is too wide to fit on the shelf.`
                }));
            // Clear notification after 3 seconds
            setTimeout(()=>{
                setRowNotifications((prev)=>{
                    const updated = {
                        ...prev
                    };
                    delete updated[rowId];
                    return updated;
                });
            }, 3000);
            return;
        }
        // Find the rightmost position of existing items
        const rightmostX = currentLayout.length > 0 ? Math.max(...currentLayout.map((item)=>item.x + item.w)) : 0;
        // Generate unique ID for this item instance
        const existingCount = currentLayout.filter((layoutItem)=>layoutItem.meta.id === item.id).length;
        const uniqueId = existingCount > 0 ? `${item.id}-${existingCount}` : String(item.id);
        const newItem = {
            i: uniqueId,
            x: rightmostX,
            y: rowId - 1,
            w: itemWidth,
            h: 1,
            meta: {
                id: item.id,
                name: item.name,
                category: item.category,
                color: item.color,
                score: item.score,
                pack_width_in: item.pack_width_in,
                pack_height_in: item.pack_height_in
            }
        };
        // Check if item fits at the end
        if (rightmostX + itemWidth <= maxCols) {
            // Item fits
            setRowLayouts((prev)=>({
                    ...prev,
                    [rowId]: [
                        ...currentLayout,
                        newItem
                    ]
                }));
            // Clear any existing notification for this row
            setRowNotifications((prev)=>{
                const updated = {
                    ...prev
                };
                delete updated[rowId];
                return updated;
            });
        } else {
            // Item doesn't fit - show inline notification but still add it
            setRowNotifications((prev)=>({
                    ...prev,
                    [rowId]: `"${item.name}" may overflow`
                }));
            // Clear notification after 3 seconds
            setTimeout(()=>{
                setRowNotifications((prev)=>{
                    const updated = {
                        ...prev
                    };
                    delete updated[rowId];
                    return updated;
                });
            }, 3000);
            // Still add it - RGL will create a new row if needed
            setRowLayouts((prev)=>({
                    ...prev,
                    [rowId]: [
                        ...currentLayout,
                        newItem
                    ]
                }));
        }
    };
    return {
        handleLayoutChange,
        handleItemClick,
        handleRemoveItem,
        handleReplaceItem,
        handleAddItem
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/features/planogram/hooks/index.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$hooks$2f$use$2d$planogram$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/planogram/hooks/use-planogram-data.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$hooks$2f$use$2d$planogram$2d$form$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/planogram/hooks/use-planogram-form.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$hooks$2f$use$2d$planogram$2d$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/planogram/hooks/use-planogram-layout.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$hooks$2f$use$2d$grid$2d$actions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/planogram/hooks/use-grid-actions.ts [app-client] (ecmascript)");
;
;
;
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/features/planogram/types.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ui/dialog.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Dialog",
    ()=>Dialog,
    "DialogClose",
    ()=>DialogClose,
    "DialogContent",
    ()=>DialogContent,
    "DialogDescription",
    ()=>DialogDescription,
    "DialogFooter",
    ()=>DialogFooter,
    "DialogHeader",
    ()=>DialogHeader,
    "DialogOverlay",
    ()=>DialogOverlay,
    "DialogPortal",
    ()=>DialogPortal,
    "DialogTitle",
    ()=>DialogTitle,
    "DialogTrigger",
    ()=>DialogTrigger
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-dialog/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as XIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
"use client";
;
;
;
;
function Dialog({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"], {
        "data-slot": "dialog",
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/dialog.tsx",
        lineNumber: 12,
        columnNumber: 10
    }, this);
}
_c = Dialog;
function DialogTrigger({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Trigger"], {
        "data-slot": "dialog-trigger",
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/dialog.tsx",
        lineNumber: 18,
        columnNumber: 10
    }, this);
}
_c1 = DialogTrigger;
function DialogPortal({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Portal"], {
        "data-slot": "dialog-portal",
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/dialog.tsx",
        lineNumber: 24,
        columnNumber: 10
    }, this);
}
_c2 = DialogPortal;
function DialogClose({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Close"], {
        "data-slot": "dialog-close",
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/dialog.tsx",
        lineNumber: 30,
        columnNumber: 10
    }, this);
}
_c3 = DialogClose;
function DialogOverlay({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Overlay"], {
        "data-slot": "dialog-overlay",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/dialog.tsx",
        lineNumber: 38,
        columnNumber: 5
    }, this);
}
_c4 = DialogOverlay;
function DialogContent({ className, children, showCloseButton = true, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DialogPortal, {
        "data-slot": "dialog-portal",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DialogOverlay, {}, void 0, false, {
                fileName: "[project]/components/ui/dialog.tsx",
                lineNumber: 59,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Content"], {
                "data-slot": "dialog-content",
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg", className),
                ...props,
                children: [
                    children,
                    showCloseButton && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Close"], {
                        "data-slot": "dialog-close",
                        className: "ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XIcon$3e$__["XIcon"], {}, void 0, false, {
                                fileName: "[project]/components/ui/dialog.tsx",
                                lineNumber: 74,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "sr-only",
                                children: "Close"
                            }, void 0, false, {
                                fileName: "[project]/components/ui/dialog.tsx",
                                lineNumber: 75,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/ui/dialog.tsx",
                        lineNumber: 70,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/ui/dialog.tsx",
                lineNumber: 60,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/ui/dialog.tsx",
        lineNumber: 58,
        columnNumber: 5
    }, this);
}
_c5 = DialogContent;
function DialogHeader({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "dialog-header",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex flex-col gap-2 text-center sm:text-left", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/dialog.tsx",
        lineNumber: 85,
        columnNumber: 5
    }, this);
}
_c6 = DialogHeader;
function DialogFooter({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "dialog-footer",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/dialog.tsx",
        lineNumber: 95,
        columnNumber: 5
    }, this);
}
_c7 = DialogFooter;
function DialogTitle({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Title"], {
        "data-slot": "dialog-title",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-lg leading-none font-semibold", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/dialog.tsx",
        lineNumber: 111,
        columnNumber: 5
    }, this);
}
_c8 = DialogTitle;
function DialogDescription({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Description"], {
        "data-slot": "dialog-description",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-muted-foreground text-sm", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/dialog.tsx",
        lineNumber: 124,
        columnNumber: 5
    }, this);
}
_c9 = DialogDescription;
;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9;
__turbopack_context__.k.register(_c, "Dialog");
__turbopack_context__.k.register(_c1, "DialogTrigger");
__turbopack_context__.k.register(_c2, "DialogPortal");
__turbopack_context__.k.register(_c3, "DialogClose");
__turbopack_context__.k.register(_c4, "DialogOverlay");
__turbopack_context__.k.register(_c5, "DialogContent");
__turbopack_context__.k.register(_c6, "DialogHeader");
__turbopack_context__.k.register(_c7, "DialogFooter");
__turbopack_context__.k.register(_c8, "DialogTitle");
__turbopack_context__.k.register(_c9, "DialogDescription");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ui/alert.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Alert",
    ()=>Alert,
    "AlertDescription",
    ()=>AlertDescription,
    "AlertTitle",
    ()=>AlertTitle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/class-variance-authority/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
;
;
;
const alertVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cva"])("relative w-full rounded-lg border px-4 py-3 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current", {
    variants: {
        variant: {
            default: "bg-card text-card-foreground",
            destructive: "text-destructive bg-card [&>svg]:text-current *:data-[slot=alert-description]:text-destructive/90"
        }
    },
    defaultVariants: {
        variant: "default"
    }
});
function Alert({ className, variant, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "alert",
        role: "alert",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(alertVariants({
            variant
        }), className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/alert.tsx",
        lineNumber: 28,
        columnNumber: 5
    }, this);
}
_c = Alert;
function AlertTitle({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "alert-title",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/alert.tsx",
        lineNumber: 39,
        columnNumber: 5
    }, this);
}
_c1 = AlertTitle;
function AlertDescription({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "alert-description",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-muted-foreground col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/alert.tsx",
        lineNumber: 55,
        columnNumber: 5
    }, this);
}
_c2 = AlertDescription;
;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "Alert");
__turbopack_context__.k.register(_c1, "AlertTitle");
__turbopack_context__.k.register(_c2, "AlertDescription");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/features/planogram/components/ai-overview-dialog/ai-overview-dialog.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AIOverviewDialog",
    ()=>AIOverviewDialog
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/dialog.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$alert$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/alert.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/features/planogram/store/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$planogram$2d$slice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/planogram/store/planogram-slice.ts [app-client] (ecmascript)");
'use client';
;
;
;
;
function AIOverviewDialog() {
    const aiDialogOpen = __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$planogram$2d$slice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramStore"].use.aiDialogOpen();
    const setAIDialogOpen = __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$planogram$2d$slice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramStore"].use.setAIDialogOpen();
    const aiLoading = __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$planogram$2d$slice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramStore"].use.aiLoading();
    const aiError = __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$planogram$2d$slice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramStore"].use.aiError();
    const aiOverview = __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$planogram$2d$slice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramStore"].use.aiOverview();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Dialog"], {
        open: aiDialogOpen,
        onOpenChange: setAIDialogOpen,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogContent"], {
            className: "max-w-2xl max-h-[80vh] overflow-y-auto",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogHeader"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogTitle"], {
                            children: "AI Overview"
                        }, void 0, false, {
                            fileName: "[project]/features/planogram/components/ai-overview-dialog/ai-overview-dialog.tsx",
                            lineNumber: 18,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogDescription"], {
                            children: "Analysis and insights for this planogram"
                        }, void 0, false, {
                            fileName: "[project]/features/planogram/components/ai-overview-dialog/ai-overview-dialog.tsx",
                            lineNumber: 19,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/features/planogram/components/ai-overview-dialog/ai-overview-dialog.tsx",
                    lineNumber: 17,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-4",
                    children: [
                        aiLoading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-center py-12",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"
                            }, void 0, false, {
                                fileName: "[project]/features/planogram/components/ai-overview-dialog/ai-overview-dialog.tsx",
                                lineNumber: 24,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/features/planogram/components/ai-overview-dialog/ai-overview-dialog.tsx",
                            lineNumber: 23,
                            columnNumber: 13
                        }, this),
                        aiError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$alert$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Alert"], {
                            variant: "destructive",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$alert$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AlertDescription"], {
                                children: aiError
                            }, void 0, false, {
                                fileName: "[project]/features/planogram/components/ai-overview-dialog/ai-overview-dialog.tsx",
                                lineNumber: 29,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/features/planogram/components/ai-overview-dialog/ai-overview-dialog.tsx",
                            lineNumber: 28,
                            columnNumber: 13
                        }, this),
                        aiOverview && !aiLoading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "prose prose-sm max-w-none",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "whitespace-pre-wrap text-sm leading-relaxed",
                                children: aiOverview
                            }, void 0, false, {
                                fileName: "[project]/features/planogram/components/ai-overview-dialog/ai-overview-dialog.tsx",
                                lineNumber: 34,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/features/planogram/components/ai-overview-dialog/ai-overview-dialog.tsx",
                            lineNumber: 33,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/features/planogram/components/ai-overview-dialog/ai-overview-dialog.tsx",
                    lineNumber: 21,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/features/planogram/components/ai-overview-dialog/ai-overview-dialog.tsx",
            lineNumber: 16,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/features/planogram/components/ai-overview-dialog/ai-overview-dialog.tsx",
        lineNumber: 15,
        columnNumber: 5
    }, this);
}
_c = AIOverviewDialog;
var _c;
__turbopack_context__.k.register(_c, "AIOverviewDialog");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/features/planogram/components/planogram-download-button/planogram-download-button.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PlanogramDownloadButton",
    ()=>PlanogramDownloadButton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/features/planogram/store/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$planogram$2d$slice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/planogram/store/planogram-slice.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-hot-toast/dist/index.mjs [app-client] (ecmascript)");
'use client';
;
;
;
;
function PlanogramDownloadButton({ planogram }) {
    const downloadLoading = __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$planogram$2d$slice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramStore"].use.downloadLoading();
    const gridData = __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$planogram$2d$slice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramStore"].use.gridData();
    const downloadPlanogram = __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$planogram$2d$slice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramStore"].use.downloadPlanogram();
    const handleDownload = async ()=>{
        if (!planogram) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].error('No planogram data available');
            return;
        }
        await downloadPlanogram(planogram, gridData);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
        onClick: handleDownload,
        size: "sm",
        variant: "outline",
        className: "border-primary text-primary hover:bg-primary hover:text-primary-foreground",
        disabled: downloadLoading,
        children: downloadLoading ? 'Preparing...' : 'Download'
    }, void 0, false, {
        fileName: "[project]/features/planogram/components/planogram-download-button/planogram-download-button.tsx",
        lineNumber: 27,
        columnNumber: 5
    }, this);
}
_c = PlanogramDownloadButton;
var _c;
__turbopack_context__.k.register(_c, "PlanogramDownloadButton");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/features/planogram/components/planogram-delete-button/planogram-delete-button.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PlanogramDeleteButton",
    ()=>PlanogramDeleteButton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$alert$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/alert.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$hooks$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/features/planogram/hooks/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$hooks$2f$use$2d$planogram$2d$form$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/planogram/hooks/use-planogram-form.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$hooks$2f$use$2d$planogram$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/planogram/hooks/use-planogram-data.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
function PlanogramDeleteButton() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"])();
    const planogramSlug = params?.planogramSlug;
    const projectSlug = params?.projectSlug;
    const [deleteConfirm, setDeleteConfirm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const { planogramData, refetchPlanogram, fetchAvailableProducts } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$hooks$2f$use$2d$planogram$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramData"])(planogramSlug);
    const { deleteMutation } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$hooks$2f$use$2d$planogram$2d$form$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramForm"])(planogramSlug, planogramData, refetchPlanogram, fetchAvailableProducts);
    const handleDelete = async ()=>{
        if (!deleteConfirm) {
            setDeleteConfirm(true);
            return;
        }
        try {
            await deleteMutation.mutateAsync({
                slug: planogramSlug
            });
            router.push(`/dashboard/projects/${projectSlug}`);
        } catch  {
            setDeleteConfirm(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mt-8",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-3 justify-end",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        onClick: handleDelete,
                        disabled: deleteMutation.isPending,
                        variant: deleteConfirm ? 'destructive' : 'outline',
                        className: deleteConfirm ? '' : 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100 hover:text-red-800',
                        children: deleteMutation.isPending ? 'Deleting...' : deleteConfirm ? 'Confirm Delete' : 'Delete Planogram'
                    }, void 0, false, {
                        fileName: "[project]/features/planogram/components/planogram-delete-button/planogram-delete-button.tsx",
                        lineNumber: 36,
                        columnNumber: 9
                    }, this),
                    deleteConfirm && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        onClick: ()=>setDeleteConfirm(false),
                        variant: "outline",
                        disabled: deleteMutation.isPending,
                        children: "Cancel"
                    }, void 0, false, {
                        fileName: "[project]/features/planogram/components/planogram-delete-button/planogram-delete-button.tsx",
                        lineNumber: 40,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/features/planogram/components/planogram-delete-button/planogram-delete-button.tsx",
                lineNumber: 35,
                columnNumber: 7
            }, this),
            deleteMutation.isError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$alert$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Alert"], {
                variant: "destructive",
                className: "mt-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$alert$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AlertDescription"], {
                    children: deleteMutation.error?.message || 'Failed to delete planogram'
                }, void 0, false, {
                    fileName: "[project]/features/planogram/components/planogram-delete-button/planogram-delete-button.tsx",
                    lineNumber: 47,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/features/planogram/components/planogram-delete-button/planogram-delete-button.tsx",
                lineNumber: 46,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/features/planogram/components/planogram-delete-button/planogram-delete-button.tsx",
        lineNumber: 34,
        columnNumber: 5
    }, this);
}
_s(PlanogramDeleteButton, "y+DIItFFDWPMz7OYW1XNSrqOaH0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"],
        __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$hooks$2f$use$2d$planogram$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramData"],
        __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$hooks$2f$use$2d$planogram$2d$form$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramForm"]
    ];
});
_c = PlanogramDeleteButton;
var _c;
__turbopack_context__.k.register(_c, "PlanogramDeleteButton");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ui/label.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Label",
    ()=>Label
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$label$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-label/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
"use client";
;
;
;
function Label({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$label$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"], {
        "data-slot": "label",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/label.tsx",
        lineNumber: 13,
        columnNumber: 5
    }, this);
}
_c = Label;
;
var _c;
__turbopack_context__.k.register(_c, "Label");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ui/input.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Input",
    ()=>Input
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
;
;
function Input({ className, type, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
        type: type,
        "data-slot": "input",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]", "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/input.tsx",
        lineNumber: 7,
        columnNumber: 5
    }, this);
}
_c = Input;
;
var _c;
__turbopack_context__.k.register(_c, "Input");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ui/form-field.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FormField",
    ()=>FormField
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/label.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/input.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
;
;
;
;
function FormField({ label, id, containerClassName, className, ...inputProps }) {
    const inputId = id || `field-${label.toLowerCase().replace(/\s+/g, '-')}`;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('space-y-2', containerClassName),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                htmlFor: inputId,
                children: label
            }, void 0, false, {
                fileName: "[project]/components/ui/form-field.tsx",
                lineNumber: 22,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                id: inputId,
                className: className,
                ...inputProps
            }, void 0, false, {
                fileName: "[project]/components/ui/form-field.tsx",
                lineNumber: 23,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/ui/form-field.tsx",
        lineNumber: 21,
        columnNumber: 5
    }, this);
}
_c = FormField;
var _c;
__turbopack_context__.k.register(_c, "FormField");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/features/planogram/components/planogram-name-field/planogram-name-field.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PlanogramNameField",
    ()=>PlanogramNameField
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$form$2d$field$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/form-field.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/features/planogram/store/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$planogram$2d$slice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/planogram/store/planogram-slice.ts [app-client] (ecmascript)");
'use client';
;
;
;
function PlanogramNameField() {
    const name = __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$planogram$2d$slice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramStore"].use.name();
    const setName = __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$planogram$2d$slice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramStore"].use.setName();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$form$2d$field$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormField"], {
        label: "Name",
        value: name,
        onChange: (e)=>setName(e.target.value),
        placeholder: "Planogram name",
        required: true,
        containerClassName: "lg:col-span-2"
    }, void 0, false, {
        fileName: "[project]/features/planogram/components/planogram-name-field/planogram-name-field.tsx",
        lineNumber: 11,
        columnNumber: 5
    }, this);
}
_c = PlanogramNameField;
var _c;
__turbopack_context__.k.register(_c, "PlanogramNameField");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/features/planogram/components/row-header/row-header.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RowHeader",
    ()=>RowHeader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/features/planogram/store/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$planogram$2d$slice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/planogram/store/planogram-slice.ts [app-client] (ecmascript)");
'use client';
;
;
function RowHeader({ rowName, rowId }) {
    const rowNotifications = __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$planogram$2d$slice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramStore"].use.rowNotifications();
    const rowNotification = rowNotifications[rowId];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mb-2",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                    className: "text-sm font-semibold",
                    children: rowName
                }, void 0, false, {
                    fileName: "[project]/features/planogram/components/row-header/row-header.tsx",
                    lineNumber: 17,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/features/planogram/components/row-header/row-header.tsx",
                lineNumber: 16,
                columnNumber: 7
            }, this),
            rowNotification && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-1 text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded px-2 py-1 inline-block",
                children: rowNotification
            }, void 0, false, {
                fileName: "[project]/features/planogram/components/row-header/row-header.tsx",
                lineNumber: 19,
                columnNumber: 27
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/features/planogram/components/row-header/row-header.tsx",
        lineNumber: 15,
        columnNumber: 5
    }, this);
}
_c = RowHeader;
var _c;
__turbopack_context__.k.register(_c, "RowHeader");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ui/select.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Select",
    ()=>Select,
    "SelectContent",
    ()=>SelectContent,
    "SelectGroup",
    ()=>SelectGroup,
    "SelectItem",
    ()=>SelectItem,
    "SelectLabel",
    ()=>SelectLabel,
    "SelectScrollDownButton",
    ()=>SelectScrollDownButton,
    "SelectScrollUpButton",
    ()=>SelectScrollUpButton,
    "SelectSeparator",
    ()=>SelectSeparator,
    "SelectTrigger",
    ()=>SelectTrigger,
    "SelectValue",
    ()=>SelectValue
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-select/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as CheckIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDownIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-client] (ecmascript) <export default as ChevronDownIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronUpIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-up.js [app-client] (ecmascript) <export default as ChevronUpIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
"use client";
;
;
;
;
function Select({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"], {
        "data-slot": "select",
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/select.tsx",
        lineNumber: 12,
        columnNumber: 10
    }, this);
}
_c = Select;
function SelectGroup({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Group"], {
        "data-slot": "select-group",
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/select.tsx",
        lineNumber: 18,
        columnNumber: 10
    }, this);
}
_c1 = SelectGroup;
function SelectValue({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Value"], {
        "data-slot": "select-value",
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/select.tsx",
        lineNumber: 24,
        columnNumber: 10
    }, this);
}
_c2 = SelectValue;
function SelectTrigger({ className, size = "default", children, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Trigger"], {
        "data-slot": "select-trigger",
        "data-size": size,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex w-fit items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", className),
        ...props,
        children: [
            children,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Icon"], {
                asChild: true,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDownIcon$3e$__["ChevronDownIcon"], {
                    className: "size-4 opacity-50"
                }, void 0, false, {
                    fileName: "[project]/components/ui/select.tsx",
                    lineNumber: 47,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/ui/select.tsx",
                lineNumber: 46,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/ui/select.tsx",
        lineNumber: 36,
        columnNumber: 5
    }, this);
}
_c3 = SelectTrigger;
function SelectContent({ className, children, position = "popper", align = "center", ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Portal"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Content"], {
            "data-slot": "select-content",
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border shadow-md", position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1", className),
            position: position,
            align: align,
            ...props,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SelectScrollUpButton, {}, void 0, false, {
                    fileName: "[project]/components/ui/select.tsx",
                    lineNumber: 74,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Viewport"], {
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("p-1", position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1"),
                    children: children
                }, void 0, false, {
                    fileName: "[project]/components/ui/select.tsx",
                    lineNumber: 75,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SelectScrollDownButton, {}, void 0, false, {
                    fileName: "[project]/components/ui/select.tsx",
                    lineNumber: 84,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/ui/select.tsx",
            lineNumber: 62,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/ui/select.tsx",
        lineNumber: 61,
        columnNumber: 5
    }, this);
}
_c4 = SelectContent;
function SelectLabel({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
        "data-slot": "select-label",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-muted-foreground px-2 py-1.5 text-xs", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/select.tsx",
        lineNumber: 95,
        columnNumber: 5
    }, this);
}
_c5 = SelectLabel;
function SelectItem({ className, children, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Item"], {
        "data-slot": "select-item",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("focus:bg-accent focus:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2", className),
        ...props,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "absolute right-2 flex size-3.5 items-center justify-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ItemIndicator"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckIcon$3e$__["CheckIcon"], {
                        className: "size-4"
                    }, void 0, false, {
                        fileName: "[project]/components/ui/select.tsx",
                        lineNumber: 119,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/ui/select.tsx",
                    lineNumber: 118,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/ui/select.tsx",
                lineNumber: 117,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ItemText"], {
                children: children
            }, void 0, false, {
                fileName: "[project]/components/ui/select.tsx",
                lineNumber: 122,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/ui/select.tsx",
        lineNumber: 109,
        columnNumber: 5
    }, this);
}
_c6 = SelectItem;
function SelectSeparator({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Separator"], {
        "data-slot": "select-separator",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("bg-border pointer-events-none -mx-1 my-1 h-px", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/select.tsx",
        lineNumber: 132,
        columnNumber: 5
    }, this);
}
_c7 = SelectSeparator;
function SelectScrollUpButton({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollUpButton"], {
        "data-slot": "select-scroll-up-button",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex cursor-default items-center justify-center py-1", className),
        ...props,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronUpIcon$3e$__["ChevronUpIcon"], {
            className: "size-4"
        }, void 0, false, {
            fileName: "[project]/components/ui/select.tsx",
            lineNumber: 153,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/ui/select.tsx",
        lineNumber: 145,
        columnNumber: 5
    }, this);
}
_c8 = SelectScrollUpButton;
function SelectScrollDownButton({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollDownButton"], {
        "data-slot": "select-scroll-down-button",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex cursor-default items-center justify-center py-1", className),
        ...props,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDownIcon$3e$__["ChevronDownIcon"], {
            className: "size-4"
        }, void 0, false, {
            fileName: "[project]/components/ui/select.tsx",
            lineNumber: 171,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/ui/select.tsx",
        lineNumber: 163,
        columnNumber: 5
    }, this);
}
_c9 = SelectScrollDownButton;
;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9;
__turbopack_context__.k.register(_c, "Select");
__turbopack_context__.k.register(_c1, "SelectGroup");
__turbopack_context__.k.register(_c2, "SelectValue");
__turbopack_context__.k.register(_c3, "SelectTrigger");
__turbopack_context__.k.register(_c4, "SelectContent");
__turbopack_context__.k.register(_c5, "SelectLabel");
__turbopack_context__.k.register(_c6, "SelectItem");
__turbopack_context__.k.register(_c7, "SelectSeparator");
__turbopack_context__.k.register(_c8, "SelectScrollUpButton");
__turbopack_context__.k.register(_c9, "SelectScrollDownButton");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ui/badge.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Badge",
    ()=>Badge,
    "badgeVariants",
    ()=>badgeVariants
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-slot/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/class-variance-authority/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
;
;
;
;
const badgeVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cva"])("inline-flex items-center justify-center rounded-full border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden", {
    variants: {
        variant: {
            default: "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
            secondary: "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
            destructive: "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
            outline: "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground"
        }
    },
    defaultVariants: {
        variant: "default"
    }
});
function Badge({ className, variant, asChild = false, ...props }) {
    const Comp = asChild ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Slot"] : "span";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Comp, {
        "data-slot": "badge",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(badgeVariants({
            variant
        }), className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/badge.tsx",
        lineNumber: 38,
        columnNumber: 5
    }, this);
}
_c = Badge;
;
var _c;
__turbopack_context__.k.register(_c, "Badge");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/features/planogram/components/planogram-categories-selector/planogram-categories-selector.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PlanogramCategoriesSelector",
    ()=>PlanogramCategoriesSelector
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/label.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/select.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/badge.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/features/planogram/store/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$planogram$2d$slice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/planogram/store/planogram-slice.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$hooks$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/features/planogram/hooks/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$hooks$2f$use$2d$planogram$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/planogram/hooks/use-planogram-data.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
function PlanogramCategoriesSelector() {
    _s();
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"])();
    const planogramSlug = params?.planogramSlug;
    const selectedCategoryIds = __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$planogram$2d$slice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramStore"].use.selectedCategoryIds();
    const toggleCategory = __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$planogram$2d$slice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramStore"].use.toggleCategory();
    const { planogramData, leafCategories, leafCategoriesLoading, leafCategoriesError } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$hooks$2f$use$2d$planogram$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramData"])(planogramSlug);
    const planogram = planogramData?.planogram;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                        children: "Categories"
                    }, void 0, false, {
                        fileName: "[project]/features/planogram/components/planogram-categories-selector/planogram-categories-selector.tsx",
                        lineNumber: 24,
                        columnNumber: 9
                    }, this),
                    leafCategoriesError ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-destructive",
                        children: [
                            "Error loading categories: ",
                            leafCategoriesError
                        ]
                    }, void 0, true, {
                        fileName: "[project]/features/planogram/components/planogram-categories-selector/planogram-categories-selector.tsx",
                        lineNumber: 26,
                        columnNumber: 11
                    }, this) : leafCategoriesLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-muted-foreground",
                        children: "Loading categories..."
                    }, void 0, false, {
                        fileName: "[project]/features/planogram/components/planogram-categories-selector/planogram-categories-selector.tsx",
                        lineNumber: 28,
                        columnNumber: 11
                    }, this) : leafCategories.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Select"], {
                        value: "",
                        onValueChange: (value)=>{
                            const categoryId = parseInt(value);
                            if (!selectedCategoryIds.includes(categoryId)) {
                                toggleCategory(categoryId);
                            }
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectValue"], {
                                    placeholder: "Select category"
                                }, void 0, false, {
                                    fileName: "[project]/features/planogram/components/planogram-categories-selector/planogram-categories-selector.tsx",
                                    lineNumber: 40,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/features/planogram/components/planogram-categories-selector/planogram-categories-selector.tsx",
                                lineNumber: 39,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectContent"], {
                                children: leafCategories.map((category)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                        value: category.id.toString(),
                                        children: category.name
                                    }, category.id, false, {
                                        fileName: "[project]/features/planogram/components/planogram-categories-selector/planogram-categories-selector.tsx",
                                        lineNumber: 44,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/features/planogram/components/planogram-categories-selector/planogram-categories-selector.tsx",
                                lineNumber: 42,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/features/planogram/components/planogram-categories-selector/planogram-categories-selector.tsx",
                        lineNumber: 30,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-muted-foreground",
                        children: "No categories available"
                    }, void 0, false, {
                        fileName: "[project]/features/planogram/components/planogram-categories-selector/planogram-categories-selector.tsx",
                        lineNumber: 51,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/features/planogram/components/planogram-categories-selector/planogram-categories-selector.tsx",
                lineNumber: 23,
                columnNumber: 7
            }, this),
            selectedCategoryIds.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4 pt-4 border-t",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                        className: "text-xs text-muted-foreground mb-2",
                        children: "Selected Categories"
                    }, void 0, false, {
                        fileName: "[project]/features/planogram/components/planogram-categories-selector/planogram-categories-selector.tsx",
                        lineNumber: 58,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap gap-2",
                        children: selectedCategoryIds.map((categoryId)=>{
                            const planogramCategories = planogram?.categories;
                            const planogramCategory = planogramCategories?.find((c)=>c.id === categoryId);
                            const leafCategory = leafCategories.find((c)=>c.id === categoryId);
                            const categoryName = planogramCategory?.name || leafCategory?.name || `Category ${categoryId}`;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                variant: "secondary",
                                className: "inline-flex items-center gap-2",
                                children: [
                                    categoryName,
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>toggleCategory(categoryId),
                                        className: "hover:text-destructive cursor-pointer",
                                        children: "×"
                                    }, void 0, false, {
                                        fileName: "[project]/features/planogram/components/planogram-categories-selector/planogram-categories-selector.tsx",
                                        lineNumber: 68,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, categoryId, true, {
                                fileName: "[project]/features/planogram/components/planogram-categories-selector/planogram-categories-selector.tsx",
                                lineNumber: 66,
                                columnNumber: 17
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/features/planogram/components/planogram-categories-selector/planogram-categories-selector.tsx",
                        lineNumber: 59,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/features/planogram/components/planogram-categories-selector/planogram-categories-selector.tsx",
                lineNumber: 57,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true);
}
_s(PlanogramCategoriesSelector, "DSnaDK4igvKSNUIKrqehmijCMIc=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"],
        __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$hooks$2f$use$2d$planogram$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramData"]
    ];
});
_c = PlanogramCategoriesSelector;
var _c;
__turbopack_context__.k.register(_c, "PlanogramCategoriesSelector");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/features/planogram/index.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/features/planogram/store/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$queries$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/features/planogram/queries/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$hooks$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/features/planogram/hooks/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/planogram/types.ts [app-client] (ecmascript)");
// Components (partial - Phase 7 in progress)
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$components$2f$ai$2d$overview$2d$dialog$2f$ai$2d$overview$2d$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/planogram/components/ai-overview-dialog/ai-overview-dialog.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$components$2f$planogram$2d$download$2d$button$2f$planogram$2d$download$2d$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/planogram/components/planogram-download-button/planogram-download-button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$components$2f$planogram$2d$delete$2d$button$2f$planogram$2d$delete$2d$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/planogram/components/planogram-delete-button/planogram-delete-button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$components$2f$planogram$2d$name$2d$field$2f$planogram$2d$name$2d$field$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/planogram/components/planogram-name-field/planogram-name-field.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$components$2f$row$2d$header$2f$row$2d$header$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/planogram/components/row-header/row-header.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$components$2f$planogram$2d$categories$2d$selector$2f$planogram$2d$categories$2d$selector$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/planogram/components/planogram-categories-selector/planogram-categories-selector.tsx [app-client] (ecmascript)"); // TODO: Add remaining components as they are migrated
 // - ItemMenu
 // - PlanogramActions
 // - PlanogramFormFields
 // - PlanogramHeader
 // - ShelvesTable
 // - ProductSidebar
 // - AvailableProductsSidebar
 // - PlanogramGrid (Grid)
 // - Planogram3DView (ThreeJSView)
 // - PlanogramEditor (NEW - main container)
;
;
;
;
;
;
;
;
;
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/features/planogram/store/index.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "usePlanogramStore",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$planogram$2d$slice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramStore"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/features/planogram/store/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$planogram$2d$slice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/planogram/store/planogram-slice.ts [app-client] (ecmascript)");
}),
"[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/RowHeader.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>RowHeader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/features/planogram/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/planogram/store/index.ts [app-client] (ecmascript)");
'use client';
;
;
function RowHeader({ rowName, rowId }) {
    const rowNotifications = __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramStore"].use.rowNotifications();
    const rowNotification = rowNotifications[rowId];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mb-2",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                    className: "text-sm font-semibold",
                    children: rowName
                }, void 0, false, {
                    fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/RowHeader.tsx",
                    lineNumber: 17,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/RowHeader.tsx",
                lineNumber: 16,
                columnNumber: 7
            }, this),
            rowNotification && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-1 text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded px-2 py-1 inline-block",
                children: rowNotification
            }, void 0, false, {
                fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/RowHeader.tsx",
                lineNumber: 19,
                columnNumber: 27
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/RowHeader.tsx",
        lineNumber: 15,
        columnNumber: 5
    }, this);
}
_c = RowHeader;
var _c;
__turbopack_context__.k.register(_c, "RowHeader");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/Grid.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Grid
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$grid$2d$layout$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-grid-layout/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$dashboard$2f$projects$2f5b$projectSlug$5d2f$planograms$2f5b$planogramSlug$5d2f$components$2f$RowHeader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/RowHeader.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/features/planogram/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/planogram/store/index.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$hooks$2f$use$2d$planogram$2d$form$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/planogram/hooks/use-planogram-form.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$hooks$2f$use$2d$planogram$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/planogram/hooks/use-planogram-data.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$hooks$2f$use$2d$grid$2d$actions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/planogram/hooks/use-grid-actions.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
const GridLayoutWithProvider = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$grid$2d$layout$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WidthProvider"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$grid$2d$layout$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]);
_c = GridLayoutWithProvider;
function Grid() {
    _s();
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"])();
    const planogramSlug = params?.planogramSlug;
    const gridData = __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramStore"].use.gridData();
    const loading = __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramStore"].use.loading();
    const rowLayouts = __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramStore"].use.rowLayouts();
    const setRowLayouts = __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramStore"].use.setRowLayouts();
    const rowNotifications = __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramStore"].use.rowNotifications();
    const setRowNotification = __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramStore"].use.setRowNotification();
    const availableProductsSidebarOpen = __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramStore"].use.availableProductsSidebarOpen();
    const toggleAvailableProductsSidebar = __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramStore"].use.toggleAvailableProductsSidebar();
    const setTargetRowId = __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramStore"].use.setTargetRowId();
    const { planogramData, refetchPlanogram, fetchAvailableProducts } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$hooks$2f$use$2d$planogram$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramData"])(planogramSlug);
    const { handleSaveLayout: saveLayout } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$hooks$2f$use$2d$planogram$2d$form$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramForm"])(planogramSlug, planogramData ?? null, refetchPlanogram, fetchAvailableProducts);
    const [editMode, setEditMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isInitialized, setIsInitialized] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Initialize when gridData changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Grid.useEffect": ()=>{
            if (gridData) {
                // Mark as initialized after a brief delay to allow rowLayouts to be set
                const timer = setTimeout({
                    "Grid.useEffect.timer": ()=>setIsInitialized(true)
                }["Grid.useEffect.timer"], 100);
                return ({
                    "Grid.useEffect": ()=>clearTimeout(timer)
                })["Grid.useEffect"];
            } else {
                // Reset initialization when gridData is cleared
                const timer = setTimeout({
                    "Grid.useEffect.timer": ()=>setIsInitialized(false)
                }["Grid.useEffect.timer"], 0);
                return ({
                    "Grid.useEffect": ()=>clearTimeout(timer)
                })["Grid.useEffect"];
            }
        }
    }["Grid.useEffect"], [
        gridData
    ]);
    // Wrapper for setRowLayouts to match React Dispatch signature
    const handleSetRowLayouts = (value)=>{
        if (typeof value === 'function') {
            setRowLayouts(value(rowLayouts));
        } else {
            setRowLayouts(value);
        }
    };
    // Wrapper for setRowNotifications to match React Dispatch signature
    const handleSetRowNotifications = (value)=>{
        if (typeof value === 'function') {
            const updated = value(rowNotifications);
            // Update each notification individually
            Object.entries(updated).forEach(([rowIdStr, message])=>{
                setRowNotification(parseInt(rowIdStr), message);
            });
            // Clear notifications that are no longer in the updated object
            Object.keys(rowNotifications).forEach((rowIdStr)=>{
                if (!(rowIdStr in updated)) {
                    setRowNotification(parseInt(rowIdStr), null);
                }
            });
        } else {
            // Clear all existing notifications
            Object.keys(rowNotifications).forEach((rowIdStr)=>{
                setRowNotification(parseInt(rowIdStr), null);
            });
            // Set new notifications
            Object.entries(value).forEach(([rowIdStr, message])=>{
                setRowNotification(parseInt(rowIdStr), message);
            });
        }
    };
    const { handleLayoutChange } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$hooks$2f$use$2d$grid$2d$actions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGridActions"])({
        gridData,
        rowLayouts,
        setRowLayouts: handleSetRowLayouts,
        setSelectedItem: {
            "Grid.useGridActions": ()=>{}
        }["Grid.useGridActions"],
        setRowNotifications: handleSetRowNotifications,
        selectedItem: null
    });
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex justify-center items-center py-12",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"
            }, void 0, false, {
                fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/Grid.tsx",
                lineNumber: 94,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/Grid.tsx",
            lineNumber: 93,
            columnNumber: 7
        }, this);
    }
    if (!gridData) {
        return null;
    }
    const handleItemDelete = (rowId, itemId)=>{
        if (!gridData) return;
        const row = gridData.rows.find((r)=>r.id === rowId);
        if (!row) return;
        const currentLayout = rowLayouts[rowId] && rowLayouts[rowId].length > 0 ? rowLayouts[rowId] : row.items;
        // Remove from grid
        handleSetRowLayouts((prev)=>({
                ...prev,
                [rowId]: currentLayout.filter((item)=>item.i !== itemId)
            }));
    };
    const handleSaveLayout = async ()=>{
        await saveLayout(rowLayouts);
        // Exit edit mode after saving
        setEditMode(false);
    };
    const handleToggleAddItems = ()=>{
        if (!availableProductsSidebarOpen && gridData?.rows.length > 0) {
            // Set target to first row by default when opening
            setTargetRowId(gridData.rows[0].id);
        }
        toggleAvailableProductsSidebar();
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-card p-6 rounded-lg shadow-md",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between mb-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-xl font-bold",
                        children: "Shelf Layout"
                    }, void 0, false, {
                        fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/Grid.tsx",
                        lineNumber: 135,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: !editMode ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                onClick: ()=>{
                                    setEditMode(true);
                                },
                                size: "sm",
                                variant: "outline",
                                className: "cursor-pointer",
                                children: "Edit Mode"
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/Grid.tsx",
                                lineNumber: 139,
                                columnNumber: 15
                            }, this)
                        }, void 0, false) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    onClick: handleToggleAddItems,
                                    size: "sm",
                                    variant: "outline",
                                    className: "cursor-pointer",
                                    children: "Add Items"
                                }, void 0, false, {
                                    fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/Grid.tsx",
                                    lineNumber: 152,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    onClick: handleSaveLayout,
                                    size: "sm",
                                    className: "cursor-pointer",
                                    children: "Save Layout"
                                }, void 0, false, {
                                    fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/Grid.tsx",
                                    lineNumber: 155,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true)
                    }, void 0, false, {
                        fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/Grid.tsx",
                        lineNumber: 136,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/Grid.tsx",
                lineNumber: 134,
                columnNumber: 7
            }, this),
            gridData.rows.map((row)=>{
                // Use rowLayouts if available and has items, otherwise fallback to row.items from gridData
                // This ensures we always have proper meta data
                const currentLayout = rowLayouts[row.id] && rowLayouts[row.id].length > 0 ? rowLayouts[row.id] : row.items;
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mb-6 relative",
                    children: [
                        editMode && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$dashboard$2f$projects$2f5b$projectSlug$5d2f$planograms$2f5b$planogramSlug$5d2f$components$2f$RowHeader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            rowName: row.name || 'Row',
                            rowId: row.id
                        }, void 0, false, {
                            fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/Grid.tsx",
                            lineNumber: 168,
                            columnNumber: 26
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(GridLayoutWithProvider, {
                            className: "layout border-2 border-border bg-muted rounded",
                            layout: currentLayout,
                            onLayoutChange: (newLayout)=>{
                                // Only handle layout changes in edit mode
                                if (!editMode) {
                                    return;
                                }
                                // Don't handle layout changes until initialized and we have valid meta data
                                if (!isInitialized) {
                                    return;
                                }
                                // Check if all items in newLayout have corresponding items with meta
                                const hasValidMeta = newLayout.every((newItem)=>{
                                    const existingItem = currentLayout.find((item)=>item.i === newItem.i);
                                    return existingItem && existingItem.meta && existingItem.meta.name && existingItem.meta.name !== 'Unknown';
                                });
                                if (hasValidMeta && currentLayout.length > 0) {
                                    handleLayoutChange(row.id, newLayout);
                                }
                            },
                            cols: gridData.grid.cols,
                            rowHeight: 100,
                            isResizable: false,
                            isDraggable: editMode,
                            margin: [
                                4,
                                4
                            ],
                            children: currentLayout.map((item)=>{
                                const bgColor = item.meta.color || '#9ca3af';
                                const widthIn = item.meta.pack_width_in;
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: `border-2 rounded p-2 flex flex-col items-center justify-center text-sm text-center font-bold text-white drop-shadow-md relative ${editMode ? 'cursor-move' : 'cursor-default'}`,
                                    style: {
                                        backgroundColor: bgColor,
                                        borderColor: bgColor
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex-1 flex items-center justify-center",
                                            children: item.meta.name
                                        }, void 0, false, {
                                            fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/Grid.tsx",
                                            lineNumber: 204,
                                            columnNumber: 21
                                        }, this),
                                        widthIn && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-[10px] font-normal opacity-90 mt-1",
                                            children: [
                                                widthIn.toFixed(1),
                                                '"'
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/Grid.tsx",
                                            lineNumber: 205,
                                            columnNumber: 33
                                        }, this),
                                        editMode && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: (e)=>{
                                                e.stopPropagation();
                                                handleItemDelete(row.id, item.i);
                                            },
                                            className: "absolute top-1 right-1 bg-white/90 text-black rounded w-5 h-5 flex items-center justify-center text-xs hover:bg-white shadow-sm cursor-pointer",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                className: "h-4 w-4"
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/Grid.tsx",
                                                lineNumber: 215,
                                                columnNumber: 25
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/Grid.tsx",
                                            lineNumber: 207,
                                            columnNumber: 23
                                        }, this)
                                    ]
                                }, item.i, true, {
                                    fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/Grid.tsx",
                                    lineNumber: 203,
                                    columnNumber: 19
                                }, this);
                            })
                        }, void 0, false, {
                            fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/Grid.tsx",
                            lineNumber: 169,
                            columnNumber: 13
                        }, this)
                    ]
                }, row.id, true, {
                    fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/Grid.tsx",
                    lineNumber: 167,
                    columnNumber: 11
                }, this);
            })
        ]
    }, void 0, true, {
        fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/Grid.tsx",
        lineNumber: 133,
        columnNumber: 5
    }, this);
}
_s(Grid, "xinbl6WU3M66EK0ig7yckM5MCos=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"],
        __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$hooks$2f$use$2d$planogram$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramData"],
        __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$hooks$2f$use$2d$planogram$2d$form$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramForm"],
        __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$hooks$2f$use$2d$grid$2d$actions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGridActions"]
    ];
});
_c1 = Grid;
var _c, _c1;
__turbopack_context__.k.register(_c, "GridLayoutWithProvider");
__turbopack_context__.k.register(_c1, "Grid");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/stores/themeStore.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useThemeStore",
    ()=>useThemeStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/react.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/middleware.mjs [app-client] (ecmascript)");
;
;
const useThemeStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["create"])()((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["devtools"])((set)=>({
        isDark: false,
        setIsDark: (isDark)=>set({
                isDark
            }, false, 'theme/setIsDark'),
        initTheme: ()=>{
            const checkTheme = ()=>{
                const isDark = document.documentElement.classList.contains('dark');
                set({
                    isDark
                }, false, 'theme/initTheme');
            };
            checkTheme();
            const observer = new MutationObserver(checkTheme);
            observer.observe(document.documentElement, {
                attributes: true,
                attributeFilter: [
                    'class'
                ]
            });
            return ()=>observer.disconnect();
        }
    }), {
    name: 'ThemeStore'
}));
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/ThreeJSView.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ThreeJSView
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$react$2d$three$2d$fiber$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/react-three-fiber.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$OrbitControls$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@react-three/drei/core/OrbitControls.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$PerspectiveCamera$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@react-three/drei/core/PerspectiveCamera.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@react-three/drei/core/Text.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$stores$2f$themeStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/stores/themeStore.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature();
'use client';
;
;
;
;
// Simple product box component
function ProductBox({ item, position, size, color }) {
    const [width, , depth] = size;
    const productName = item.meta.name || 'Unknown';
    // Position text in the center of the box
    // Calculate font size based on box width and text length
    // Longer text gets smaller font size
    const textLength = productName.length;
    const baseFontSize = Math.min(0.2, width * 0.2);
    // Decrease font size for longer text (scale down by up to 40% for very long text)
    const lengthFactor = textLength > 20 ? 0.6 : textLength > 15 ? 0.7 : textLength > 10 ? 0.85 : 1.0;
    const fontSize = baseFontSize * lengthFactor;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
        position: position,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                        args: size
                    }, void 0, false, {
                        fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/ThreeJSView.tsx",
                        lineNumber: 31,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                        color: color
                    }, void 0, false, {
                        fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/ThreeJSView.tsx",
                        lineNumber: 32,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/ThreeJSView.tsx",
                lineNumber: 30,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Suspense"], {
                fallback: null,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                    position: [
                        0,
                        0,
                        depth / 2 + 0.01
                    ],
                    fontSize: fontSize,
                    color: "white",
                    anchorX: "center",
                    anchorY: "middle",
                    maxWidth: width * 0.9,
                    textAlign: "center",
                    outlineWidth: 0.02,
                    outlineColor: "#000000",
                    font: "https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Mu4mxP.ttf",
                    children: productName
                }, void 0, false, {
                    fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/ThreeJSView.tsx",
                    lineNumber: 36,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/ThreeJSView.tsx",
                lineNumber: 35,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/ThreeJSView.tsx",
        lineNumber: 29,
        columnNumber: 5
    }, this);
}
_c = ProductBox;
// Shelf row component
function ShelfRow({ rowId, rowLayouts, rowIndex, cellWidth, shelfWidth, totalRows }) {
    _s();
    const { isDark } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$stores$2f$themeStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useThemeStore"])();
    // Scale up shelf dimensions proportionally
    const scaleFactor = 1.5;
    const rowHeight = 0.2 * scaleFactor;
    const rowDepth = 0.4 * scaleFactor;
    const rowSpacing = 1.2 * scaleFactor;
    // Reverse the order: first row (index 0) should be at the top, last row at the bottom
    const reversedIndex = totalRows - 1 - rowIndex;
    const yPosition = reversedIndex * rowSpacing;
    const items = rowLayouts[rowId] || [];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
        position: [
            0,
            yPosition,
            0
        ],
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                position: [
                    0,
                    0,
                    0
                ],
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                        args: [
                            shelfWidth,
                            rowHeight,
                            rowDepth
                        ]
                    }, void 0, false, {
                        fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/ThreeJSView.tsx",
                        lineNumber: 61,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                        color: isDark ? '#6b5b4a' : '#8b7355'
                    }, void 0, false, {
                        fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/ThreeJSView.tsx",
                        lineNumber: 62,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/ThreeJSView.tsx",
                lineNumber: 60,
                columnNumber: 7
            }, this),
            items.map((item)=>{
                const scaleFactor = 1.5;
                const itemWidth = item.w * cellWidth;
                // Calculate height based on product's pack_height_in, converted to Three.js scale
                // Convert inches to Three.js units (same scale as cellWidth: 0.1) and scale up
                const itemHeight = (item.meta.pack_height_in || 3.0) * 0.1 * scaleFactor;
                const itemDepth = rowDepth * 0.9;
                const xPosition = item.x * cellWidth - shelfWidth / 2 + itemWidth / 2;
                // Use color from backend, fallback to gray
                const color = item.meta.color || '#9ca3af';
                // Position product on top of shelf
                const yPosition = rowHeight / 2 + itemHeight / 2;
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ProductBox, {
                    item: item,
                    position: [
                        xPosition,
                        yPosition,
                        0
                    ],
                    size: [
                        itemWidth,
                        itemHeight,
                        itemDepth
                    ],
                    color: color
                }, item.i, false, {
                    fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/ThreeJSView.tsx",
                    lineNumber: 79,
                    columnNumber: 16
                }, this);
            })
        ]
    }, void 0, true, {
        fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/ThreeJSView.tsx",
        lineNumber: 58,
        columnNumber: 5
    }, this);
}
_s(ShelfRow, "NEV/WFSMtbiQDQonCj3xB2nDg2Q=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$stores$2f$themeStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useThemeStore"]
    ];
});
_c1 = ShelfRow;
// Main scene component
function Scene({ gridData, rowLayouts }) {
    _s1();
    const { isDark } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$stores$2f$themeStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useThemeStore"])();
    // Scale factor to make boxes bigger proportionally
    const scaleFactor = 1.5;
    const shelfWidth = gridData.grid.cols * gridData.grid.cellWidthIn * 0.1 * scaleFactor;
    const cellWidth = gridData.grid.cellWidthIn * 0.1 * scaleFactor;
    // Calculate center position based on number of rows
    const totalRows = gridData.rows.length;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ambientLight", {
                intensity: isDark ? 0.8 : 0.6
            }, void 0, false, {
                fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/ThreeJSView.tsx",
                lineNumber: 98,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("directionalLight", {
                position: [
                    5,
                    10,
                    5
                ],
                intensity: isDark ? 1.5 : 1.2,
                castShadow: true
            }, void 0, false, {
                fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/ThreeJSView.tsx",
                lineNumber: 99,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pointLight", {
                position: [
                    -5,
                    5,
                    -5
                ],
                intensity: isDark ? 0.7 : 0.5
            }, void 0, false, {
                fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/ThreeJSView.tsx",
                lineNumber: 100,
                columnNumber: 7
            }, this),
            gridData.rows.map((row, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ShelfRow, {
                    rowId: row.id,
                    rowLayouts: rowLayouts,
                    rowIndex: index,
                    cellWidth: cellWidth,
                    shelfWidth: shelfWidth,
                    totalRows: totalRows
                }, row.id, false, {
                    fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/ThreeJSView.tsx",
                    lineNumber: 104,
                    columnNumber: 9
                }, this))
        ]
    }, void 0, true);
}
_s1(Scene, "NEV/WFSMtbiQDQonCj3xB2nDg2Q=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$stores$2f$themeStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useThemeStore"]
    ];
});
_c2 = Scene;
function ThreeJSView({ gridData, rowLayouts }) {
    _s2();
    const { isDark, initTheme } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$stores$2f$themeStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useThemeStore"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ThreeJSView.useEffect": ()=>{
            const cleanup = initTheme();
            return cleanup;
        }
    }["ThreeJSView.useEffect"], [
        initTheme
    ]);
    // Calculate center position based on number of rows for better initial view
    const scaleFactor = 1.5;
    const totalRows = gridData.rows.length;
    const rowSpacing = 1.2 * scaleFactor;
    const centerY = (totalRows - 1) * rowSpacing / 2;
    const shelfWidth = gridData.grid.cols * gridData.grid.cellWidthIn * 0.1 * scaleFactor;
    // Position camera to center on the shelves
    const cameraY = centerY + 2;
    const cameraZ = Math.max(10, shelfWidth * 0.8);
    // Calculate canvas height proportionally based on number of rows
    // Base height for 3 rows or less, then add height for each additional row
    const baseHeight = 500;
    const heightPerRow = 150;
    const canvasHeight = totalRows <= 3 ? baseHeight : baseHeight + (totalRows - 3) * heightPerRow;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-card p-6 rounded-lg shadow-md mt-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between mb-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-xl font-bold",
                        children: "3D Visualization"
                    }, void 0, false, {
                        fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/ThreeJSView.tsx",
                        lineNumber: 138,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-xs text-muted-foreground",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: "Mouse: Drag to rotate, Scroll to zoom, Right-click to pan"
                        }, void 0, false, {
                            fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/ThreeJSView.tsx",
                            lineNumber: 140,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/ThreeJSView.tsx",
                        lineNumber: 139,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/ThreeJSView.tsx",
                lineNumber: 137,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-full border-2 border-border rounded-lg overflow-hidden bg-muted",
                style: {
                    height: `${canvasHeight}px`
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Suspense"], {
                    fallback: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-full h-full flex items-center justify-center",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-muted-foreground",
                            children: "Loading 3D visualization..."
                        }, void 0, false, {
                            fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/ThreeJSView.tsx",
                            lineNumber: 147,
                            columnNumber: 15
                        }, void 0)
                    }, void 0, false, {
                        fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/ThreeJSView.tsx",
                        lineNumber: 146,
                        columnNumber: 13
                    }, void 0),
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$react$2d$three$2d$fiber$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Canvas"], {
                        camera: {
                            position: [
                                0,
                                cameraY,
                                cameraZ
                            ],
                            fov: 50
                        },
                        gl: {
                            antialias: true,
                            alpha: true
                        },
                        dpr: [
                            1,
                            2
                        ],
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("color", {
                                attach: "background",
                                args: [
                                    isDark ? '#1a1a1a' : '#ffffff'
                                ]
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/ThreeJSView.tsx",
                                lineNumber: 152,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$PerspectiveCamera$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PerspectiveCamera"], {
                                makeDefault: true,
                                position: [
                                    0,
                                    cameraY,
                                    cameraZ
                                ]
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/ThreeJSView.tsx",
                                lineNumber: 153,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$OrbitControls$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OrbitControls"], {
                                enablePan: true,
                                enableZoom: true,
                                enableRotate: true,
                                minDistance: 5,
                                maxDistance: 30,
                                enableDamping: true,
                                dampingFactor: 0.05,
                                target: [
                                    0,
                                    centerY,
                                    0
                                ]
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/ThreeJSView.tsx",
                                lineNumber: 154,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Scene, {
                                gridData: gridData,
                                rowLayouts: rowLayouts
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/ThreeJSView.tsx",
                                lineNumber: 155,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/ThreeJSView.tsx",
                        lineNumber: 151,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/ThreeJSView.tsx",
                    lineNumber: 144,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/ThreeJSView.tsx",
                lineNumber: 143,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/ThreeJSView.tsx",
        lineNumber: 136,
        columnNumber: 5
    }, this);
}
_s2(ThreeJSView, "6arNKZ4E2fTXHkKZCFU+yaqROz4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$stores$2f$themeStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useThemeStore"]
    ];
});
_c3 = ThreeJSView;
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "ProductBox");
__turbopack_context__.k.register(_c1, "ShelfRow");
__turbopack_context__.k.register(_c2, "Scene");
__turbopack_context__.k.register(_c3, "ThreeJSView");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ui/card.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Card",
    ()=>Card,
    "CardAction",
    ()=>CardAction,
    "CardContent",
    ()=>CardContent,
    "CardDescription",
    ()=>CardDescription,
    "CardFooter",
    ()=>CardFooter,
    "CardHeader",
    ()=>CardHeader,
    "CardTitle",
    ()=>CardTitle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
;
;
function Card({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/card.tsx",
        lineNumber: 7,
        columnNumber: 5
    }, this);
}
_c = Card;
function CardHeader({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-header",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/card.tsx",
        lineNumber: 20,
        columnNumber: 5
    }, this);
}
_c1 = CardHeader;
function CardTitle({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-title",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("leading-none font-semibold", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/card.tsx",
        lineNumber: 33,
        columnNumber: 5
    }, this);
}
_c2 = CardTitle;
function CardDescription({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-description",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-muted-foreground text-sm", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/card.tsx",
        lineNumber: 43,
        columnNumber: 5
    }, this);
}
_c3 = CardDescription;
function CardAction({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-action",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("col-start-2 row-span-2 row-start-1 self-start justify-self-end", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/card.tsx",
        lineNumber: 53,
        columnNumber: 5
    }, this);
}
_c4 = CardAction;
function CardContent({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-content",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("px-6", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/card.tsx",
        lineNumber: 66,
        columnNumber: 5
    }, this);
}
_c5 = CardContent;
function CardFooter({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-footer",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex items-center px-6 [.border-t]:pt-6", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/card.tsx",
        lineNumber: 76,
        columnNumber: 5
    }, this);
}
_c6 = CardFooter;
;
var _c, _c1, _c2, _c3, _c4, _c5, _c6;
__turbopack_context__.k.register(_c, "Card");
__turbopack_context__.k.register(_c1, "CardHeader");
__turbopack_context__.k.register(_c2, "CardTitle");
__turbopack_context__.k.register(_c3, "CardDescription");
__turbopack_context__.k.register(_c4, "CardAction");
__turbopack_context__.k.register(_c5, "CardContent");
__turbopack_context__.k.register(_c6, "CardFooter");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ui/checkbox.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Checkbox",
    ()=>Checkbox
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$checkbox$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-checkbox/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as CheckIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
"use client";
;
;
;
;
function Checkbox({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$checkbox$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"], {
        "data-slot": "checkbox",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("peer border-input dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50", className),
        ...props,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$checkbox$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Indicator"], {
            "data-slot": "checkbox-indicator",
            className: "grid place-content-center text-current transition-none",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckIcon$3e$__["CheckIcon"], {
                className: "size-3.5"
            }, void 0, false, {
                fileName: "[project]/components/ui/checkbox.tsx",
                lineNumber: 26,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/ui/checkbox.tsx",
            lineNumber: 22,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/ui/checkbox.tsx",
        lineNumber: 14,
        columnNumber: 5
    }, this);
}
_c = Checkbox;
;
var _c;
__turbopack_context__.k.register(_c, "Checkbox");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/ProductSidebar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ProductSidebar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/axios.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/label.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/select.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$checkbox$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/checkbox.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-left.js [app-client] (ecmascript) <export default as ChevronLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-client] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/features/planogram/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/planogram/store/index.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
;
;
function ProductSidebar() {
    _s();
    const season = __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramStore"].use.season();
    const sidebarExpanded = __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramStore"].use.sidebarExpanded();
    const toggleSidebar = __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramStore"].use.toggleSidebar();
    const toggleSidebarExpand = __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramStore"].use.toggleSidebarExpand();
    const [selectedCategory, setSelectedCategory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('fresh');
    const url = `/categories/path/${selectedCategory}/?season=${season}`;
    const { data, isLoading: loading, error } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            'category-path',
            selectedCategory,
            season
        ],
        queryFn: {
            "ProductSidebar.useQuery": async ()=>{
                const response = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(url);
                return response.data;
            }
        }["ProductSidebar.useQuery"]
    });
    const items = data?.items || [];
    const isProducts = data?.products || false;
    const seasonDisplay = season.charAt(0).toUpperCase() + season.slice(1);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `fixed left-0 top-0 h-screen z-40 transition-all duration-300 ${sidebarExpanded ? 'w-xl' : 'w-96'} overflow-hidden bg-card border-r`,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "h-full",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                className: "h-full rounded-none border-r border-t-0 border-b-0 border-l-0 flex flex-col",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                        className: "shrink-0",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-between",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardTitle"], {
                                            children: "All Products"
                                        }, void 0, false, {
                                            fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/ProductSidebar.tsx",
                                            lineNumber: 47,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm text-muted-foreground mt-1",
                                            children: [
                                                "Season: ",
                                                seasonDisplay
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/ProductSidebar.tsx",
                                            lineNumber: 48,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/ProductSidebar.tsx",
                                    lineNumber: 46,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                            variant: "ghost",
                                            size: "icon",
                                            onClick: toggleSidebarExpand,
                                            className: "h-8 w-8",
                                            title: sidebarExpanded ? 'Collapse' : 'Expand',
                                            children: sidebarExpanded ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__["ChevronLeft"], {
                                                className: "h-4 w-4"
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/ProductSidebar.tsx",
                                                lineNumber: 52,
                                                columnNumber: 38
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                                className: "h-4 w-4"
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/ProductSidebar.tsx",
                                                lineNumber: 52,
                                                columnNumber: 76
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/ProductSidebar.tsx",
                                            lineNumber: 51,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                            variant: "ghost",
                                            size: "icon",
                                            onClick: toggleSidebar,
                                            className: "h-8 w-8",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                className: "h-4 w-4"
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/ProductSidebar.tsx",
                                                lineNumber: 55,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/ProductSidebar.tsx",
                                            lineNumber: 54,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/ProductSidebar.tsx",
                                    lineNumber: 50,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/ProductSidebar.tsx",
                            lineNumber: 45,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/ProductSidebar.tsx",
                        lineNumber: 44,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                        className: "p-6 flex-1 overflow-y-auto",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                            htmlFor: "category",
                                            children: "Type"
                                        }, void 0, false, {
                                            fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/ProductSidebar.tsx",
                                            lineNumber: 63,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Select"], {
                                            value: selectedCategory,
                                            onValueChange: setSelectedCategory,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                                    id: "category",
                                                    className: "w-full",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectValue"], {
                                                        placeholder: "Select type"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/ProductSidebar.tsx",
                                                        lineNumber: 66,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/ProductSidebar.tsx",
                                                    lineNumber: 65,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectContent"], {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                            value: "fresh",
                                                            children: "Fresh"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/ProductSidebar.tsx",
                                                            lineNumber: 69,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                            value: "frozen",
                                                            children: "Frozen"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/ProductSidebar.tsx",
                                                            lineNumber: 70,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/ProductSidebar.tsx",
                                                    lineNumber: 68,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/ProductSidebar.tsx",
                                            lineNumber: 64,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/ProductSidebar.tsx",
                                    lineNumber: 62,
                                    columnNumber: 15
                                }, this),
                                loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-sm text-muted-foreground",
                                    children: "Loading..."
                                }, void 0, false, {
                                    fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/ProductSidebar.tsx",
                                    lineNumber: 74,
                                    columnNumber: 27
                                }, this),
                                error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-sm text-destructive",
                                    children: [
                                        "Error: ",
                                        error.message
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/ProductSidebar.tsx",
                                    lineNumber: 75,
                                    columnNumber: 25
                                }, this),
                                !loading && !error && !isProducts && items.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                            children: "Categories"
                                        }, void 0, false, {
                                            fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/ProductSidebar.tsx",
                                            lineNumber: 78,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-2",
                                            children: items.map((item)=>{
                                                if ('key' in item && item.key) {
                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CategoryItem, {
                                                        path: `${selectedCategory}/${item.key}`,
                                                        categoryName: item.name || '',
                                                        season: season
                                                    }, item.key, false, {
                                                        fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/ProductSidebar.tsx",
                                                        lineNumber: 82,
                                                        columnNumber: 32
                                                    }, this);
                                                }
                                                return null;
                                            })
                                        }, void 0, false, {
                                            fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/ProductSidebar.tsx",
                                            lineNumber: 79,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/ProductSidebar.tsx",
                                    lineNumber: 77,
                                    columnNumber: 17
                                }, this),
                                !loading && !error && items.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-sm text-muted-foreground",
                                    children: "No items found"
                                }, void 0, false, {
                                    fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/ProductSidebar.tsx",
                                    lineNumber: 89,
                                    columnNumber: 60
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/ProductSidebar.tsx",
                            lineNumber: 61,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/ProductSidebar.tsx",
                        lineNumber: 60,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/ProductSidebar.tsx",
                lineNumber: 43,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/ProductSidebar.tsx",
            lineNumber: 42,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/ProductSidebar.tsx",
        lineNumber: 41,
        columnNumber: 5
    }, this);
}
_s(ProductSidebar, "kIWzh4rhZff2b7/F4T42y9RW1hk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
_c = ProductSidebar;
function CategoryItem({ path, categoryName, season }) {
    _s1();
    const [isExpanded, setIsExpanded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const url = `/categories/path/${path}/?season=${season}`;
    const { data, isLoading: loading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            'category-path',
            path,
            season
        ],
        queryFn: {
            "CategoryItem.useQuery": async ()=>{
                const response = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(url);
                return response.data;
            }
        }["CategoryItem.useQuery"],
        enabled: isExpanded
    });
    const items = data?.items || [];
    const isProducts = data?.products || false;
    const extractedCategoryName = path.split('/').pop()?.replace(/_/g, ' ').replace(/\b\w/g, (l)=>l.toUpperCase()) || '';
    const products = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "CategoryItem.useMemo[products]": ()=>{
            if (!isProducts) return [];
            return items.filter({
                "CategoryItem.useMemo[products]": (item)=>'id' in item
            }["CategoryItem.useMemo[products]"]).map({
                "CategoryItem.useMemo[products]": (item)=>({
                        id: item.id,
                        name: item.name,
                        pack_width_in: item.pack_width_in || 0,
                        pack_height_in: item.pack_height_in || 0,
                        expiration_stability: item.expiration_stability,
                        margin: item.margin,
                        sales_velocity: item.sales_velocity,
                        seasonality: item.seasonality,
                        overall_score: item.overall_score,
                        category: extractedCategoryName
                    })
            }["CategoryItem.useMemo[products]"]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }
    }["CategoryItem.useMemo[products]"], [
        isProducts,
        extractedCategoryName
    ]);
    // Group products by score ranges
    const groupedProducts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "CategoryItem.useMemo[groupedProducts]": ()=>{
            const groups = {
                '90-100%': [],
                '80-89%': [],
                '70-79%': [],
                '60-69%': [],
                'Below 60%': [],
                'No Score': []
            };
            products.forEach({
                "CategoryItem.useMemo[groupedProducts]": (product)=>{
                    const score = product.overall_score;
                    if (score === undefined || score === null) {
                        groups['No Score'].push(product);
                    } else {
                        const scorePercent = score * 100;
                        if (scorePercent >= 90) {
                            groups['90-100%'].push(product);
                        } else if (scorePercent >= 80) {
                            groups['80-89%'].push(product);
                        } else if (scorePercent >= 70) {
                            groups['70-79%'].push(product);
                        } else if (scorePercent >= 60) {
                            groups['60-69%'].push(product);
                        } else {
                            groups['Below 60%'].push(product);
                        }
                    }
                }
            }["CategoryItem.useMemo[groupedProducts]"]);
            // Sort each group by score (highest first)
            Object.keys(groups).forEach({
                "CategoryItem.useMemo[groupedProducts]": (key)=>{
                    groups[key].sort({
                        "CategoryItem.useMemo[groupedProducts]": (a, b)=>{
                            const scoreA = a.overall_score ?? 0;
                            const scoreB = b.overall_score ?? 0;
                            return scoreB - scoreA;
                        }
                    }["CategoryItem.useMemo[groupedProducts]"]);
                }
            }["CategoryItem.useMemo[groupedProducts]"]);
            return groups;
        }
    }["CategoryItem.useMemo[groupedProducts]"], [
        products
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-1",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                className: "flex items-center gap-2 cursor-pointer hover:bg-muted p-2 rounded",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$checkbox$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Checkbox"], {
                        checked: isExpanded,
                        onCheckedChange: ()=>setIsExpanded(!isExpanded)
                    }, void 0, false, {
                        fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/ProductSidebar.tsx",
                        lineNumber: 191,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-sm font-medium",
                        children: categoryName
                    }, void 0, false, {
                        fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/ProductSidebar.tsx",
                        lineNumber: 192,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/ProductSidebar.tsx",
                lineNumber: 190,
                columnNumber: 7
            }, this),
            isExpanded && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "ml-6 space-y-2",
                children: [
                    loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-xs text-muted-foreground pl-2",
                        children: "Loading..."
                    }, void 0, false, {
                        fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/ProductSidebar.tsx",
                        lineNumber: 196,
                        columnNumber: 23
                    }, this),
                    !loading && !isProducts && items.map((item)=>{
                        if ('key' in item && typeof item.key === 'string') {
                            const categoryItem = item;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CategoryItem, {
                                path: `${path}/${categoryItem.key}`,
                                categoryName: categoryItem.name,
                                season: season
                            }, categoryItem.key, false, {
                                fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/ProductSidebar.tsx",
                                lineNumber: 202,
                                columnNumber: 24
                            }, this);
                        }
                        return null;
                    }),
                    !loading && isProducts && products.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-4 pl-2",
                        children: Object.entries(groupedProducts).map(([scoreRange, groupProducts])=>{
                            if (groupProducts.length === 0) return null;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide",
                                        children: [
                                            scoreRange,
                                            " (",
                                            groupProducts.length,
                                            ")"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/ProductSidebar.tsx",
                                        lineNumber: 212,
                                        columnNumber: 21
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-2",
                                        children: groupProducts.map((product)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "p-3 rounded border bg-card hover:bg-muted/50 transition-colors cursor-pointer",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "font-medium text-sm mb-1",
                                                        children: product.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/ProductSidebar.tsx",
                                                        lineNumber: 218,
                                                        columnNumber: 27
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex gap-4 text-xs text-muted-foreground",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: [
                                                                    "Score: ",
                                                                    product.overall_score !== undefined ? (product.overall_score * 100).toFixed(0) : 'N/A',
                                                                    "%"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/ProductSidebar.tsx",
                                                                lineNumber: 220,
                                                                columnNumber: 29
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: [
                                                                    "Margin: ",
                                                                    product.margin !== undefined ? (product.margin * 100).toFixed(1) : 'N/A',
                                                                    "%"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/ProductSidebar.tsx",
                                                                lineNumber: 221,
                                                                columnNumber: 29
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: [
                                                                    "Width: ",
                                                                    product.pack_width_in ? `${product.pack_width_in.toFixed(1)}"` : 'N/A'
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/ProductSidebar.tsx",
                                                                lineNumber: 222,
                                                                columnNumber: 29
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/ProductSidebar.tsx",
                                                        lineNumber: 219,
                                                        columnNumber: 27
                                                    }, this)
                                                ]
                                            }, product.id, true, {
                                                fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/ProductSidebar.tsx",
                                                lineNumber: 217,
                                                columnNumber: 25
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/ProductSidebar.tsx",
                                        lineNumber: 215,
                                        columnNumber: 21
                                    }, this)
                                ]
                            }, scoreRange, true, {
                                fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/ProductSidebar.tsx",
                                lineNumber: 211,
                                columnNumber: 19
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/ProductSidebar.tsx",
                        lineNumber: 207,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/ProductSidebar.tsx",
                lineNumber: 195,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/ProductSidebar.tsx",
        lineNumber: 189,
        columnNumber: 5
    }, this);
}
_s1(CategoryItem, "QpHTUtEOBOJVB5ceLan7K0mP+xA=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
_c1 = CategoryItem;
var _c, _c1;
__turbopack_context__.k.register(_c, "ProductSidebar");
__turbopack_context__.k.register(_c1, "CategoryItem");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/AvailableProductsSidebar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AvailableProductsSidebar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/label.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/select.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-left.js [app-client] (ecmascript) <export default as ChevronLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-client] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Minus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/minus.js [app-client] (ecmascript) <export default as Minus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/features/planogram/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/planogram/store/index.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$hooks$2f$use$2d$planogram$2d$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/planogram/hooks/use-planogram-layout.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
function AvailableProductsSidebar() {
    _s();
    const availableItems = __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramStore"].use.availableItems();
    const loadingAvailableItems = __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramStore"].use.loadingAvailableItems();
    const selectedAvailableItems = __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramStore"].use.selectedAvailableItems();
    const incrementItemQuantity = __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramStore"].use.incrementItemQuantity();
    const decrementItemQuantity = __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramStore"].use.decrementItemQuantity();
    const closeAvailableProductsSidebar = __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramStore"].use.closeAvailableProductsSidebar();
    const targetRowId = __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramStore"].use.targetRowId();
    const setTargetRowId = __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramStore"].use.setTargetRowId();
    const availableProductsSidebarExpanded = __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramStore"].use.availableProductsSidebarExpanded();
    const toggleAvailableProductsSidebarExpand = __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramStore"].use.toggleAvailableProductsSidebarExpand();
    const gridData = __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramStore"].use.gridData();
    const { handleAddSelectedItems } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$hooks$2f$use$2d$planogram$2d$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramLayout"])();
    const formatScore = (score)=>{
        return (score * 100).toFixed(0);
    };
    const formatMargin = (margin)=>{
        return (margin * 100).toFixed(1);
    };
    // Get available rows from gridData
    const availableRows = gridData?.rows.map((row)=>({
            id: row.id,
            name: row.name || `Shelf ${row.id}`
        })) || [];
    // Calculate total selected count
    const totalSelected = Array.from(selectedAvailableItems.values()).reduce((sum, qty)=>sum + qty, 0);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
        className: `h-screen fixed right-0 top-0 z-50 rounded-none border-l border-t-0 border-b-0 border-r-0 flex flex-col ${availableProductsSidebarExpanded ? 'w-3xl' : 'w-[32rem]'} transition-all duration-300`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                className: "shrink-0 border-b",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardTitle"], {
                                children: "Available Products"
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/AvailableProductsSidebar.tsx",
                                lineNumber: 46,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        variant: "ghost",
                                        size: "icon",
                                        onClick: toggleAvailableProductsSidebarExpand,
                                        className: "h-8 w-8 cursor-pointer",
                                        title: availableProductsSidebarExpanded ? 'Collapse' : 'Expand',
                                        children: availableProductsSidebarExpanded ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                            className: "h-4 w-4"
                                        }, void 0, false, {
                                            fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/AvailableProductsSidebar.tsx",
                                            lineNumber: 49,
                                            columnNumber: 51
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__["ChevronLeft"], {
                                            className: "h-4 w-4"
                                        }, void 0, false, {
                                            fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/AvailableProductsSidebar.tsx",
                                            lineNumber: 49,
                                            columnNumber: 90
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/AvailableProductsSidebar.tsx",
                                        lineNumber: 48,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        variant: "ghost",
                                        size: "icon",
                                        onClick: closeAvailableProductsSidebar,
                                        className: "h-8 w-8 cursor-pointer",
                                        title: "Close",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                            className: "h-4 w-4"
                                        }, void 0, false, {
                                            fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/AvailableProductsSidebar.tsx",
                                            lineNumber: 52,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/AvailableProductsSidebar.tsx",
                                        lineNumber: 51,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/AvailableProductsSidebar.tsx",
                                lineNumber: 47,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/AvailableProductsSidebar.tsx",
                        lineNumber: 45,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-muted-foreground mt-1",
                        children: [
                            totalSelected,
                            " item",
                            totalSelected !== 1 ? 's' : '',
                            " selected"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/AvailableProductsSidebar.tsx",
                        lineNumber: 56,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/AvailableProductsSidebar.tsx",
                lineNumber: 44,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                className: "flex-1 overflow-y-auto p-0",
                children: loadingAvailableItems ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-center py-12",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"
                    }, void 0, false, {
                        fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/AvailableProductsSidebar.tsx",
                        lineNumber: 63,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/AvailableProductsSidebar.tsx",
                    lineNumber: 62,
                    columnNumber: 11
                }, this) : availableItems.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-4 text-center text-muted-foreground",
                    children: "No products available"
                }, void 0, false, {
                    fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/AvailableProductsSidebar.tsx",
                    lineNumber: 66,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "divide-y",
                    children: availableItems.map((item)=>{
                        const quantity = selectedAvailableItems.get(item.id) || 0;
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-4 hover:bg-accent transition-colors",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-start gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex-1 min-w-0",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "font-semibold text-sm mb-1",
                                                children: item.name
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/AvailableProductsSidebar.tsx",
                                                lineNumber: 75,
                                                columnNumber: 23
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-4 text-xs text-muted-foreground",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: [
                                                            "Score: ",
                                                            formatScore(item.score),
                                                            "%"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/AvailableProductsSidebar.tsx",
                                                        lineNumber: 77,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: [
                                                            "Margin: ",
                                                            formatMargin(item.margin),
                                                            "%"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/AvailableProductsSidebar.tsx",
                                                        lineNumber: 78,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: [
                                                            "Width: ",
                                                            item.pack_width_in ? `${item.pack_width_in.toFixed(1)}"` : 'N/A'
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/AvailableProductsSidebar.tsx",
                                                        lineNumber: 79,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/AvailableProductsSidebar.tsx",
                                                lineNumber: 76,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/AvailableProductsSidebar.tsx",
                                        lineNumber: 74,
                                        columnNumber: 21
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2 shrink-0",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                size: "icon",
                                                variant: "outline",
                                                className: "h-7 w-7",
                                                onClick: ()=>decrementItemQuantity(item.id),
                                                disabled: quantity === 0,
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Minus$3e$__["Minus"], {
                                                    className: "h-3 w-3"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/AvailableProductsSidebar.tsx",
                                                    lineNumber: 84,
                                                    columnNumber: 25
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/AvailableProductsSidebar.tsx",
                                                lineNumber: 83,
                                                columnNumber: 23
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "w-8 text-center text-sm font-medium",
                                                children: quantity
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/AvailableProductsSidebar.tsx",
                                                lineNumber: 86,
                                                columnNumber: 23
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                size: "icon",
                                                variant: "outline",
                                                className: "h-7 w-7",
                                                onClick: ()=>incrementItemQuantity(item.id),
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                                    className: "h-3 w-3"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/AvailableProductsSidebar.tsx",
                                                    lineNumber: 88,
                                                    columnNumber: 25
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/AvailableProductsSidebar.tsx",
                                                lineNumber: 87,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/AvailableProductsSidebar.tsx",
                                        lineNumber: 82,
                                        columnNumber: 21
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/AvailableProductsSidebar.tsx",
                                lineNumber: 73,
                                columnNumber: 19
                            }, this)
                        }, item.id, false, {
                            fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/AvailableProductsSidebar.tsx",
                            lineNumber: 72,
                            columnNumber: 17
                        }, this);
                    })
                }, void 0, false, {
                    fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/AvailableProductsSidebar.tsx",
                    lineNumber: 68,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/AvailableProductsSidebar.tsx",
                lineNumber: 60,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "shrink-0 border-t p-4 space-y-3",
                children: [
                    availableRows.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                className: "text-xs text-muted-foreground mb-1 block",
                                children: "Add to Shelf"
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/AvailableProductsSidebar.tsx",
                                lineNumber: 102,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Select"], {
                                value: targetRowId?.toString() || '',
                                onValueChange: (value)=>setTargetRowId(parseInt(value)),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                        className: "w-full",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectValue"], {
                                            placeholder: "Select shelf"
                                        }, void 0, false, {
                                            fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/AvailableProductsSidebar.tsx",
                                            lineNumber: 105,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/AvailableProductsSidebar.tsx",
                                        lineNumber: 104,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectContent"], {
                                        children: availableRows.map((row)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                value: row.id.toString(),
                                                children: row.name
                                            }, row.id, false, {
                                                fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/AvailableProductsSidebar.tsx",
                                                lineNumber: 109,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/AvailableProductsSidebar.tsx",
                                        lineNumber: 107,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/AvailableProductsSidebar.tsx",
                                lineNumber: 103,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/AvailableProductsSidebar.tsx",
                        lineNumber: 101,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        onClick: handleAddSelectedItems,
                        disabled: totalSelected === 0 || loadingAvailableItems,
                        className: "w-full cursor-pointer",
                        children: [
                            "Add Items (",
                            totalSelected,
                            ")"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/AvailableProductsSidebar.tsx",
                        lineNumber: 117,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/AvailableProductsSidebar.tsx",
                lineNumber: 98,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/AvailableProductsSidebar.tsx",
        lineNumber: 43,
        columnNumber: 5
    }, this);
}
_s(AvailableProductsSidebar, "em6z+KB8Iq60klQjOBw/XEelEUM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$hooks$2f$use$2d$planogram$2d$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramLayout"]
    ];
});
_c = AvailableProductsSidebar;
var _c;
__turbopack_context__.k.register(_c, "AvailableProductsSidebar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/PlanogramNameField.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PlanogramNameField
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$form$2d$field$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/form-field.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/features/planogram/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/planogram/store/index.ts [app-client] (ecmascript)");
'use client';
;
;
;
function PlanogramNameField() {
    const name = __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramStore"].use.name();
    const setName = __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramStore"].use.setName();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$form$2d$field$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormField"], {
        label: "Name",
        value: name,
        onChange: (e)=>setName(e.target.value),
        placeholder: "Planogram name",
        required: true,
        containerClassName: "lg:col-span-2"
    }, void 0, false, {
        fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/PlanogramNameField.tsx",
        lineNumber: 11,
        columnNumber: 5
    }, this);
}
_c = PlanogramNameField;
var _c;
__turbopack_context__.k.register(_c, "PlanogramNameField");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/PlanogramFormFields.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PlanogramFormFields
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/label.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/select.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/features/planogram/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/planogram/store/index.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$hooks$2f$use$2d$planogram$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/planogram/hooks/use-planogram-data.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$hooks$2f$use$2d$planogram$2d$form$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/planogram/hooks/use-planogram-form.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
function PlanogramFormFields() {
    _s();
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"])();
    const planogramSlug = params?.planogramSlug;
    const season = __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramStore"].use.season();
    const shelfCount = __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramStore"].use.shelfCount();
    const selectedDisplay = __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramStore"].use.selectedDisplay();
    const setSeason = __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramStore"].use.setSeason();
    const setShelfCount = __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramStore"].use.setShelfCount();
    const { planogramData, companyDisplays, standardDisplays, refetchPlanogram, fetchAvailableProducts } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$hooks$2f$use$2d$planogram$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramData"])(planogramSlug);
    const { handleDisplayChange } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$hooks$2f$use$2d$planogram$2d$form$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramForm"])(planogramSlug, planogramData ?? null, refetchPlanogram, fetchAvailableProducts);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "lg:col-span-2 space-y-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                        children: "Season"
                    }, void 0, false, {
                        fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/PlanogramFormFields.tsx",
                        lineNumber: 25,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Select"], {
                        value: season,
                        onValueChange: setSeason,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectValue"], {}, void 0, false, {
                                    fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/PlanogramFormFields.tsx",
                                    lineNumber: 28,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/PlanogramFormFields.tsx",
                                lineNumber: 27,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectContent"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                        value: "spring",
                                        children: "Spring"
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/PlanogramFormFields.tsx",
                                        lineNumber: 31,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                        value: "summer",
                                        children: "Summer"
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/PlanogramFormFields.tsx",
                                        lineNumber: 32,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                        value: "fall",
                                        children: "Fall"
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/PlanogramFormFields.tsx",
                                        lineNumber: 33,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                        value: "winter",
                                        children: "Winter"
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/PlanogramFormFields.tsx",
                                        lineNumber: 34,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/PlanogramFormFields.tsx",
                                lineNumber: 30,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/PlanogramFormFields.tsx",
                        lineNumber: 26,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/PlanogramFormFields.tsx",
                lineNumber: 24,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "lg:col-span-2 space-y-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                        children: "Shelves"
                    }, void 0, false, {
                        fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/PlanogramFormFields.tsx",
                        lineNumber: 41,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Select"], {
                        value: shelfCount.toString(),
                        onValueChange: (value)=>setShelfCount(parseInt(value, 10)),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectValue"], {}, void 0, false, {
                                    fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/PlanogramFormFields.tsx",
                                    lineNumber: 44,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/PlanogramFormFields.tsx",
                                lineNumber: 43,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectContent"], {
                                children: Array.from({
                                    length: 10
                                }, (_, i)=>i + 1).map((num)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                        value: num.toString(),
                                        children: num
                                    }, num, false, {
                                        fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/PlanogramFormFields.tsx",
                                        lineNumber: 48,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/PlanogramFormFields.tsx",
                                lineNumber: 46,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/PlanogramFormFields.tsx",
                        lineNumber: 42,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/PlanogramFormFields.tsx",
                lineNumber: 40,
                columnNumber: 7
            }, this),
            (companyDisplays.length > 0 || standardDisplays.length > 0) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "lg:col-span-5 space-y-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-12",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                children: "Display"
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/PlanogramFormFields.tsx",
                                lineNumber: 60,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/dashboard/displays/new",
                                className: "text-xs text-primary hover:underline",
                                children: "Create Custom Display"
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/PlanogramFormFields.tsx",
                                lineNumber: 61,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/PlanogramFormFields.tsx",
                        lineNumber: 59,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Select"], {
                        value: selectedDisplay,
                        onValueChange: handleDisplayChange,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                className: "w-full",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectValue"], {
                                    placeholder: "Select display"
                                }, void 0, false, {
                                    fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/PlanogramFormFields.tsx",
                                    lineNumber: 67,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/PlanogramFormFields.tsx",
                                lineNumber: 66,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectContent"], {
                                className: "min-w-[20rem]",
                                children: [
                                    ...companyDisplays,
                                    ...standardDisplays
                                ].sort((a, b)=>{
                                    // Custom displays first, then standard
                                    if (a.display_category === 'custom' && b.display_category === 'standard') return -1;
                                    if (a.display_category === 'standard' && b.display_category === 'custom') return 1;
                                    return 0;
                                }).map((display)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                        value: display.id.toString(),
                                        children: [
                                            "[",
                                            display.display_category.charAt(0).toUpperCase() + display.display_category.slice(1),
                                            "] ",
                                            display.name,
                                            " (",
                                            display.type.replace(/_/g, ' '),
                                            ") - ",
                                            display.width_in,
                                            '" × ',
                                            display.height_in,
                                            '" × ',
                                            display.depth_in,
                                            '"'
                                        ]
                                    }, display.id, true, {
                                        fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/PlanogramFormFields.tsx",
                                        lineNumber: 78,
                                        columnNumber: 19
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/PlanogramFormFields.tsx",
                                lineNumber: 69,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/PlanogramFormFields.tsx",
                        lineNumber: 65,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/PlanogramFormFields.tsx",
                lineNumber: 58,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true);
}
_s(PlanogramFormFields, "xHSMTSjTGYD8fWVfpV952hSVJto=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"],
        __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$hooks$2f$use$2d$planogram$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramData"],
        __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$hooks$2f$use$2d$planogram$2d$form$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramForm"]
    ];
});
_c = PlanogramFormFields;
var _c;
__turbopack_context__.k.register(_c, "PlanogramFormFields");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/PlanogramCategoriesSelector.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PlanogramCategoriesSelector
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/label.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/select.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/badge.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/features/planogram/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/planogram/store/index.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$hooks$2f$use$2d$planogram$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/planogram/hooks/use-planogram-data.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
function PlanogramCategoriesSelector() {
    _s();
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"])();
    const planogramSlug = params?.planogramSlug;
    const selectedCategoryIds = __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramStore"].use.selectedCategoryIds();
    const toggleCategory = __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramStore"].use.toggleCategory();
    const { planogramData, leafCategories, leafCategoriesLoading, leafCategoriesError } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$hooks$2f$use$2d$planogram$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramData"])(planogramSlug);
    const planogram = planogramData?.planogram;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                        children: "Categories"
                    }, void 0, false, {
                        fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/PlanogramCategoriesSelector.tsx",
                        lineNumber: 21,
                        columnNumber: 9
                    }, this),
                    leafCategoriesError ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-destructive",
                        children: [
                            "Error loading categories: ",
                            leafCategoriesError
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/PlanogramCategoriesSelector.tsx",
                        lineNumber: 23,
                        columnNumber: 11
                    }, this) : leafCategoriesLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-muted-foreground",
                        children: "Loading categories..."
                    }, void 0, false, {
                        fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/PlanogramCategoriesSelector.tsx",
                        lineNumber: 25,
                        columnNumber: 11
                    }, this) : leafCategories.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Select"], {
                        value: "",
                        onValueChange: (value)=>{
                            const categoryId = parseInt(value);
                            if (!selectedCategoryIds.includes(categoryId)) {
                                toggleCategory(categoryId);
                            }
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectValue"], {
                                    placeholder: "Select category"
                                }, void 0, false, {
                                    fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/PlanogramCategoriesSelector.tsx",
                                    lineNumber: 37,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/PlanogramCategoriesSelector.tsx",
                                lineNumber: 36,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectContent"], {
                                children: leafCategories.map((category)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                        value: category.id.toString(),
                                        children: category.name
                                    }, category.id, false, {
                                        fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/PlanogramCategoriesSelector.tsx",
                                        lineNumber: 41,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/PlanogramCategoriesSelector.tsx",
                                lineNumber: 39,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/PlanogramCategoriesSelector.tsx",
                        lineNumber: 27,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-muted-foreground",
                        children: "No categories available"
                    }, void 0, false, {
                        fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/PlanogramCategoriesSelector.tsx",
                        lineNumber: 48,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/PlanogramCategoriesSelector.tsx",
                lineNumber: 20,
                columnNumber: 7
            }, this),
            selectedCategoryIds.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4 pt-4 border-t",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                        className: "text-xs text-muted-foreground mb-2",
                        children: "Selected Categories"
                    }, void 0, false, {
                        fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/PlanogramCategoriesSelector.tsx",
                        lineNumber: 55,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap gap-2",
                        children: selectedCategoryIds.map((categoryId)=>{
                            const leafCategory = leafCategories.find((c)=>c.id === categoryId);
                            const planogramCategory = planogram?.categories?.find((c)=>c.id === categoryId);
                            const categoryName = leafCategory?.name || planogramCategory?.name || `Category ${categoryId}`;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                variant: "secondary",
                                className: "inline-flex items-center gap-2",
                                children: [
                                    categoryName,
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>toggleCategory(categoryId),
                                        className: "hover:text-destructive cursor-pointer",
                                        children: "×"
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/PlanogramCategoriesSelector.tsx",
                                        lineNumber: 64,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, categoryId, true, {
                                fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/PlanogramCategoriesSelector.tsx",
                                lineNumber: 62,
                                columnNumber: 17
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/PlanogramCategoriesSelector.tsx",
                        lineNumber: 56,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/PlanogramCategoriesSelector.tsx",
                lineNumber: 54,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true);
}
_s(PlanogramCategoriesSelector, "DSnaDK4igvKSNUIKrqehmijCMIc=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"],
        __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$hooks$2f$use$2d$planogram$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramData"]
    ];
});
_c = PlanogramCategoriesSelector;
var _c;
__turbopack_context__.k.register(_c, "PlanogramCategoriesSelector");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/AIOverviewDialog.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AIOverviewDialog
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/dialog.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$alert$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/alert.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/features/planogram/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/planogram/store/index.ts [app-client] (ecmascript)");
'use client';
;
;
;
;
function AIOverviewDialog() {
    const aiDialogOpen = __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramStore"].use.aiDialogOpen();
    const setAIDialogOpen = __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramStore"].use.setAIDialogOpen();
    const aiLoading = __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramStore"].use.aiLoading();
    const aiError = __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramStore"].use.aiError();
    const aiOverview = __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramStore"].use.aiOverview();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Dialog"], {
        open: aiDialogOpen,
        onOpenChange: setAIDialogOpen,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogContent"], {
            className: "max-w-2xl max-h-[80vh] overflow-y-auto",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogHeader"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogTitle"], {
                            children: "AI Overview"
                        }, void 0, false, {
                            fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/AIOverviewDialog.tsx",
                            lineNumber: 18,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogDescription"], {
                            children: "Analysis and insights for this planogram"
                        }, void 0, false, {
                            fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/AIOverviewDialog.tsx",
                            lineNumber: 19,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/AIOverviewDialog.tsx",
                    lineNumber: 17,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-4",
                    children: [
                        aiLoading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-center py-12",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/AIOverviewDialog.tsx",
                                lineNumber: 24,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/AIOverviewDialog.tsx",
                            lineNumber: 23,
                            columnNumber: 13
                        }, this),
                        aiError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$alert$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Alert"], {
                            variant: "destructive",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$alert$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AlertDescription"], {
                                children: aiError
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/AIOverviewDialog.tsx",
                                lineNumber: 29,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/AIOverviewDialog.tsx",
                            lineNumber: 28,
                            columnNumber: 13
                        }, this),
                        aiOverview && !aiLoading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "prose prose-sm max-w-none",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "whitespace-pre-wrap text-sm leading-relaxed",
                                children: aiOverview
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/AIOverviewDialog.tsx",
                                lineNumber: 34,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/AIOverviewDialog.tsx",
                            lineNumber: 33,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/AIOverviewDialog.tsx",
                    lineNumber: 21,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/AIOverviewDialog.tsx",
            lineNumber: 16,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/AIOverviewDialog.tsx",
        lineNumber: 15,
        columnNumber: 5
    }, this);
}
_c = AIOverviewDialog;
var _c;
__turbopack_context__.k.register(_c, "AIOverviewDialog");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/PlanogramActions.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PlanogramActions
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$alert$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/alert.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/features/planogram/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/planogram/store/index.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$hooks$2f$use$2d$planogram$2d$form$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/planogram/hooks/use-planogram-form.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$hooks$2f$use$2d$planogram$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/planogram/hooks/use-planogram-data.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$dashboard$2f$projects$2f5b$projectSlug$5d2f$planograms$2f5b$planogramSlug$5d2f$components$2f$AIOverviewDialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/AIOverviewDialog.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
function PlanogramActions() {
    _s();
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"])();
    const planogramSlug = params?.planogramSlug;
    const sidebarOpen = __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramStore"].use.sidebarOpen();
    const toggleSidebar = __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramStore"].use.toggleSidebar();
    const name = __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramStore"].use.name();
    const { planogramData, refetchPlanogram, fetchAvailableProducts } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$hooks$2f$use$2d$planogram$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramData"])(planogramSlug);
    const { handleRegenerate, updatePlanogramMutation } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$hooks$2f$use$2d$planogram$2d$form$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramForm"])(planogramSlug, planogramData ?? null, refetchPlanogram, fetchAvailableProducts);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4 pt-4 border-t flex gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        onClick: handleRegenerate,
                        disabled: updatePlanogramMutation.isPending || !name?.trim(),
                        className: "w-full md:w-auto cursor-pointer",
                        children: updatePlanogramMutation.isPending ? 'Updating...' : 'Regenerate'
                    }, void 0, false, {
                        fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/PlanogramActions.tsx",
                        lineNumber: 22,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        onClick: toggleSidebar,
                        variant: "outline",
                        className: "w-full md:w-auto cursor-pointer",
                        children: sidebarOpen ? 'Hide Products' : 'Explore Products'
                    }, void 0, false, {
                        fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/PlanogramActions.tsx",
                        lineNumber: 29,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/PlanogramActions.tsx",
                lineNumber: 21,
                columnNumber: 7
            }, this),
            updatePlanogramMutation.error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$alert$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Alert"], {
                variant: "destructive",
                className: "mt-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$alert$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AlertDescription"], {
                    children: updatePlanogramMutation.error.message
                }, void 0, false, {
                    fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/PlanogramActions.tsx",
                    lineNumber: 36,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/PlanogramActions.tsx",
                lineNumber: 35,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$dashboard$2f$projects$2f5b$projectSlug$5d2f$planograms$2f5b$planogramSlug$5d2f$components$2f$AIOverviewDialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/PlanogramActions.tsx",
                lineNumber: 40,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_s(PlanogramActions, "KUU/x0yA/GTLMWl07SuhuxySLyM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"],
        __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$hooks$2f$use$2d$planogram$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramData"],
        __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$hooks$2f$use$2d$planogram$2d$form$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramForm"]
    ];
});
_c = PlanogramActions;
var _c;
__turbopack_context__.k.register(_c, "PlanogramActions");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/PlanogramDeleteButton.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PlanogramDeleteButton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$alert$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/alert.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/features/planogram/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$hooks$2f$use$2d$planogram$2d$form$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/planogram/hooks/use-planogram-form.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$hooks$2f$use$2d$planogram$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/planogram/hooks/use-planogram-data.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
function PlanogramDeleteButton() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"])();
    const planogramSlug = params?.planogramSlug;
    const projectSlug = params?.projectSlug;
    const [deleteConfirm, setDeleteConfirm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const { planogramData, refetchPlanogram, fetchAvailableProducts } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$hooks$2f$use$2d$planogram$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramData"])(planogramSlug);
    const { deleteMutation } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$hooks$2f$use$2d$planogram$2d$form$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramForm"])(planogramSlug, planogramData ?? null, refetchPlanogram, fetchAvailableProducts);
    const handleDelete = async ()=>{
        if (!deleteConfirm) {
            setDeleteConfirm(true);
            return;
        }
        try {
            await deleteMutation.mutateAsync({
                slug: planogramSlug
            });
            router.push(`/dashboard/projects/${projectSlug}`);
        } catch  {
            setDeleteConfirm(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mt-8",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-3 justify-end",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        onClick: handleDelete,
                        disabled: deleteMutation.isPending,
                        variant: deleteConfirm ? 'destructive' : 'outline',
                        className: deleteConfirm ? '' : 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100 hover:text-red-800',
                        children: deleteMutation.isPending ? 'Deleting...' : deleteConfirm ? 'Confirm Delete' : 'Delete Planogram'
                    }, void 0, false, {
                        fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/PlanogramDeleteButton.tsx",
                        lineNumber: 36,
                        columnNumber: 9
                    }, this),
                    deleteConfirm && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        onClick: ()=>setDeleteConfirm(false),
                        variant: "outline",
                        disabled: deleteMutation.isPending,
                        children: "Cancel"
                    }, void 0, false, {
                        fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/PlanogramDeleteButton.tsx",
                        lineNumber: 40,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/PlanogramDeleteButton.tsx",
                lineNumber: 35,
                columnNumber: 7
            }, this),
            deleteMutation.error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$alert$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Alert"], {
                variant: "destructive",
                className: "mt-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$alert$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AlertDescription"], {
                    children: deleteMutation.error.message
                }, void 0, false, {
                    fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/PlanogramDeleteButton.tsx",
                    lineNumber: 47,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/PlanogramDeleteButton.tsx",
                lineNumber: 46,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/PlanogramDeleteButton.tsx",
        lineNumber: 34,
        columnNumber: 5
    }, this);
}
_s(PlanogramDeleteButton, "y+DIItFFDWPMz7OYW1XNSrqOaH0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"],
        __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$hooks$2f$use$2d$planogram$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramData"],
        __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$hooks$2f$use$2d$planogram$2d$form$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramForm"]
    ];
});
_c = PlanogramDeleteButton;
var _c;
__turbopack_context__.k.register(_c, "PlanogramDeleteButton");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/features/planogram/queries/index.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useAIOverviewMutation",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$queries$2f$use$2d$ai$2d$overview$2d$mutation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAIOverviewMutation"],
    "useAvailableProductsQuery",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$queries$2f$use$2d$available$2d$products$2d$query$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAvailableProductsQuery"],
    "useCreatePlanogramMutation",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$queries$2f$use$2d$create$2d$planogram$2d$mutation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCreatePlanogramMutation"],
    "useDeletePlanogramMutation",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$queries$2f$use$2d$delete$2d$planogram$2d$mutation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDeletePlanogramMutation"],
    "usePlanogramQuery",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$queries$2f$use$2d$planogram$2d$query$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramQuery"],
    "usePlanogramsQuery",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$queries$2f$use$2d$planograms$2d$query$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramsQuery"],
    "useUpdatePlanogramMutation",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$queries$2f$use$2d$update$2d$planogram$2d$mutation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUpdatePlanogramMutation"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$queries$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/features/planogram/queries/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$queries$2f$use$2d$planogram$2d$query$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/planogram/queries/use-planogram-query.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$queries$2f$use$2d$planograms$2d$query$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/planogram/queries/use-planograms-query.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$queries$2f$use$2d$create$2d$planogram$2d$mutation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/planogram/queries/use-create-planogram-mutation.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$queries$2f$use$2d$update$2d$planogram$2d$mutation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/planogram/queries/use-update-planogram-mutation.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$queries$2f$use$2d$delete$2d$planogram$2d$mutation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/planogram/queries/use-delete-planogram-mutation.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$queries$2f$use$2d$ai$2d$overview$2d$mutation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/planogram/queries/use-ai-overview-mutation.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$queries$2f$use$2d$available$2d$products$2d$query$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/planogram/queries/use-available-products-query.ts [app-client] (ecmascript)");
}),
"[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/PlanogramDownloadButton.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PlanogramDownloadButton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/features/planogram/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/planogram/store/index.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-hot-toast/dist/index.mjs [app-client] (ecmascript)");
'use client';
;
;
;
;
function PlanogramDownloadButton({ planogram }) {
    const downloadLoading = __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramStore"].use.downloadLoading();
    const downloadPlanogram = __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramStore"].use.downloadPlanogram();
    const gridData = __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramStore"].use.gridData();
    const handleDownload = async ()=>{
        if (!planogram) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].error('No planogram data available');
            return;
        }
        await downloadPlanogram(planogram, gridData);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
        onClick: handleDownload,
        size: "sm",
        variant: "outline",
        className: "border-primary text-primary hover:bg-primary hover:text-primary-foreground",
        disabled: downloadLoading,
        children: downloadLoading ? 'Preparing...' : 'Download'
    }, void 0, false, {
        fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/PlanogramDownloadButton.tsx",
        lineNumber: 27,
        columnNumber: 5
    }, this);
}
_c = PlanogramDownloadButton;
var _c;
__turbopack_context__.k.register(_c, "PlanogramDownloadButton");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/PlanogramHeader.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PlanogramHeader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/features/planogram/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/planogram/store/index.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$queries$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/planogram/queries/index.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$dashboard$2f$projects$2f5b$projectSlug$5d2f$planograms$2f5b$planogramSlug$5d2f$components$2f$PlanogramDownloadButton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/PlanogramDownloadButton.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
function PlanogramHeader({ planogram }) {
    _s();
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"])();
    const planogramSlug = params?.planogramSlug;
    const setAIDialogOpen = __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramStore"].use.setAIDialogOpen();
    const aiLoading = __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramStore"].use.aiLoading();
    const aiMutation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$queries$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAIOverviewMutation"])();
    const handleAIOverview = async ()=>{
        setAIDialogOpen(true);
        await aiMutation.mutateAsync({
            slug: planogramSlug
        });
    };
    if (!planogram) {
        return null;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mb-6 flex items-center gap-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "text-3xl font-bold",
                children: planogram.name
            }, void 0, false, {
                fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/PlanogramHeader.tsx",
                lineNumber: 33,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                onClick: handleAIOverview,
                disabled: aiLoading,
                size: "sm",
                children: aiLoading ? 'Generating...' : 'AI Overview'
            }, void 0, false, {
                fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/PlanogramHeader.tsx",
                lineNumber: 34,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$dashboard$2f$projects$2f5b$projectSlug$5d2f$planograms$2f5b$planogramSlug$5d2f$components$2f$PlanogramDownloadButton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                planogram: planogram
            }, void 0, false, {
                fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/PlanogramHeader.tsx",
                lineNumber: 37,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                asChild: true,
                variant: "outline",
                size: "sm",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    href: `/dashboard/projects/${params?.projectSlug}/planograms/${planogramSlug}/info`,
                    children: "Info"
                }, void 0, false, {
                    fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/PlanogramHeader.tsx",
                    lineNumber: 39,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/PlanogramHeader.tsx",
                lineNumber: 38,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/PlanogramHeader.tsx",
        lineNumber: 32,
        columnNumber: 5
    }, this);
}
_s(PlanogramHeader, "F4X+XIvTSdXHYP/aFKJeT4jqaXc=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"],
        __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$queries$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAIOverviewMutation"]
    ];
});
_c = PlanogramHeader;
var _c;
__turbopack_context__.k.register(_c, "PlanogramHeader");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PlanogramDetailPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/features/planogram/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/planogram/store/index.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$hooks$2f$use$2d$planogram$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/planogram/hooks/use-planogram-data.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$dashboard$2f$projects$2f5b$projectSlug$5d2f$planograms$2f5b$planogramSlug$5d2f$components$2f$Grid$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/Grid.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$dashboard$2f$projects$2f5b$projectSlug$5d2f$planograms$2f5b$planogramSlug$5d2f$components$2f$ThreeJSView$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/ThreeJSView.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$dashboard$2f$projects$2f5b$projectSlug$5d2f$planograms$2f5b$planogramSlug$5d2f$components$2f$ProductSidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/ProductSidebar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$dashboard$2f$projects$2f5b$projectSlug$5d2f$planograms$2f5b$planogramSlug$5d2f$components$2f$AvailableProductsSidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/AvailableProductsSidebar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$dashboard$2f$projects$2f5b$projectSlug$5d2f$planograms$2f5b$planogramSlug$5d2f$components$2f$PlanogramNameField$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/PlanogramNameField.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$dashboard$2f$projects$2f5b$projectSlug$5d2f$planograms$2f5b$planogramSlug$5d2f$components$2f$PlanogramFormFields$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/PlanogramFormFields.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$dashboard$2f$projects$2f5b$projectSlug$5d2f$planograms$2f5b$planogramSlug$5d2f$components$2f$PlanogramCategoriesSelector$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/PlanogramCategoriesSelector.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$dashboard$2f$projects$2f5b$projectSlug$5d2f$planograms$2f5b$planogramSlug$5d2f$components$2f$PlanogramActions$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/PlanogramActions.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$dashboard$2f$projects$2f5b$projectSlug$5d2f$planograms$2f5b$planogramSlug$5d2f$components$2f$PlanogramDeleteButton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/PlanogramDeleteButton.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$dashboard$2f$projects$2f5b$projectSlug$5d2f$planograms$2f5b$planogramSlug$5d2f$components$2f$PlanogramHeader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/PlanogramHeader.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/card.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
;
;
;
;
;
function PlanogramDetailContent() {
    _s();
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"])();
    const planogramSlug = params?.planogramSlug;
    // Get state from consolidated store
    const gridData = __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramStore"].use.gridData();
    const rowLayouts = __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramStore"].use.rowLayouts();
    const sidebarOpen = __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramStore"].use.sidebarOpen();
    const availableProductsSidebarOpen = __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramStore"].use.availableProductsSidebarOpen();
    // Use custom hooks
    const { planogramData, planogramLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$hooks$2f$use$2d$planogram$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramData"])(planogramSlug);
    // Loading state
    if (planogramLoading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex justify-center items-center py-12",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"
            }, void 0, false, {
                fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/page.tsx",
                lineNumber: 34,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/page.tsx",
            lineNumber: 33,
            columnNumber: 7
        }, this);
    }
    // Error state
    if (!planogramData) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-card rounded-lg border border-border p-6",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-muted-foreground",
                children: "Planogram not found"
            }, void 0, false, {
                fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/page.tsx",
                lineNumber: 43,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/page.tsx",
            lineNumber: 42,
            columnNumber: 7
        }, this);
    }
    const planogram = planogramData.planogram;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative",
        children: [
            sidebarOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$dashboard$2f$projects$2f5b$projectSlug$5d2f$planograms$2f5b$planogramSlug$5d2f$components$2f$ProductSidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/page.tsx",
                lineNumber: 53,
                columnNumber: 23
            }, this),
            availableProductsSidebarOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$dashboard$2f$projects$2f5b$projectSlug$5d2f$planograms$2f5b$planogramSlug$5d2f$components$2f$AvailableProductsSidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/page.tsx",
                lineNumber: 56,
                columnNumber: 40
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "transition-all duration-300",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-7xl mx-auto px-6 md:px-0 py-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$dashboard$2f$projects$2f5b$projectSlug$5d2f$planograms$2f5b$planogramSlug$5d2f$components$2f$PlanogramHeader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            planogram: planogram
                        }, void 0, false, {
                            fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/page.tsx",
                            lineNumber: 61,
                            columnNumber: 11
                        }, this),
                        planogram && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                            className: "mb-8",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                                className: "p-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$dashboard$2f$projects$2f5b$projectSlug$5d2f$planograms$2f5b$planogramSlug$5d2f$components$2f$PlanogramNameField$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                                        fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/page.tsx",
                                                        lineNumber: 69,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$dashboard$2f$projects$2f5b$projectSlug$5d2f$planograms$2f5b$planogramSlug$5d2f$components$2f$PlanogramFormFields$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                                        fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/page.tsx",
                                                        lineNumber: 70,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/page.tsx",
                                                lineNumber: 68,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$dashboard$2f$projects$2f5b$projectSlug$5d2f$planograms$2f5b$planogramSlug$5d2f$components$2f$PlanogramCategoriesSelector$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                                fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/page.tsx",
                                                lineNumber: 72,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/page.tsx",
                                        lineNumber: 67,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$dashboard$2f$projects$2f5b$projectSlug$5d2f$planograms$2f5b$planogramSlug$5d2f$components$2f$PlanogramActions$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                        fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/page.tsx",
                                        lineNumber: 74,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/page.tsx",
                                lineNumber: 66,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/page.tsx",
                            lineNumber: 65,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-6",
                            children: gridData ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$dashboard$2f$projects$2f5b$projectSlug$5d2f$planograms$2f5b$planogramSlug$5d2f$components$2f$Grid$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                        fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/page.tsx",
                                        lineNumber: 82,
                                        columnNumber: 17
                                    }, this),
                                    Object.keys(rowLayouts).length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$dashboard$2f$projects$2f5b$projectSlug$5d2f$planograms$2f5b$planogramSlug$5d2f$components$2f$ThreeJSView$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        gridData: gridData,
                                        rowLayouts: rowLayouts
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/page.tsx",
                                        lineNumber: 83,
                                        columnNumber: 56
                                    }, this)
                                ]
                            }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                                    className: "p-6",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-muted-foreground",
                                        children: "No layout data available for this planogram."
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/page.tsx",
                                        lineNumber: 88,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/page.tsx",
                                    lineNumber: 87,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/page.tsx",
                                lineNumber: 86,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/page.tsx",
                            lineNumber: 79,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$dashboard$2f$projects$2f5b$projectSlug$5d2f$planograms$2f5b$planogramSlug$5d2f$components$2f$PlanogramDeleteButton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                            fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/page.tsx",
                            lineNumber: 94,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/page.tsx",
                    lineNumber: 60,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/page.tsx",
                lineNumber: 59,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/page.tsx",
        lineNumber: 51,
        columnNumber: 5
    }, this);
}
_s(PlanogramDetailContent, "h+3IxeIFpmM35EQn9q9n4J+T9hs=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"],
        __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$hooks$2f$use$2d$planogram$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramData"]
    ];
});
_c = PlanogramDetailContent;
function PlanogramDetailPage() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PlanogramDetailContent, {}, void 0, false, {
        fileName: "[project]/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/page.tsx",
        lineNumber: 102,
        columnNumber: 10
    }, this);
}
_c1 = PlanogramDetailPage;
var _c, _c1;
__turbopack_context__.k.register(_c, "PlanogramDetailContent");
__turbopack_context__.k.register(_c1, "PlanogramDetailPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_465647a2._.js.map