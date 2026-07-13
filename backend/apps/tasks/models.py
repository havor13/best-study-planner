from django.db import models
from django.conf import settings


class Task(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)  # ✅ use custom user
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)                # optional description
    completed = models.BooleanField(default=False)
    due_date = models.DateField(null=True, blank=True)        # optional deadline

    def __str__(self):
        return self.title
