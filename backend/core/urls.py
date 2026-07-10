from django.urls import path, include
from rest_framework.routers import DefaultRouter
from apps.core.views import (
    UserViewSet, CourseViewSet, TaskViewSet,
    ReminderViewSet, ProgressViewSet, StudySuggestionViewSet
)

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'courses', CourseViewSet)
router.register(r'tasks', TaskViewSet)
router.register(r'reminders', ReminderViewSet)
router.register(r'progress', ProgressViewSet)
router.register(r'suggestions', StudySuggestionViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
]
