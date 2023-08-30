# Generated by Django 2.1.7 on 2023-06-22 03:29

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Customer',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('landline', models.CharField(max_length=20)),
                ('phone', models.CharField(max_length=20)),
                ('email', models.EmailField(max_length=254)),
                ('customer_type', models.CharField(choices=[('Standard', 'Standard'), ('Premium', 'Premium'), ('VIP', 'VIP')], max_length=20)),
                ('company_details', models.TextField()),
                ('lead_source', models.CharField(choices=[('Website', 'Website'), ('Referral', 'Referral'), ('Email', 'Email'), ('Phone', 'Phone'), ('Other', 'Other')], max_length=20)),
                ('address', models.TextField()),
                ('industry', models.CharField(max_length=100)),
                ('follow_up_status', models.CharField(max_length=100)),
            ],
        ),
    ]