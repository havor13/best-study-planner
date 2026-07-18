from django.db import models
from django.contrib.auth.models import User
from datetime import datetime

class GoogleCredentials(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    access_token = models.TextField()
    refresh_token = models.TextField()
    token_expiry = models.DateTimeField()

    def is_expired(self):
        return self.token_expiry <= datetime.datetime.utcnow()
