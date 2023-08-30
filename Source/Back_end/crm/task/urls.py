from django.urls import path,include
from .views import TaskViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'', TaskViewSet, basename='task')

urlpatterns = [
    *router.urls,
    path('sub_tasks/<int:sub_task_id>/', TaskViewSet.as_view({'put': 'update_sub_task_status'}), name='update_sub_task_status'),
]       