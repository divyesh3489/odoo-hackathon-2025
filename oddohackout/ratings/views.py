from rest_framework import generics, permissions
from django.contrib.auth import get_user_model
from .models import Rating
from .serializers import RatingSerializer
from utils.renderers import CustomJSONRenderer

User = get_user_model()

class RatingCreateView(generics.CreateAPIView):
    """Create a new rating"""
    queryset = Rating.objects.all()
    serializer_class = RatingSerializer
    permission_classes = [permissions.IsAuthenticated]
    renderer_classes = [CustomJSONRenderer]

    def perform_create(self, serializer):
        serializer.save(sender=self.request.user)


class RatingUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    """Retrieve, update or delete a rating"""
    queryset = Rating.objects.all()
    serializer_class = RatingSerializer
    permission_classes = [permissions.IsAuthenticated]
    renderer_classes = [CustomJSONRenderer]

    def get_queryset(self):
        # Users can only modify their own ratings
        return Rating.objects.filter(sender=self.request.user)
