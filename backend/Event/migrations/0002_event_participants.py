# Generated by Django 5.0 on 2024-05-26 14:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Event', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='event',
            name='participants',
            field=models.PositiveIntegerField(default=0),
        ),
    ]
