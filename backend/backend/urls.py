from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.routers import DefaultRouter
from apps.tasks.views import TaskViewSet, signup

# Router for tasks
router = DefaultRouter()
router.register(r'tasks', TaskViewSet, basename='task')

urlpatterns = [
    path('admin/', admin.site.urls),

    # Auth routes grouped under /api/auth/
    path('api/auth/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/auth/signup/', signup, name='signup'),
    path('api/auth/', include("apps.googleauth.urls")),  # ✅ Google OAuth now under /api/auth/

    # Tasks API
    path('api/', include(router.urls)),
]
