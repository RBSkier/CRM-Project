from django.shortcuts import render



from rest_framework.views import APIView
from rest_framework.response import Response
from customers.models import Customer,CustomerFollowUpLog
from customers.serializers import CustomerSerializer
from product.models import ProductFollowUpLog,Product
from django.contrib.auth.models import User
from datetime import datetime, timedelta
from rest_framework.permissions import IsAuthenticated
from django.db.models import Q
from dashboard.models import KPI
from dashboard.serializers import KPISerializer
from rest_framework import status
from calendar import month_name
from django.db.models import Max
from django.db.models import Count


class SalesBriefView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):

        user = self.request.user
        if user.is_staff == True:
            customers = Customer.objects.filter(principal=user.username)
        elif user.is_staff == False:
            customers = Customer.objects.all()
        if user.is_staff == True:
            follow_up_log = CustomerFollowUpLog.objects.filter(principal=user.username)
        elif user.is_staff == False:
            follow_up_log = CustomerFollowUpLog.objects.all()

        customer_count = customers.count()
        log_count = follow_up_log.count()

        if user.is_staff == True:
            sales_records = ProductFollowUpLog.objects.filter(sales_person=user.username)
        elif user.is_staff == False:
            sales_records = ProductFollowUpLog.objects.all()

        amount = 0
        for record in sales_records:
            for product in Product.objects.filter(id = record.product_id):
                price = product.price
                amount += price*record.sales_quantity
        sales_brief_data = {
            'customer_amount': str(customer_count),
            'new_followup_amount': str(log_count),
            'sales_amount':str(amount),
        }

        #serializer = SalesBriefSerializer(sales_brief_data)

        return Response(sales_brief_data)


class KPIView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        user = self.request.user
        sales_records = ProductFollowUpLog.objects.filter(sales_person=user.username)
        amount = 0
        for record in sales_records:
            if Product.objects.filter(id = record.product_id)[0]:
                price = Product.objects.filter(id = record.product_id)[0].price
                amount += price*record.sales_quantity
        
        kpi_object = KPI.objects.filter(username=user.username).first()
        if kpi_object:
            kpi = kpi_object.kpi
            percentage = amount*100/float(kpi)
            if percentage > 100:
                percentage = 100
        else:
            kpi = 0
            percentage = 0
        
        sales_brief_data = {
            'kpi': str(kpi),
            'sales_amount':str(amount),
            'percentage':str(percentage)+'%',
        }
        return Response(sales_brief_data)

    def post(self, request):
        user = self.request.user
        serializer = KPISerializer(data=request.data)
        if serializer.is_valid():
            kpi_data = serializer.validated_data
            kpi_username = kpi_data.get('username')

            existing_kpi = KPI.objects.filter(username=user.username).first()
            if existing_kpi:
                existing_kpi.kpi = kpi_data.get('kpi')
                existing_kpi.save()
                return Response(status=status.HTTP_200_OK)
            else:
                kpi = serializer.save(username=user.username)
                return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class AmountView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        user = self.request.user

        if user.is_staff == True:
            sales_records = ProductFollowUpLog.objects.filter(sales_person=user.username)
        elif user.is_staff == False:
            sales_records = ProductFollowUpLog.objects.all()

        monthly_sales = {}
        for record in sales_records:
            for product in Product.objects.filter(id = record.product_id):
                price = product.price
                date = record.sales_date
                #date = datetime.strptime(date_str, "%Y-%m-%dT%H:%M:%SZ")
                month = date.month
                revenue = price*record.sales_quantity
                if month not in monthly_sales:
                    monthly_sales[month] = revenue
                else:
                    monthly_sales[month] += revenue
            
        for month in range(1, 13):
            if month not in monthly_sales:
                monthly_sales[month] = 0

        sales = [{"month": f"{month_name[month]}", "revenue": revenue} for month, revenue in monthly_sales.items()]

        def compare_month(item):
            month_order = {
                "January": 1,
                "February": 2,
                "March": 3,
                "April": 4,
                "May": 5,
                "June": 6,
                "July": 7,
                "August": 8,
                "September": 9,
                "October": 10,
                "November": 11,
                "December": 12
            }
            return month_order[item["month"]]

        sales = sorted(sales, key=compare_month)
        
        response_data = {
            'sales':sales
        }
        return Response(response_data)

