# Generated by Django 5.0.4 on 2024-05-07 01:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('hospitals', '0004_alter_blood_date_donation'),
    ]

    operations = [
        migrations.AlterField(
            model_name='blood',
            name='id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
    ]
