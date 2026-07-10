from rest_framework import serializers
from .models import User, Course, Task, Reminder, Progress, StudySuggestion

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'created_at']

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ['id', 'user', 'name', 'description', 'start_date', 'end_date']

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ['id', 'user', 'course', 'title', 'description', 'priority', 'due_date', 'status', 'created_at']

class ReminderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reminder
        fields = ['id', 'task', 'reminder_time', 'method']

class ProgressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Progress
        fields = ['id', 'user', 'task', 'completed_at']

class StudySuggestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudySuggestion
        fields = ['id', 'user', 'suggested_time', 'reason']
