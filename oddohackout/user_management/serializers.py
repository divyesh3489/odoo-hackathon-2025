from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import authenticate
from django.contrib.auth import get_user_model

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
     def validate(self,attrs):
        username = attrs.get('email')
        password = attrs.get('password')
        user = authenticate(username=username, password=password)
        if user is None:
            raise serializers.ValidationError("Invalid credentials")
        refresh_token = self.get_token(user)
        data = {
            'refresh_token': str(refresh_token),
            'access_token': str(refresh_token.access_token)
        }
        return data

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ['id','email','username','first_name','last_name','profile_image','password']
        extra_kwargs = {'password': {'write_only': True, 'min_length': 5}}

    def create(self, validated_data):
        return get_user_model().objects.create_user(**validated_data)
    
class UserDetailUpdateDeleteSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = get_user_model()
        fields = ['id', 'email', 'username','first_name','last_name','profile_image']
        read_only_fields = ['id', 'email', 'username']
        extra_kwargs = {'profile_image': {'required': False}}

    def update(self, instance, validated_data):
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        
        if 'profile_image' in validated_data:
            instance.profile_image = validated_data['profile_image']
        
        instance.save()
        return instance