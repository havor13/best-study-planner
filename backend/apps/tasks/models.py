from django.db import models
from django.contrib.auth.models import User

class Task(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)  # link to user
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)                # optional description
    completed = models.BooleanField(default=False)
    due_date = models.DateField(null=True, blank=True)        # optional deadline

    def __str__(self):
        return self.title
