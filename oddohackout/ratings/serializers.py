from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Rating

User = get_user_model()

class RatingSerializer(serializers.ModelSerializer):
    sender_username = serializers.CharField(source='sender.username', read_only=True)
    receiver_username = serializers.CharField(source='receiver.username', read_only=True)
    sender_name = serializers.SerializerMethodField()
    receiver_name = serializers.SerializerMethodField()

    class Meta:
        model = Rating
        fields = [
            'id', 'sender', 'receiver', 'sender_username', 'receiver_username',
            'sender_name', 'receiver_name', 'rating_count', 'feedback', 
            'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'sender', 'created_at', 'updated_at']

    def get_sender_name(self, obj):
        """Get sender's full name"""
        return f"{obj.sender.first_name} {obj.sender.last_name}".strip() or obj.sender.username

    def get_receiver_name(self, obj):
        """Get receiver's full name"""
        return f"{obj.receiver.first_name} {obj.receiver.last_name}".strip() or obj.receiver.username

    def validate_rating_count(self, value):
        """Validate rating is between 1 and 5"""
        if not (1 <= value <= 5):
            raise serializers.ValidationError("Rating must be between 1 and 5")
        return value

    def validate(self, data):
        """Custom validation"""
        request = self.context.get('request')
        if request and request.user:
            # Set sender to current user
            data['sender'] = request.user
            
            # Check if user is trying to rate themselves
            if data.get('receiver') == request.user:
                raise serializers.ValidationError("You cannot rate yourself")
                
        return data

    def create(self, validated_data):
        """Create a new rating"""
        return Rating.objects.create(**validated_data)  

    def update(self, instance, validated_data):
        """Update existing rating"""
        # Only allow updating rating_count and feedback
        instance.rating_count = validated_data.get('rating_count', instance.rating_count)
        instance.feedback = validated_data.get('feedback', instance.feedback)
        instance.save()
        return instance
