# Generated migration

from django.db import migrations, models
import django.db.models.deletion
from decimal import Decimal


def migrate_standards_to_new_model(apps, schema_editor):
    """Move standard displays to StandardDisplay model and delete from Display"""
    Display = apps.get_model('displays', 'Display')
    StandardDisplay = apps.get_model('displays', 'StandardDisplay')
    
    # Get all standard displays (those with null company)
    standard_displays = Display.objects.filter(company__isnull=True)
    
    # Create StandardDisplay records
    for display in standard_displays:
        StandardDisplay.objects.get_or_create(
            name=display.name,
            defaults={
                'type': display.type,
                'width_in': display.width_in,
                'height_in': display.height_in,
                'depth_in': display.depth_in,
                'shelf_count': display.shelf_count,
                'shelf_spacing': display.shelf_spacing,
            }
        )
    
    # Delete standard displays from Display model
    standard_displays.delete()


def seed_standard_displays(apps, schema_editor):
    """Seed standard display templates (2 per type)"""
    StandardDisplay = apps.get_model('displays', 'StandardDisplay')
    
    # Standard display definitions (2 per type)
    standards = [
        # Gondola
        {'name': 'Standard 4-Foot Gondola', 'type': 'gondola', 'width_in': Decimal('48'), 'height_in': Decimal('72'), 'depth_in': Decimal('24'), 'shelf_count': 5, 'shelf_spacing': Decimal('12')},
        {'name': 'Standard 6-Foot Gondola', 'type': 'gondola', 'width_in': Decimal('72'), 'height_in': Decimal('72'), 'depth_in': Decimal('24'), 'shelf_count': 5, 'shelf_spacing': Decimal('12')},
        
        # Endcap
        {'name': 'Standard 4-Foot Endcap', 'type': 'endcap', 'width_in': Decimal('48'), 'height_in': Decimal('72'), 'depth_in': Decimal('24'), 'shelf_count': 4, 'shelf_spacing': Decimal('14')},
        {'name': 'Standard 6-Foot Endcap', 'type': 'endcap', 'width_in': Decimal('72'), 'height_in': Decimal('72'), 'depth_in': Decimal('24'), 'shelf_count': 4, 'shelf_spacing': Decimal('14')},
        
        # Wall Unit
        {'name': 'Standard 4-Foot Wall Unit', 'type': 'wall_unit', 'width_in': Decimal('48'), 'height_in': Decimal('84'), 'depth_in': Decimal('18'), 'shelf_count': 6, 'shelf_spacing': Decimal('12')},
        {'name': 'Standard 6-Foot Wall Unit', 'type': 'wall_unit', 'width_in': Decimal('72'), 'height_in': Decimal('84'), 'depth_in': Decimal('18'), 'shelf_count': 6, 'shelf_spacing': Decimal('12')},
        
        # Refrigerated Case
        {'name': 'Standard 4-Foot Refrigerated Case', 'type': 'refrigerated_case', 'width_in': Decimal('48'), 'height_in': Decimal('72'), 'depth_in': Decimal('30'), 'shelf_count': 4, 'shelf_spacing': Decimal('16')},
        {'name': 'Standard 6-Foot Refrigerated Case', 'type': 'refrigerated_case', 'width_in': Decimal('72'), 'height_in': Decimal('72'), 'depth_in': Decimal('30'), 'shelf_count': 4, 'shelf_spacing': Decimal('16')},
        
        # Freezer Case
        {'name': 'Standard 4-Foot Freezer Case', 'type': 'freezer_case', 'width_in': Decimal('48'), 'height_in': Decimal('72'), 'depth_in': Decimal('30'), 'shelf_count': 4, 'shelf_spacing': Decimal('16')},
        {'name': 'Standard 6-Foot Freezer Case', 'type': 'freezer_case', 'width_in': Decimal('72'), 'height_in': Decimal('72'), 'depth_in': Decimal('30'), 'shelf_count': 4, 'shelf_spacing': Decimal('16')},
        
        # Island Display
        {'name': 'Standard 4-Foot Island Display', 'type': 'island_display', 'width_in': Decimal('48'), 'height_in': Decimal('60'), 'depth_in': Decimal('48'), 'shelf_count': 3, 'shelf_spacing': Decimal('18')},
        {'name': 'Standard 6-Foot Island Display', 'type': 'island_display', 'width_in': Decimal('72'), 'height_in': Decimal('60'), 'depth_in': Decimal('48'), 'shelf_count': 3, 'shelf_spacing': Decimal('18')},
        
        # Checkout Counter
        {'name': 'Standard 4-Foot Checkout Counter', 'type': 'checkout_counter', 'width_in': Decimal('48'), 'height_in': Decimal('36'), 'depth_in': Decimal('24'), 'shelf_count': 2, 'shelf_spacing': Decimal('12')},
        {'name': 'Standard 6-Foot Checkout Counter', 'type': 'checkout_counter', 'width_in': Decimal('72'), 'height_in': Decimal('36'), 'depth_in': Decimal('24'), 'shelf_count': 2, 'shelf_spacing': Decimal('12')},
        
        # Shelf
        {'name': 'Standard 4-Foot Shelf', 'type': 'shelf', 'width_in': Decimal('48'), 'height_in': Decimal('12'), 'depth_in': Decimal('18'), 'shelf_count': 1, 'shelf_spacing': None},
        {'name': 'Standard 6-Foot Shelf', 'type': 'shelf', 'width_in': Decimal('72'), 'height_in': Decimal('12'), 'depth_in': Decimal('18'), 'shelf_count': 1, 'shelf_spacing': None},
        
        # Rack
        {'name': 'Standard 4-Foot Rack', 'type': 'rack', 'width_in': Decimal('48'), 'height_in': Decimal('72'), 'depth_in': Decimal('18'), 'shelf_count': 5, 'shelf_spacing': Decimal('12')},
        {'name': 'Standard 6-Foot Rack', 'type': 'rack', 'width_in': Decimal('72'), 'height_in': Decimal('72'), 'depth_in': Decimal('18'), 'shelf_count': 5, 'shelf_spacing': Decimal('12')},
        
        # Bin
        {'name': 'Standard Small Bin', 'type': 'bin', 'width_in': Decimal('24'), 'height_in': Decimal('24'), 'depth_in': Decimal('18'), 'shelf_count': 1, 'shelf_spacing': None},
        {'name': 'Standard Large Bin', 'type': 'bin', 'width_in': Decimal('36'), 'height_in': Decimal('36'), 'depth_in': Decimal('24'), 'shelf_count': 1, 'shelf_spacing': None},
        
        # Other
        {'name': 'Standard 4-Foot Display', 'type': 'other', 'width_in': Decimal('48'), 'height_in': Decimal('72'), 'depth_in': Decimal('24'), 'shelf_count': 4, 'shelf_spacing': Decimal('14')},
        {'name': 'Standard 6-Foot Display', 'type': 'other', 'width_in': Decimal('72'), 'height_in': Decimal('72'), 'depth_in': Decimal('24'), 'shelf_count': 4, 'shelf_spacing': Decimal('14')},
    ]
    
    for standard in standards:
        StandardDisplay.objects.get_or_create(
            name=standard['name'],
            defaults={
                'type': standard['type'],
                'width_in': standard['width_in'],
                'height_in': standard['height_in'],
                'depth_in': standard['depth_in'],
                'shelf_count': standard['shelf_count'],
                'shelf_spacing': standard['shelf_spacing'],
            }
        )


