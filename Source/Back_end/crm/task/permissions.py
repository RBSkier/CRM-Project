from rest_framework.permissions import BasePermission
from .models import Task
from rest_framework.exceptions import PermissionDenied

class CanAssignTaskPermission(BasePermission):
    def has_permission(self, request, view):
        if request.user.is_staff == False:
            return True
        raise PermissionDenied({'status':'error','message':'Permission Denied'})

class CanModifyTask(BasePermission):
    def has_permission(self, request, view):
        if request.method in ['PUT', 'PATCH','DELETE']: 
            return False
        return True 
