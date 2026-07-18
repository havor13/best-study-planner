from django.urls import path
from . import views

urlpatterns = [
    path("google", views.google_login, name="google_login"),
    path("oauth2callback", views.oauth2callback, name="oauth2callback"),
]
