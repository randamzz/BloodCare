from django.db import models
from authentication.models import User

class Blood(models.Model):
    blood_type_choices = (
        ('A+', 'A+'),
        ('A-', 'A-'),
        ('B+', 'B+'),
        ('B-', 'B-'),
        ('AB+', 'AB+'),
        ('AB-', 'AB-'),
        ('O+', 'O+'),
        ('O-', 'O-'),
    )
    id = models.AutoField(primary_key=True)
    blood_type = models.CharField(max_length=3, choices=blood_type_choices)
    quantity_ml = models.PositiveIntegerField()
    hospital = models.ForeignKey(User, on_delete=models.CASCADE, limit_choices_to={'user_type': 'hospital'})
    date_donation = models.DateField(auto_now_add=True)

    def _str_(self):
        return f"{self.blood_type} - {self.quantity_ml}ml - {self.date_donation} "

class BloodHistory(models.Model):
    ACTION_CHOICES = (
        ('add', 'Add'),
        ('increase', 'Increase'),
        ('decrease', 'Decrease'),
    )

    blood = models.ForeignKey(Blood, on_delete=models.CASCADE)
    action = models.CharField(max_length=10, choices=ACTION_CHOICES)
    quantity_change = models.IntegerField()
    timestamp = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def _str_(self):
        return f"{self.blood.blood_type} - {self.action} - {self.timestamp}"