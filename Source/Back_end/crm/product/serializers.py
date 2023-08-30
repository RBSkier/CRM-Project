from rest_framework import serializers
from .models import Product
from .models import ProductFollowUpLog

class ProductSerializer(serializers.ModelSerializer):
    product_id = serializers.ReadOnlyField(source='id')
    class Meta:
        model = Product
        fields = ['product_id','product_name','product_category','product_description',
        'product_unit','product_code','price','cost','inventory_quantity','sales_region']

class ProductFollowUpLogSerializer(serializers.ModelSerializer):
    sales_id = serializers.ReadOnlyField(source='id')
    class Meta:
        model = ProductFollowUpLog
        fields = ['sales_id','sales_person','sales_quantity','sales_date']