class ReminderView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        user = self.request.user        

        current_date = datetime.now().date()
        
        if user.is_staff == True:
            last_follow_up_dates = CustomerFollowUpLog.objects.values('customer_id').annotate(last_follow_up=Max('time'))\
        .filter(principal=user.username)
        elif user.is_staff == False:
            last_follow_up_dates = CustomerFollowUpLog.objects.values('customer_id').annotate(last_follow_up=Max('time'))
        
        #print(last_follow_up_dates)

        last_7_days_count = 0
        last_15_days_count = 0
        last_30_days_count = 0
        last_3_months_count = 0
        last_6_months_count = 0
        over_6_months_count = 0
        
        for item in last_follow_up_dates:
            last_follow_up = item['last_follow_up'].date()
            if current_date-last_follow_up >= timedelta(days=7):
                last_7_days_count += 1
            if current_date-last_follow_up >= timedelta(days=15):
                last_15_days_count += 1
            if current_date-last_follow_up >= timedelta(days=30):
                last_30_days_count += 1
            if current_date-last_follow_up >= timedelta(days=90):
                last_3_months_count += 1
            if current_date-last_follow_up >= timedelta(days=180):
                last_6_months_count += 1
            if current_date-last_follow_up >= timedelta(days=360):
                over_6_months_count += 1
        
        statistics = {
            "last_7_days": last_7_days_count,
            "last_15_days": last_15_days_count,
            "last_30_days": last_30_days_count,
            "last_3_months": last_3_months_count,
            "last_6_months": last_6_months_count,
            "over_6_months": over_6_months_count
        }
        
        response_data = {
            "statistics": statistics
        }
        
        return Response(response_data)


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
    
class CustomerStatisticView(APIView):

    permission_classes = [IsAuthenticated]


    def get(self, request, statistic_type):
        user = self.request.user  
        if statistic_type == 'follow_up_status':
            statistics = self.get_follow_up_status_statistics(user)
        elif statistic_type == 'customer_type':
            statistics = self.get_customer_type_statistics(user)
        elif statistic_type == 'lead_source':
            statistics = self.get_lead_source_statistics(user)
        elif statistic_type == 'customer_industry':
            statistics = self.get_customer_industry_statistics(user)
        else:
            return Response({"error": "Invalid statistic type"}, status=400)
        
        response_data = {
            "statistics": statistics
        }
        
        return Response(response_data)


    def get_follow_up_status_statistics(self,user):
        if user.is_staff == True:
            statistics = Customer.objects.values('follow_up_status').annotate(count=Count('id')).filter(principal=user.username)
        elif user.is_staff == False:
            statistics = Customer.objects.values('follow_up_status').annotate(count=Count('id'))
        follow_up_status_statistics = {item['follow_up_status']: item['count'] for item in statistics}
        
        return self.fill_missing_values(follow_up_status_statistics, FOLLOW_UP_STATUS)
    
    def get_customer_type_statistics(self,user):
        if user.is_staff == True:
            statistics = Customer.objects.values('customer_type').annotate(count=Count('id')).filter(principal=user.username)
        elif user.is_staff == False:
            statistics = Customer.objects.values('customer_type').annotate(count=Count('id'))       
        customer_type_statistics = {item['customer_type']: item['count'] for item in statistics}
        
        return self.fill_missing_values(customer_type_statistics, CUSTOMER_TYPES)
    
    def get_lead_source_statistics(self,user):
        if user.is_staff == True:
            statistics = Customer.objects.values('lead_source').annotate(count=Count('id')).filter(principal=user.username)
        elif user.is_staff == False:
            statistics = Customer.objects.values('lead_source').annotate(count=Count('id')) 
        lead_source_statistics = {item['lead_source']: item['count'] for item in statistics}
        
        return self.fill_missing_values(lead_source_statistics, LEAD_SOURCES)
    
    def get_customer_industry_statistics(self,user):
        if user.is_staff == True:
            statistics = Customer.objects.values('customer_industry').annotate(count=Count('id')).filter(principal=user.username)
        elif user.is_staff == False:
            statistics = Customer.objects.values('customer_industry').annotate(count=Count('id')) 
        customer_industry_statistics = {item['customer_industry']: item['count'] for item in statistics}
        
        return self.fill_missing_values(customer_industry_statistics, CUSTOMER_INDUSTRY)
    
    def fill_missing_values(self, statistics, options):
        filled_statistics = {}
        for option, _ in options:
            filled_statistics[option] = statistics.get(option, 0)
        
        return filled_statistics