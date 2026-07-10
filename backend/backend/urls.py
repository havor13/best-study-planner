from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from apps.tasks.views import TaskViewSet

# Create a DRF router and register your TaskViewSet
router = routers.DefaultRouter()
router.register(r'tasks', TaskViewSet, basename="task")

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include(router.urls)),   # ✅ exposes /api/tasks/
]
