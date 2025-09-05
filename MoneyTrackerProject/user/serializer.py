from rest_framework import serializers
from .models import User

class UserSerializer(serializers.Serializer):
    email = serializers.CharField()
    firstname = serializers.CharField()
    lastname = serializers.CharField()
    password = serializers.CharField()

    def validate_email(self,value):
        checkuser = User.objects.filter(email=value).values()
        if len(checkuser) > 0:
            raise serializers.ValidationError("Email already exist...")
        else:
            return value

    def validate_password(self,value):
        if self.context.get("confirmpassword") == value:
            return value
        else:
            raise serializers.ValidationError("Password and Confirmpassword are not matched...")

class LoginSerializer(serializers.Serializer):
    email = serializers.CharField()
    password = serializers.CharField()