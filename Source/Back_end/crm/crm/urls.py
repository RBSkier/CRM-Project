"""crm URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from user import views
from django.urls import include
from rest_framework_swagger.views import get_swagger_view

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/user/', include('user.urls')),
    path('api/tasks/', include('task.urls')),
    path('api/customer/', include('customers.urls')),
    path('api/products/', include('product.urls')),
    path('api/dashboard/', include('dashboard.urls')), 
    path('api/rank/', include('rank.urls')),
    path('api/publicpool/', include('publicpool.urls')),
    path('api/docs/', get_swagger_view(title='API Documentation')),
]
