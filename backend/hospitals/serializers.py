from rest_framework import serializers
from .models import Blood, BloodHistory

class BloodSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blood
        fields = ['id', 'blood_type', 'quantity_ml', 'date_donation', 'hospital']
        read_only_fields = ['id', 'date_donation', 'hospital']
        
    def update(self, instance, validated_data):
        instance.blood_type = validated_data.get('blood_type', instance.blood_type)
        instance.quantity_ml = validated_data.get('quantity_ml', instance.quantity_ml)
        instance.save()
        return instance

class BloodHistorySerializer(serializers.ModelSerializer):
    blood_type = serializers.CharField(source='blood.blood_type')
    action = serializers.SerializerMethodField()

    class Meta:
        model = BloodHistory
        fields = ['blood_type', 'action', 'quantity_change', 'timestamp']

    def get_action(self, obj):
        if obj.action == 'add':
            return 'Add'
        elif obj.quantity_change > 0:
            return 'Increase'
        elif obj.quantity_change < 0:
            return 'Decrease'
        else:
            return 'Unknown'
