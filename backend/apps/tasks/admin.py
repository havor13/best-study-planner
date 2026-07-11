from django.contrib import admin
from apps.tasks.models import Task

@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'description', 'completed', 'due_date', 'user')
    search_fields = ('title', 'description')
    list_filter = ('completed', 'due_date', 'user')