def reverse_migration(apps, schema_editor):
    """Reverse migration - not implemented"""
    pass


class Migration(migrations.Migration):

    dependencies = [
        ('displays', '0002_display_is_standard_alter_display_company'),
        ('accounts', '0001_initial'),
    ]

    operations = [
        # Create StandardDisplay model
        migrations.CreateModel(
            name='StandardDisplay',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('type', models.CharField(choices=[('gondola', 'Gondola'), ('endcap', 'Endcap'), ('wall_unit', 'Wall Unit'), ('refrigerated_case', 'Refrigerated Case'), ('freezer_case', 'Freezer Case'), ('island_display', 'Island Display'), ('checkout_counter', 'Checkout Counter'), ('shelf', 'Shelf'), ('rack', 'Rack'), ('bin', 'Bin'), ('other', 'Other')], max_length=50)),
                ('width_in', models.DecimalField(decimal_places=2, max_digits=10)),
                ('height_in', models.DecimalField(decimal_places=2, max_digits=10)),
                ('depth_in', models.DecimalField(decimal_places=2, max_digits=10)),
                ('shelf_count', models.IntegerField()),
                ('shelf_spacing', models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
            options={
                'ordering': ['type', 'name'],
            },
        ),
        # Migrate existing standards and seed new ones
        migrations.RunPython(migrate_standards_to_new_model, reverse_migration),
        migrations.RunPython(seed_standard_displays, reverse_migration),
        # Remove is_standard field from Display
        migrations.RemoveField(
            model_name='display',
            name='is_standard',
        ),
        # Make company required on Display (will fail if there are any null companies left)
        migrations.AlterField(
            model_name='display',
            name='company',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='displays', to='accounts.company'),
        ),
    ]
