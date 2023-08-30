from django.urls import include, path
from rest_framework.routers import DefaultRouter
from product.views import ProductViewSet

router = DefaultRouter()
router.register(r'', ProductViewSet,basename='product')

urlpatterns = [
    #path('<int:pk>', CreateSalesLogViewSet.as_view(), name='follow-up-log'),
    path('<int:pk>', ProductViewSet.as_view({'get': 'get'}), name='product-detail'),
    path('', include(router.urls)),
]
