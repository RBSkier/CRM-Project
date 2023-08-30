from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from customers.models import Customer,CustomerFollowUpLog
from customers.serializers import CustomerSerializer,CustomerFollowUpLogSerializer
from rest_framework import viewsets
from publicpool.serializers import PublicpoolCustomerSerializer
from rest_framework.decorators import action

class PublicPoolView(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = PublicpoolCustomerSerializer
    queryset = Customer.objects.all()

    def create(self, request, *args, **kwargs):
        customer_ids = request.data.get('customer_id', [])
        try:
            customer_ids = [int(cid) for cid in customer_ids]
        except ValueError:
            return Response({"error": "Invalid customer ID(s)"}, status=400)
        
        customers_to_move = Customer.objects.filter(id__in=customer_ids)
        if len(customers_to_move) == len(customer_ids):
            customers_to_move.update(principal=None)
            return Response(status=200)
        else:
            return Response(status=400)
        
    def list(self, request, *args, **kwargs):

        follow_up_status = request.query_params.get('follow_up_status')
        lead_source = request.query_params.get('lead_source')
        customer_type = request.query_params.get('customer_type')
        customer_industry = request.query_params.get('customer_industry')

        queryset = Customer.objects.all()

        if follow_up_status:
            queryset = queryset.filter(follow_up_status__iexact=follow_up_status)
        if lead_source:
            queryset = queryset.filter(lead_source__iexact=lead_source)
        if customer_type:
            queryset = queryset.filter(customer_type__iexact=customer_type)
        if customer_industry:
            queryset = queryset.filter(customer_industry__iexact=customer_industry)
        queryset = queryset.filter(principal=None)
        serializer = PublicpoolCustomerSerializer(queryset, many=True)
        return Response(serializer.data)
        
    @action(detail=False, methods=['DELETE'])
    def delete(self, request):
        user = self.request.user
        if user.is_staff == False:
            customer_ids = request.data.get('customer_id', [])
            
            try:
                customer_ids = [int(cid) for cid in customer_ids]
            except ValueError:
                return Response({"error": "Invalid customer ID(s)"}, status=400)
            
            customers_to_delete = Customer.objects.filter(id__in=customer_ids)

            CustomerFollowUpLog.objects.filter(customer_id__in=customer_ids).delete()

            deleted_count, _ = customers_to_delete.delete()
            
            return Response({"message": f"{deleted_count} customers deleted successfully"}, status=200)
        return Response(status=403)

class PublicPoolAllocationView(APIView):
    permission_classes = [IsAuthenticated]
    def put(self, request):
        user = self.request.user
        if user.is_staff == False:
            customer_ids = request.data.get('customer_id', [])
            principal = request.data.get('principal', None)
            
            if not principal:
                return Response({"error": "Please provide the staff name to allocate customers"}, status=400)
            
            try:
                customer_ids = [int(cid) for cid in customer_ids]
            except ValueError:
                return Response({"error": "Invalid customer ID(s)"}, status=400)
            
            customers_to_allocate = Customer.objects.filter(id__in=customer_ids)
            if len(customers_to_allocate) == len(customer_ids):
                customers_to_allocate.update(principal=principal)
                
                return Response(status=200)
            else:
                return Response(status=400)
        return Response(status=403)
        
class PublicPoolPickupView(APIView):
    permission_classes = [IsAuthenticated]
    def put(self, request):
        customer_ids = request.data.get('customer_id', [])
        principal = self.request.user.username
        try:
            customer_ids = [int(cid) for cid in customer_ids]
        except ValueError:
            return Response({"error": "Invalid customer ID(s)"}, status=400)
        
        customers_to_allocate = Customer.objects.filter(id__in=customer_ids)
        if len(customers_to_allocate) == len(customer_ids):
            customers_to_allocate.update(principal=principal)
            
            return Response(status=200)
        else:
            return Response(status=400)

class PublicPoolDeletionView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request):
        user = self.request.user
        if user.is_staff == False:
            customer_ids = request.data.get('customer_id', [])
            
            try:
                customer_ids = [int(cid) for cid in customer_ids]
            except ValueError:
                return Response({"error": "Invalid customer ID(s)"}, status=400)
            
            customers_to_delete = Customer.objects.filter(id__in=customer_ids)

            CustomerFollowUpLog.objects.filter(customer_id__in=customer_ids).delete()

            deleted_count, _ = customers_to_delete.delete()
            
            return Response({"message": f"{deleted_count} customers deleted successfully"}, status=200)
        return Response(status=403)






