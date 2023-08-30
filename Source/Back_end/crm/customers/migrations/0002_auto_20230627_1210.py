# Generated by Django 2.1.7 on 2023-06-27 02:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('customers', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='CustomerFollowUpLog',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100)),
                ('time', models.DateTimeField()),
                ('principal', models.CharField(max_length=100)),
                ('customer', models.CharField(max_length=20)),
                ('customer_id', models.PositiveIntegerField(default=None, null=True)),
                ('content', models.TextField()),
                ('next_time', models.DateTimeField()),
            ],
        ),
        migrations.RenameField(
            model_name='customer',
            old_name='phone',
            new_name='mobile_phone',
        ),
        migrations.RemoveField(
            model_name='customer',
            name='industry',
        ),
        migrations.AddField(
            model_name='customer',
            name='customer_industry',
            field=models.CharField(choices=[('finance', 'finance'), ('service', 'service'), ('information_technology', 'information_technology'), ('hospitality_and_tourism', 'hospitality_and_tourism'), ('education', 'education'), ('media_and_entertainment', 'media_and_entertainment'), ('others', 'others')], max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='customer',
            name='principal',
            field=models.CharField(max_length=20, null=True),
        ),
        migrations.AlterField(
            model_name='customer',
            name='address',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='customer',
            name='customer_type',
            field=models.CharField(choices=[('A', 'A'), ('B', 'B'), ('C', 'C')], max_length=20),
        ),
        migrations.AlterField(
            model_name='customer',
            name='follow_up_status',
            field=models.CharField(choices=[('closed-won', 'closed-won'), ('closed-lost', 'closed-lost'), ('existing', 'existing'), ('proposal', 'proposal'), ('negotiation', 'negotiation'), ('others', 'others')], max_length=100),
        ),
        migrations.AlterField(
            model_name='customer',
            name='lead_source',
            field=models.CharField(choices=[('direct_traffic', 'direct_traffic'), ('search_engine_optimization', 'search_engine_optimization'), ('social_media', 'social_media'), ('email_marketing', 'email_marketing'), ('offline_events', 'offline_events'), ('others', 'others')], max_length=20),
        ),
    ]
