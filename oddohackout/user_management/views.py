from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.generics import CreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated
from user_management.serializers import CustomTokenObtainPairSerializer,UserSerializer,UserDetailUpdateDeleteSerializer
from rest_framework_simplejwt.views import TokenObtainPairView




# Create your views here.

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

class UserCreateView(CreateAPIView):
    serializer_class = UserSerializer


class UserDetailUpdateView(RetrieveUpdateDestroyAPIView):
    serializer_class = UserDetailUpdateDeleteSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user

    def get(self, request, *args, **kwargs):
        user = self.get_object()
        serializer = self.get_serializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, *args, **kwargs):
        user = self.get_object()
        serializer = self.get_serializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def delete(self, request, *args, **kwargs):
        user = self.get_object()
        user.delete()
        return Response({"message":"profile deleted successfuly"},status=status.HTTP_204_NO_CONTENT)
    