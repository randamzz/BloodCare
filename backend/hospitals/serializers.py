from rest_framework import serializers
from .models import Blood, BloodHistory

class BloodSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blood
        fields = ['id', 'blood_type', 'quantity_ml', 'date_donation', 'hospital']
        read_only_fields = ['id', 'date_donation', 'hospital']
    def update(self, instance, validated_data):
        instance.blood_type = validated_data.get('blood_type', instance.blood_type)
        instance.quantity = validated_data.get('quantity', instance.quantity)
        instance.save()
        return instance
class BloodHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = BloodHistory
        fields = ['blood_type', 'change_type', 'change_quantity', 'new_quantity', 'timestamp']