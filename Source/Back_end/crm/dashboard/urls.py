# urls.py

from django.urls import path
from dashboard.views import SalesBriefView,KPIView,AmountView,ReminderView,CustomerStatisticView

urlpatterns = [
    path('salesbrief/', SalesBriefView.as_view(), name='sales_brief'),
    path('kpi/',KPIView.as_view(), name='kpi'),
    path('amount/',AmountView.as_view(), name='amount'),
    path('reminder/',ReminderView.as_view(), name='reminder'),
    path('customerstatistic/<str:statistic_type>/', CustomerStatisticView.as_view(), name='customer_statistic'),
]