from rest_framework import viewsets
from rest_framework.viewsets import ViewSet
from .models import Customer,CustomerFollowUpLog
from .serializers import CustomerSerializer,CustomerFollowUpLogSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.views import APIView

class CustomerViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = CustomerSerializer
    queryset = Customer.objects.all()

    def list(self, request, *args, **kwargs):

        follow_up_status = request.query_params.get('follow_up_status')
        lead_source = request.query_params.get('lead_source')
        customer_type = request.query_params.get('customer_type')
        customer_industry = request.query_params.get('customer_industry')
        queryset = self.filter_queryset(self.get_queryset())
        
        user = self.request.user
        if user.is_staff == True:
            queryset = Customer.objects.filter(principal=user.username)
        elif user.is_staff == False:
            queryset = Customer.objects.all()

        if follow_up_status:
            queryset = queryset.filter(follow_up_status__iexact=follow_up_status)
        if lead_source:
            queryset = queryset.filter(lead_source__iexact=lead_source)
        if customer_type:
            queryset = queryset.filter(customer_type__iexact=customer_type)
        if customer_industry:
            queryset = queryset.filter(customer_industry__iexact=customer_industry)
        queryset = queryset.exclude(principal=None)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        url = request.build_absolute_uri()
        customer_id = int(url.split('/')[-2])
        CustomerFollowUpLog.objects.filter(customer_id=customer_id).delete()
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=200)

class CustomerUpdateViewSet(ViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = CustomerSerializer
    queryset = Customer.objects.all()

    def update(self, request):
        customer_id = request.data.get('id')
        if not customer_id:
            return Response({'detail': 'Customer ID is required'}, status=status.HTTP_400_BAD_REQUEST)

        customer = self.get_object(customer_id)
        serializer = self.serializer_class(customer, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get_object(self, customer_id):
        try:
            return self.queryset.get(pk=customer_id)
        except Customer.DoesNotExist:
            return Response({'detail': 'Customer not found'}, status=status.HTTP_404_NOT_FOUND)


class CustomerLogViewSet(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, customer_id, format=None):
        try:
            customer = Customer.objects.get(id=customer_id)
            customer_logs = CustomerFollowUpLog.objects.filter(customer_id=customer_id)
            
            customer_data = CustomerSerializer(customer).data
            log_serializer = CustomerFollowUpLogSerializer(customer_logs, many=True).data
            
            response_data = {
                'id': customer_data['id'],
                'name': customer_data['name'],
                'landline': customer_data['landline'],
                'email': customer_data['email'],
                'mobile_phone': customer_data['mobile_phone'],
                'customer_type': customer_data['customer_type'],
                'company_details': customer_data['company_details'],
                'lead_source': customer_data['lead_source'],
                'address': customer_data['address'],
                'customer_industry': customer_data['customer_industry'],
                'follow_up_status': customer_data['follow_up_status'],
                'principal': customer_data['principal'],
                'follow_up_log': log_serializer
            }
            
            return Response(response_data)
        except Customer.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

from rest_framework.viewsets import ViewSet
from rest_framework.response import Response

class FollowUpLogViewSet(ViewSet):
    permission_classes = [IsAuthenticated]
    def create(self, request):

        follow_up_log = CustomerFollowUpLog.objects.create(
            title = request.data.get('title'),
            time = request.data.get('time'),
            principal = request.data.get('principal'),
            customer = request.data.get('customer'),
            customer_id = request.data.get('customer_id'),
            content = request.data.get('content'),
            next_time = request.data.get('next_time'),
        )
        return Response(status=201)
