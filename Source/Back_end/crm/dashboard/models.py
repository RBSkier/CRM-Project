from django.db import models

class KPI(models.Model):
    username = models.CharField(max_length=20)
    kpi = models.CharField(max_length=20)