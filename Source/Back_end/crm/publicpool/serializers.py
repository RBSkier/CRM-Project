from rest_framework import serializers
from customers.models import Customer

class PublicpoolCustomerSerializer(serializers.ModelSerializer):

    class Meta:
        model = Customer
        exclude = ['principal']
