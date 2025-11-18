# Generated manually on 2025-11-16

from decimal import Decimal
from django.db import migrations
from django.db.models import Q


def refactor_standard_shelves(apps, schema_editor):
    """Refactor standard shelves: reduce to 6 options with varying widths (5-8ft) and heights (4-6 shelves)"""
    Display = apps.get_model('displays', 'Display')
    
    # Delete standard shelves that should be removed:
    # 1. shelf_count=1 OR width < 5 feet (60 inches)
    # 2. Old naming pattern: names containing "Shelf (" (the old generic names)
    # Keep all other standard displays (including shelves that don't meet these criteria)
    Display.objects.filter(
        display_category='standard',
        type='shelf'
    ).filter(
        Q(shelf_count=1) | Q(width_in__lt=60) | Q(name__contains='Shelf (')
    ).delete()
    
    # Create 6 new standard shelves with varying widths and heights
    # Widths: 5, 6, 7, 8 feet (60, 72, 84, 96 inches)
    # Heights: 5-7 feet (60-84 inches) for 4-6 shelves
    # Shelf counts: 4, 5, or 6 (not defaulting to 1)
    new_shelves = [
        # 5ft width options
        {'name': '5-Foot Wall Mounted Display Shelf', 'width_in': Decimal('60'), 'height_in': Decimal('60'), 'depth_in': Decimal('18'), 'shelf_count': 4, 'shelf_spacing': Decimal('12')},
        {'name': '5-Foot Freestanding Storage Shelf', 'width_in': Decimal('60'), 'height_in': Decimal('72'), 'depth_in': Decimal('18'), 'shelf_count': 5, 'shelf_spacing': Decimal('12')},
        
        # 6ft width options
        {'name': '6-Foot Gondola Back Shelf Unit', 'width_in': Decimal('72'), 'height_in': Decimal('60'), 'depth_in': Decimal('18'), 'shelf_count': 4, 'shelf_spacing': Decimal('12')},
        {'name': '6-Foot Merchandising Display Shelf', 'width_in': Decimal('72'), 'height_in': Decimal('84'), 'depth_in': Decimal('18'), 'shelf_count': 6, 'shelf_spacing': Decimal('12')},
        
        # 7ft width option
        {'name': '7-Foot Endcap Display Shelf', 'width_in': Decimal('84'), 'height_in': Decimal('72'), 'depth_in': Decimal('18'), 'shelf_count': 5, 'shelf_spacing': Decimal('12')},
        
        # 8ft width option
        {'name': '8-Foot Wall Unit Display Shelf', 'width_in': Decimal('96'), 'height_in': Decimal('84'), 'depth_in': Decimal('18'), 'shelf_count': 6, 'shelf_spacing': Decimal('12')},
    ]
    
    for shelf in new_shelves:
        Display.objects.get_or_create(
            name=shelf['name'],
            type='shelf',
            display_category='standard',
            company=None,
            defaults={
                'width_in': shelf['width_in'],
                'height_in': shelf['height_in'],
                'depth_in': shelf['depth_in'],
                'shelf_count': shelf['shelf_count'],
                'shelf_spacing': shelf['shelf_spacing'],
            }
        )


def reverse_migration(apps, schema_editor):
    """Reverse migration - restore original standard shelves (not implemented)"""
    pass


class Migration(migrations.Migration):

    dependencies = [
        ('displays', '0006_add_display_category'),
    ]

    operations = [
        migrations.RunPython(refactor_standard_shelves, reverse_migration),
    ]

