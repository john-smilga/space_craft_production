"""AI service for planogram analysis."""

import logging
from typing import Any

from django.conf import settings
from openai import OpenAI

logger = logging.getLogger(__name__)


def generate_ai_overview(planogram_data: dict[str, Any], layout: dict[str, Any]) -> str:
    """Generate AI overview for planogram.

    Args:
        planogram_data: Dictionary containing planogram information
        layout: Dictionary containing layout information

    Returns:
        AI-generated overview text

    Raises:
        ValueError: If OpenAI API key is not configured
        Exception: If OpenAI API call fails
    """
    if not settings.OPENAI_API_KEY:
        raise ValueError("OpenAI API key is not configured")

    prompt = _format_planogram_data_for_ai(planogram_data, layout)

    client = OpenAI(api_key=settings.OPENAI_API_KEY)
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {
                "role": "system",
                "content": "You are a retail planogram analyst expert. Analyze planogram layouts and provide insights on why they work for specific seasons, how they help sales, and their strengths. Be concise but informative.",
            },
            {"role": "user", "content": prompt},
        ],
        temperature=0.7,
        max_tokens=300,
    )

    return response.choices[0].message.content


def _format_planogram_data_for_ai(
    planogram_data: dict[str, Any], layout: dict[str, Any]
) -> str:
    """Format planogram data into a readable prompt for AI."""
    lines: list[str] = []

    lines.append("=== PLANOGRAM ANALYSIS REQUEST ===\n")
    lines.append(f"Planogram Name: {planogram_data['name']}")
    lines.append(
        f"Season: {planogram_data.get('season_display', planogram_data.get('season', 'Unknown'))}"
    )
    lines.append("\nDimensions:")

    lines.append(f"  - Width: {planogram_data.get('width_in', 'N/A')} inches")
    lines.append(f"  - Height: {planogram_data.get('height_in', 'N/A')} inches")
    lines.append(f"  - Depth: {planogram_data.get('depth_in', 'N/A')} inches")
    lines.append(f"  - Shelf Count: {planogram_data.get('shelf_count', 'N/A')}")

    if planogram_data.get("categories"):
        lines.append("\nSelected Categories:")
        for cat in planogram_data["categories"]:
            lines.append(
                f"  - {cat.get('name', 'Unknown')} (ID: {cat.get('id', 'N/A')})"
            )

    if layout and layout.get("grid"):
        grid = layout["grid"]
        lines.append("\nGrid Configuration:")
        lines.append(f"  - Columns: {grid.get('cols', 'N/A')}")
        lines.append(f"  - Rows: {grid.get('rows', 'N/A')}")
        lines.append(f"  - Cell Width: {grid.get('cellWidthIn', 'N/A')} inches")

    if layout and layout.get("rows"):
        lines.append("\nProduct Layout by Shelf:")
        for row in layout["rows"]:
            lines.append(
                f"\n  Shelf {row.get('id', 'N/A')} ({row.get('name', 'Unknown')}):"
            )
            if row.get("category"):
                lines.append(f"    Category: {row['category']}")

            items = row.get("items", [])
            if items:
                lines.append(f"    Products ({len(items)} items):")
                for item in items[:10]:
                    meta = item.get("meta", {})
                    name = meta.get("name", "Unknown")
                    score = meta.get("score", 0)
                    category = meta.get("category", "Unknown")
                    width = meta.get("pack_width_in", 0)
                    lines.append(
                        f'      - {name} (Category: {category}, Score: {score:.2f}, Width: {width}")'
                    )
                if len(items) > 10:
                    lines.append(f"      ... and {len(items) - 10} more products")
            else:
                lines.append("    No products placed")

    lines.append("\n=== ANALYSIS REQUEST ===")
    lines.append("Please provide a brief analysis:")
    lines.append("1. Why this layout works well for the selected season")
    lines.append("2. How this layout helps drive sales")
    lines.append("3. Key strengths of this planogram")
    lines.append("\nKeep the response very concise (2-3 short paragraphs maximum).")

    return "\n".join(lines)
