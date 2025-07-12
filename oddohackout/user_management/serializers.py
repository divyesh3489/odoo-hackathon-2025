from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import authenticate
from django.contrib.auth import get_user_model
from utils.constatnt import AvailabilityConstants

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
    availability = serializers.ListField(
        child=serializers.CharField(),
        required=False,
        allow_empty=True,
        help_text="Select multiple availability options"
    )
    
    class Meta:
        model = get_user_model()
        fields = ['id','email','username','first_name','last_name','profile_image','password', 'availability']
        extra_kwargs = {'password': {'write_only': True, 'min_length': 5}}

    def validate_availability(self, value):
        """Validate that availability contains only valid choices"""
        if value:
            valid_choices = [
                AvailabilityConstants.WEEKDAYS,
                AvailabilityConstants.WEEKENDS,
                AvailabilityConstants.EVEINGS,
                AvailabilityConstants.MORNINGS,
                AvailabilityConstants.AFTERNOONS,
                AvailabilityConstants.NIGHTS,
                AvailabilityConstants.MONDAYS,
                AvailabilityConstants.TUESDAYS,
                AvailabilityConstants.WEDNESDAYS,
                AvailabilityConstants.THURSDAYS,
                AvailabilityConstants.FRIDAYS,
                AvailabilityConstants.SATURDAYS,
                AvailabilityConstants.SUNDAYS,
            ]
            
            for item in value:
                if item not in valid_choices:
                    raise serializers.ValidationError(f"'{item}' is not a valid availability choice")
                    
            # Remove duplicates while preserving order
            unique_values = []
            for item in value:
                if item not in unique_values:
                    unique_values.append(item)
            return unique_values
        return value

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