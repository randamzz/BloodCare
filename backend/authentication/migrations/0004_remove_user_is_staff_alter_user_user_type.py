# Generated by Django 5.0.1 on 2024-05-06 17:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0003_alter_user_user_type'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='is_staff',
        ),
        migrations.AlterField(
            model_name='user',
            name='user_type',
            field=models.CharField(max_length=20),
        ),
    ]