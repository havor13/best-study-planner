from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.routers import DefaultRouter
from apps.tasks.views import TaskViewSet
from apps.googleauth import views as google_views   # ✅ fixed import

# Instantiate the router
router = DefaultRouter()
router.register(r'tasks', TaskViewSet, basename='task')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/', include(router.urls)),   # ✅ now /api/tasks/ works
    path("", include("apps.googleauth.urls")),  # ✅ include googleauth urls
]
