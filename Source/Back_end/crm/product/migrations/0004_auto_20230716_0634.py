# Generated by Django 2.1.7 on 2023-07-16 06:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0003_auto_20230714_0758'),
    ]

    operations = [
        migrations.AlterField(
            model_name='productfollowuplog',
            name='sales_person',
            field=models.CharField(max_length=20),
        ),
    ]