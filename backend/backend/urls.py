from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from apps.tasks.views import TaskViewSet
from django.views.generic import RedirectView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
router = routers.DefaultRouter()
router.register(r'tasks', TaskViewSet, basename="task")

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include(router.urls)),
    path("", RedirectView.as_view(url="/api/")),   # ✅ redirect root
    path("api/auth/login/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/auth/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
]
