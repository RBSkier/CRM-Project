from rest_framework import serializers
from .models import Task, SubTask

class SubTaskSerializer(serializers.ModelSerializer):
    sub_task_id = serializers.ReadOnlyField(source='id')
    class Meta:
        model = SubTask
        fields = ( 'sub_task_id','title', 'status')

class CreateTaskSerializer(serializers.ModelSerializer):
    sub_task = SubTaskSerializer(many=True)

    class Meta:
        model = Task
        fields = ['task_title', 'task_description', 'priority', 'start_date', 'due_date', 'status', 'principal', 'sub_task']

    def create(self, validated_data):
        sub_task_data = validated_data.pop('sub_task')
        task = Task.objects.create(**validated_data)
        for sub_task in sub_task_data:
            SubTask.objects.create(task=task, **sub_task)
        return task

class TaskSerializer(serializers.ModelSerializer):
    task_id = serializers.SerializerMethodField()
    sub_task = SubTaskSerializer(many=True, read_only=True)

    def get_task_id(self, obj):
        return obj.id

    class Meta:
        model = Task
        fields = ['task_id','task_title', 'task_description', 'priority', 'start_date', 
        'due_date', 'status', 'principal', 'sub_task']

    def create(self, validated_data):
        sub_task_data = validated_data.pop('sub_task')
        task = Task.objects.create(**validated_data)
        for sub_task in sub_task_data:
            SubTask.objects.create(task=task, **sub_task)
        return task

class TaskListSerializer(serializers.ModelSerializer):
    task_id = serializers.SerializerMethodField()
    sub_task_amount = serializers.SerializerMethodField()

    def get_sub_task_amount(self, obj):
        return obj.sub_task.count()
    def get_task_id(self, obj):
        return obj.id
    class Meta:
        model = Task
        fields = ('task_id', 'task_title', 'task_description', 'priority', 
        'start_date', 'due_date', 'status', 'principal', 'sub_task_amount')