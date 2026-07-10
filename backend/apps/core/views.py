from rest_framework import viewsets
from apps.core.models import User, Course, Task, Reminder, Progress, StudySuggestion
from apps.core.serializers import (
    UserSerializer, CourseSerializer, TaskSerializer,
    ReminderSerializer, ProgressSerializer, StudySuggestionSerializer
)

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

class ReminderViewSet(viewsets.ModelViewSet):
    queryset = Reminder.objects.all()
    serializer_class = ReminderSerializer

class ProgressViewSet(viewsets.ModelViewSet):
    queryset = Progress.objects.all()
    serializer_class = ProgressSerializer

class StudySuggestionViewSet(viewsets.ModelViewSet):
    queryset = StudySuggestion.objects.all()
    serializer_class = StudySuggestionSerializer
