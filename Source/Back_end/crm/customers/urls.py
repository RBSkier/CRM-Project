from django.urls import include, path
from rest_framework.routers import DefaultRouter
from customers.views import CustomerViewSet,CustomerLogViewSet,CustomerUpdateViewSet,FollowUpLogViewSet

router = DefaultRouter()
router.register(r'customers', CustomerViewSet,basename='customer')

urlpatterns = [
    path('customers/update/', CustomerUpdateViewSet.as_view({'put': 'update'}), name='customer-update'),
    path('', include(router.urls)),
    path('customers/detail/<int:customer_id>/', CustomerLogViewSet.as_view(), name='customer-logs'),
    path('follow-up/', FollowUpLogViewSet.as_view({'post': 'create'}), name='follow-up-log'),
]
