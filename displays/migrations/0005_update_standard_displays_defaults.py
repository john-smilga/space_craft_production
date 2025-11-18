# Generated manually on 2025-11-15

from decimal import Decimal
from django.db import migrations


def update_standard_displays(apps, schema_editor):
    """Update all standard displays to have shelf_count=1 and depth_in=24"""
    Display = apps.get_model('displays', 'Display')
    
    # Update all standard displays (company=null, not archived)
    standard_displays = Display.objects.filter(company__isnull=True, is_archived=False)
    standard_displays.update(
        shelf_count=1,
        depth_in=Decimal('24.00')
    )


def reverse_migration(apps, schema_editor):
    """Reverse migration - not implemented (would need to restore original values)"""
    pass


class Migration(migrations.Migration):

    dependencies = [
        ('displays', '0004_unify_displays'),
    ]

    operations = [
        migrations.RunPython(update_standard_displays, reverse_migration),
    ]

