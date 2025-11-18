# Generated migration

from django.db import migrations, models


def populate_dimensions_from_display(apps, schema_editor):
    """Populate dimensions from display for existing planograms"""
    Planogram = apps.get_model('planograms', 'Planogram')
    for planogram in Planogram.objects.all():
        if planogram.display:
            planogram.width_in = planogram.display.width_in
            planogram.height_in = planogram.display.height_in
            planogram.depth_in = planogram.display.depth_in
            planogram.shelf_count = planogram.display.shelf_count
            planogram.shelf_spacing = planogram.display.shelf_spacing
            planogram.save()


class Migration(migrations.Migration):

    dependencies = [
        ('planograms', '0003_remove_planogram_categories_planogram_category_ids'),
    ]

    operations = [
        # Add dimension fields first
        migrations.AddField(
            model_name='planogram',
            name='width_in',
            field=models.DecimalField(decimal_places=2, help_text='Display width in inches', max_digits=10, null=True),
        ),
        migrations.AddField(
            model_name='planogram',
            name='height_in',
            field=models.DecimalField(decimal_places=2, help_text='Display height in inches', max_digits=10, null=True),
        ),
        migrations.AddField(
            model_name='planogram',
            name='depth_in',
            field=models.DecimalField(blank=True, decimal_places=2, help_text='Display depth in inches', max_digits=10, null=True),
        ),
        migrations.AddField(
            model_name='planogram',
            name='shelf_count',
            field=models.IntegerField(help_text='Number of shelves', null=True),
        ),
        migrations.AddField(
            model_name='planogram',
            name='shelf_spacing',
            field=models.DecimalField(blank=True, decimal_places=2, help_text='Shelf spacing in inches', max_digits=10, null=True),
        ),
        # Populate dimensions from existing displays
        migrations.RunPython(populate_dimensions_from_display, migrations.RunPython.noop),
        # Make fields required (non-nullable)
        migrations.AlterField(
            model_name='planogram',
            name='width_in',
            field=models.DecimalField(decimal_places=2, help_text='Display width in inches', max_digits=10),
        ),
        migrations.AlterField(
            model_name='planogram',
            name='height_in',
            field=models.DecimalField(decimal_places=2, help_text='Display height in inches', max_digits=10),
        ),
        migrations.AlterField(
            model_name='planogram',
            name='shelf_count',
            field=models.IntegerField(help_text='Number of shelves'),
        ),
        # Make display field nullable
        migrations.AlterField(
            model_name='planogram',
            name='display',
            field=models.ForeignKey(blank=True, help_text='Optional reference to display used for dimensions', null=True, on_delete=models.SET_NULL, related_name='planograms', to='displays.display'),
        ),
    ]

