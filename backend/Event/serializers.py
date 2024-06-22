from rest_framework import serializers
from .models import Event

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ['id', 'eventname', 'location', 'association_or_hospital', 'date_and_hour', 'participants', 'participants_emails']
