# Generated by Django 5.0 on 2024-05-31 18:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Event', '0004_alter_event_association_or_hospital'),
    ]

    operations = [
        migrations.AlterField(
            model_name='event',
            name='association_or_hospital',
            field=models.CharField(max_length=255),
        ),
    ]