from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .models import Blood, BloodHistory
from .serializers import BloodSerializer, BloodHistorySerializer

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_blood_stock(request):
    serializer = BloodSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(hospital=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_blood_stock(request):
    blood_stock_objects = Blood.objects.filter(hospital=request.user)
    serializer = BloodSerializer(blood_stock_objects, many=True)
    return Response(serializer.data)
@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def update_blood_stock(request, pk):
    try:
        blood_stock = Blood.objects.get(pk=pk, hospital=request.user)
    except Blood.DoesNotExist:
        return Response({"error": "Blood stock not found"}, status=status.HTTP_404_NOT_FOUND)

    quantity_change = request.data.get('quantity_change')
    if quantity_change is None:
        return Response({"error": "quantity_change is required"}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        quantity_change = int(quantity_change)
    except ValueError:
        return Response({"error": "quantity_change must be an integer"}, status=status.HTTP_400_BAD_REQUEST)
    
    blood_stock.quantity_ml += quantity_change
    if blood_stock.quantity_ml < 0:
        return Response({"error": "Quantity cannot be negative"}, status=status.HTTP_400_BAD_REQUEST)

    blood_stock.save()
    serializer = BloodSerializer(blood_stock)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_blood_history(request):
    user = request.user
    history = BloodHistory.objects.filter(user=user).order_by('-timestamp')
    serializer = BloodHistorySerializer(history, many=True)
    return Response(serializer.data)
