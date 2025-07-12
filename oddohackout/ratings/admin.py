from django.contrib import admin
from .models import Rating

@admin.register(Rating)
class RatingAdmin(admin.ModelAdmin):
    list_display = ['sender', 'receiver', 'rating_count', 'created_at']
    list_filter = ['rating_count', 'created_at']
    search_fields = ['sender__username', 'receiver__username', 'sender__email', 'receiver__email']
    readonly_fields = ['created_at', 'updated_at']
    ordering = ['-created_at']
    
    fieldsets = (
        ('Rating Information', {
            'fields': ('sender', 'receiver', 'rating_count', 'feedback')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    
    def get_queryset(self, request):
        return super().get_queryset(request).select_related('sender', 'receiver')
