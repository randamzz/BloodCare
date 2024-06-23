
from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id',  'email', 'password', 'user_type','name'] 
        extra_kwargs = {
            'password': {'write_only': True}, 
        }
        
    def create(self, validated_data):
        password = validated_data.pop("password")
        user_type = validated_data.pop("user_type")  
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.user_type = user_type  
        instance.save()
        return instance
