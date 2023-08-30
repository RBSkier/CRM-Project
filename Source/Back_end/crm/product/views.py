from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from rest_framework.viewsets import ViewSet
from .models import Product, ProductFollowUpLog
from .serializers import ProductSerializer,ProductFollowUpLogSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.views import APIView

class ProductViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = ProductSerializer
    queryset = Product.objects.all()

    def post(self, request, pk):
        if pk:
            try:
                product = Product.objects.get(id=pk)
            except Product.DoesNotExist:
                return Response(status=status.HTTP_404_NOT_FOUND)
            sales_quantity = request.data.get('sales_quantity')
            product.inventory_quantity = product.inventory_quantity - int(sales_quantity)
            product.save()

            follow_up_log = ProductFollowUpLog.objects.create(
            sales_person = request.data.get('sales_person'),
            product_id = pk,
            sales_quantity = request.data.get('sales_quantity'),
            sales_date = request.data.get('sales_date'),
            )
            return Response(status=201)
        elif pk != None:    
            serializer = ProductSerializer(data=request.data)
            if serializer.is_valid():
                product = serializer.save()
                return Response(status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk=None):
        if pk in request.path:
            try:
                product = Product.objects.get(id=pk)
                product_logs = ProductFollowUpLog.objects.filter(product_id=pk)
                
                product_data = ProductSerializer(product).data
                log_serializer = ProductFollowUpLogSerializer(product_logs, many=True).data
                
                response_data = {
                    'product_id': product_data['product_id'],
                    'product_name': product_data['product_name'],
                    'product_category': product_data['product_category'],
                    'product_description': product_data['product_description'],
                    'product_unit': product_data['product_unit'],
                    'product_code': product_data['product_code'],
                    'price': product_data['price'],
                    'cost': product_data['cost'],
                    'inventory_quantity': product_data['inventory_quantity'],
                    'sales_region': product_data['sales_region'],
                    'sales_records': log_serializer
                }
                
                return Response(response_data)
            except Product.DoesNotExist:
                return Response(status=status.HTTP_404_NOT_FOUND)

    def list(self, request, *args, **kwargs):

        product_name = request.query_params.get('product_name')
        product_category = request.query_params.get('product_category')
        price_min = request.query_params.get('price_min')
        price_max = request.query_params.get('price_max')
        queryset = self.filter_queryset(self.get_queryset())

        if product_name:
            queryset = queryset.filter(product_name__icontains=product_name)
        if product_category:
            queryset = queryset.filter(product_category=product_category)
        if price_min:
            queryset = queryset.filter(price__gte = price_min)
        if price_max:
            queryset = queryset.filter(price__lte = price_max)
        # if price_min and price_max:
        #     queryset = queryset.filter(price__range=(price_min, price_max))

        serializer = self.get_serializer(queryset, many=True)
        response_data = {
                "products": serializer.data
                }
        return Response(response_data)

    def destroy(self, request, *args, **kwargs):
        # url = request.build_absolute_uri()
        # product_id = int(url.split('/')[-2])
        # ProductFollowUpLog.objects.filter(product_id=product_id).delete()
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=200)

