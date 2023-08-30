from django.db import models

class Product(models.Model):

    product_name = models.CharField(max_length=100, blank=False, null=False)
    product_category = models.CharField(max_length=20)
    product_description = models.TextField(null = True,blank=True)
    product_unit = models.CharField(max_length=20, blank=False, null=False)
    product_code = models.CharField(max_length=20, blank=False, null=False)
    price = models.FloatField(null=True)
    cost =  models.FloatField(null=True)
    inventory_quantity = models.PositiveIntegerField(default=None, null=True)
    sales_region = models.TextField(null = True,blank=True)


    def __str__(self):
        return self.name

class ProductFollowUpLog(models.Model):
    product_id = models.PositiveIntegerField(default=None, null=True)
    #product = models.ForeignKey(Product, related_name='ProductFollowUpLog', on_delete=models.CASCADE)
    sales_person = models.CharField(max_length=20, blank=False, null=False)
    sales_quantity = models.PositiveIntegerField(blank=False, null=False)
    sales_date = models.DateTimeField(null=True)