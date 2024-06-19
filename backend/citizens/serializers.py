from rest_framework import serializers
from .models import UserDonations

class UserDonationsSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserDonations
        fields = ['id', 'user', 'date', 'location', 'blood_type', 'volume']
        read_only_fields = ['user']
