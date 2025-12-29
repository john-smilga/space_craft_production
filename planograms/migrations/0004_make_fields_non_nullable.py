# Generated manually to handle non-nullable fields

from django.db import migrations, models
import django.db.models.deletion


def populate_null_fields(apps, schema_editor):
    """Populate null values before making fields non-nullable."""
    Planogram = apps.get_model('planograms', 'Planogram')
    User = apps.get_model('accounts', 'User')
    Display = apps.get_model('displays', 'Display')

    # Get first user as fallback
    first_user = User.objects.first()
    if not first_user:
        # If no users exist, we can't proceed - this shouldn't happen in practice
        return

    # Get first display as fallback
    first_display = Display.objects.filter(display_category='standard').first()
    if not first_display:
        first_display = Display.objects.first()

    for planogram in Planogram.objects.all():
        updated = False

        if planogram.created_by is None:
            planogram.created_by = first_user
            updated = True

        if planogram.updated_by is None:
            planogram.updated_by = planogram.created_by if planogram.created_by else first_user
            updated = True

        if planogram.display is None and first_display:
            planogram.display = first_display
            updated = True

        if updated:
            planogram.save()


def reverse_migration(apps, schema_editor):
    """Reverse migration is a no-op."""
    pass


class Migration(migrations.Migration):

    dependencies = [
        ('displays', '0005_remove_standarddisplay_table'),
        ('accounts', '0002_alter_user_options_and_more'),
        ('planograms', '0003_remove_planogram_preserve_layout_and_more'),
    ]

    operations = [
        # Step 1: Populate null values
        migrations.RunPython(populate_null_fields, reverse_migration),

        # Step 2: Alter fields to non-nullable with PROTECT
        migrations.AlterField(
            model_name='planogram',
            name='created_by',
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.PROTECT,
                related_name='created_planograms',
                to='accounts.user',
            ),
        ),
        migrations.AlterField(
            model_name='planogram',
            name='display',
            field=models.ForeignKey(
                help_text='Reference to display used for dimensions (auto-selected on creation)',
                on_delete=django.db.models.deletion.PROTECT,
                related_name='planograms',
                to='displays.display',
            ),
        ),
        migrations.AlterField(
            model_name='planogram',
            name='updated_by',
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.PROTECT,
                related_name='updated_planograms',
                to='accounts.user',
            ),
        ),
    ]
