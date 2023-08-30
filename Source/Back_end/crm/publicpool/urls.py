# urls.py

from django.urls import include, path
from publicpool.views import PublicPoolView,PublicPoolAllocationView,PublicPoolPickupView
from rest_framework.routers import DefaultRouter


router = DefaultRouter()
router.register(r'', PublicPoolView,basename='publicpool')

urlpatterns = [
    path('', include(router.urls)),
    path('allocation',PublicPoolAllocationView.as_view(), name='allocation'),
    path('pickup',PublicPoolPickupView.as_view(), name='pickup'),
]