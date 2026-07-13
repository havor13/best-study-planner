from django.db import models
from django.conf import settings  # ✅ use default user model

class Course(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    start_date = models.DateField(null=True, blank=True)
    end_date = models.DateField(null=True, blank=True)

    def __str__(self):
        return self.name


class Reminder(models.Model):
    task = models.ForeignKey('tasks.Task', on_delete=models.CASCADE)  # ✅ points to Task in tasks app
    reminder_time = models.DateTimeField()
    method = models.CharField(max_length=20, default='popup')


class Progress(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    task = models.ForeignKey('tasks.Task', on_delete=models.CASCADE)  # ✅ points to Task in tasks app
    completed_at = models.DateTimeField(auto_now_add=True)


class StudySuggestion(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    suggested_time = models.DateTimeField()
    reason = models.TextField(blank=True)
