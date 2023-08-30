from django.db import models

class Task(models.Model):
    # PRIORITY = (
    #     ('low','low'),
    #     ('medium','medium'),
    #     ('high','high'),
    # )
    task_title = models.CharField(max_length=100)
    task_description = models.TextField()
    # priority = models.CharField(max_length=20,choices=PRIORITY)
    priority = models.CharField(max_length=20)
    start_date = models.DateTimeField()
    due_date = models.DateTimeField()
    status = models.CharField(max_length=20)
    principal = models.CharField(max_length=100)

class SubTask(models.Model):
    task = models.ForeignKey(Task, related_name='sub_task', on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    status = models.CharField(max_length=20)
