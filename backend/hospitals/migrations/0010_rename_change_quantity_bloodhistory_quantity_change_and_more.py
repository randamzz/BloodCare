# Generated by Django 5.0.6 on 2024-06-25 02:51

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('hospitals', '0009_bloodhistory'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.RenameField(
            model_name='bloodhistory',
            old_name='change_quantity',
            new_name='quantity_change',
        ),
        migrations.RemoveField(
            model_name='bloodhistory',
            name='blood_type',
        ),
        migrations.RemoveField(
            model_name='bloodhistory',
            name='change_type',
        ),
        migrations.RemoveField(
            model_name='bloodhistory',
            name='new_quantity',
        ),
        migrations.AddField(
            model_name='bloodhistory',
            name='action',
            field=models.CharField(choices=[('add', 'Add'), ('increase', 'Increase'), ('decrease', 'Decrease')], default='add', max_length=10),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='bloodhistory',
            name='blood',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='hospitals.blood'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='blood',
            name='hospital',
            field=models.ForeignKey(limit_choices_to={'user_type': 'hospital'}, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]
