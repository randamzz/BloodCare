# Generated by Django 5.0.4 on 2024-05-07 01:14

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('hospitals', '0002_delete_alert'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AlterField(
            model_name='blood',
            name='hospital',
            field=models.ForeignKey(limit_choices_to={'user_type': 'citizen'}, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]