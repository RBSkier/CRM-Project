from django.db import models

class Customer(models.Model):
    FOLLOW_UP_STATUS = (
        ('closed-won', 'closed-won'),
        ('closed-lost', 'closed-lost'),
        ('existing', 'existing'),
        ('proposal', 'proposal'),
        ('negotiation', 'negotiation'),
        ('others','others'),
    )

    CUSTOMER_TYPES = (
        ('A','A'),
        ('B','B'),
        ('C','C'),
    )

    LEAD_SOURCES = (
        ('direct_traffic','direct_traffic'),
        ('search_engine_optimization','search_engine_optimization'),
        ('social_media','social_media'),
        ('email_marketing','email_marketing'),
        ('offline_events','offline_events'),
        ('others','others'),
    )

    CUSTOMER_INDUSTRY = (
        ('finance','finance'),
        ('service','service'),
        ('information_technology','information_technology'),
        ('hospitality_and_tourism','hospitality_and_tourism'),
        ('education','education'),
        ('media_and_entertainment','media_and_entertainment'),
        ('others','others'),
    )

    name = models.CharField(max_length=100, blank=False, null=False)
    landline = models.CharField(max_length=20)
    mobile_phone = models.CharField(max_length=20, blank=False, null=False)
    email = models.EmailField()
    customer_type = models.CharField(max_length=20, choices=CUSTOMER_TYPES)
    company_details = models.TextField(blank=False, null=False)
    lead_source = models.CharField(max_length=20, choices=LEAD_SOURCES)
    address = models.TextField(null = True,blank=True)
    customer_industry = models.CharField(max_length=100,choices=CUSTOMER_INDUSTRY,null=True)
    follow_up_status = models.CharField(max_length=100, choices=FOLLOW_UP_STATUS)
    principal = models.CharField(max_length=20,null=True)

    def __str__(self):
        return self.name

class CustomerFollowUpLog(models.Model):
    title = models.CharField(max_length=100)
    time = models.DateTimeField()
    principal = models.CharField(max_length=100)
    customer = models.CharField(max_length=20)
    customer_id = models.PositiveIntegerField(default=None, null=True)
    content = models.TextField()
    next_time = models.DateTimeField()