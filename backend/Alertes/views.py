from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Alertes
from .serializers import AlertesSerializer

@api_view(['POST'])
def ajouter_alerte(request):
    serializer = AlertesSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def liste_alertes(request):
    alertes_objects = Alertes.objects.all()
    serializer = AlertesSerializer(alertes_objects, many=True)
    return Response(serializer.data)
