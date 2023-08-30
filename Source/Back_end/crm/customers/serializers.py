from rest_framework import serializers
from .models import Customer
from .models import CustomerFollowUpLog

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = '__all__'

class CustomerFollowUpLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomerFollowUpLog
        fields = ['title', 'time', 'principal', 'customer', 'content', 'next_time']
