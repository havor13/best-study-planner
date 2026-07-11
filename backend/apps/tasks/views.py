from rest_framework import viewsets
from apps.tasks.models import Task   # ✅ absolute import
from apps.tasks.serializers import TaskSerializer

class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

def get_queryset(self):
    return Task.objects.filter(user=self.request.user)

def perform_create(self, serializer):
    serializer.save(user=self.request.user)
