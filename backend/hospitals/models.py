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
    hospital = models.ForeignKey(User, on_delete=models.CASCADE, limit_choices_to={'user_type': 'citizen'})
    date_donation = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"{self.blood_type} - {self.quantity_ml}ml - {self.date_donation} "
class BloodHistory(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    blood_type = models.CharField(max_length=10, default='Unknown')  # Ajout de la valeur par défaut
    change_type = models.CharField(max_length=10, choices=[('ADD', 'Add'), ('UPDATE', 'Update')])
    change_quantity = models.IntegerField()
    new_quantity = models.IntegerField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f" {self.blood_type} - {self.change_type} - {self.timestamp}"