from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import TaskSerializer,SubTaskSerializer,TaskListSerializer,CreateTaskSerializer
from rest_framework.permissions import IsAuthenticated
from .permissions import CanAssignTaskPermission
from rest_framework import generics
from .models import Task,SubTask
from django.db import models
from rest_framework import viewsets
from rest_framework.decorators import api_view

class TaskViewSet(viewsets.ViewSet):

    serializer_class = TaskSerializer
    task_serializer_class = TaskSerializer
    subtask_serializer_class = SubTaskSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Task.objects.all()

    def post(self, request):
        serializer = CreateTaskSerializer(data=request.data)
        if serializer.is_valid():
            task = serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def list(self, request):
        task_title = self.request.query_params.get('task_title')
        principal = self.request.query_params.get('principal')
        due_date = self.request.query_params.get('due_date')
        priority = self.request.query_params.get('priority')

        queryset = Task.objects.all()
        user = self.request.user
        if user.is_staff == True:
            queryset = Task.objects.filter(principal=user.username)
        elif user.is_staff == False:
            queryset = Task.objects.all()

        if task_title:
            queryset = queryset.filter(task_title__icontains=task_title)
        if principal:
            queryset = queryset.filter(principal=principal)
        if due_date:
            queryset = queryset.filter(due_date__lte=due_date)
        if priority:
            queryset = queryset.filter(priority=priority)

        serializer_data = TaskListSerializer(queryset, many=True).data
        return Response(serializer_data)

    def retrieve(self, request, pk=None):
        try:
            task = Task.objects.get(pk=pk)
        except Task.DoesNotExist:
            return Response({"message": "Task not found"}, status=404)

        if pk in request.path:
            task_serializer = self.task_serializer_class(task)
            response_data = {
                "task": task_serializer.data,
            }   
            return Response(task_serializer.data)

    def destroy(self, request, pk=None):
            try:
                task = Task.objects.get(pk=pk)
            except Task.DoesNotExist:
                return Response({"message": "Task not found"}, status=status.HTTP_404_NOT_FOUND)

            task.delete()

            return Response(status=status.HTTP_200_OK)
    
    def update(self, request, pk=None):
        try:
            task = Task.objects.get(pk=pk)
        except Task.DoesNotExist:
            return Response({"message": "Task not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = TaskSerializer(task, data=request.data,partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def update_sub_task_status(self, request, sub_task_id=None):
        try:
            sub_task = SubTask.objects.get(pk=sub_task_id)
        except SubTask.DoesNotExist:
            return Response({"message": "SubTask not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = SubTaskSerializer(sub_task, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)