from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .models import Blood, BloodHistory
from .serializers import BloodSerializer, BloodHistorySerializer
from django.http import JsonResponse
from django.db.models import Sum

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def blood_totals(request):
    hospital = request.user
    blood_totals = (
        Blood.objects
        .filter(hospital=hospital)
        .values('blood_type')
        .annotate(total_quantity_ml=Sum('quantity_ml'))
        .order_by('blood_type')
    )
    return JsonResponse(list(blood_totals), safe=False)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_blood_stock(request):
    serializer = BloodSerializer(data=request.data)
    if serializer.is_valid():
        blood_stock = serializer.save(hospital=request.user)
        BloodHistory.objects.create(
            blood=blood_stock,
            action='add',
            quantity_change=blood_stock.quantity_ml,
            user=request.user
        )
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

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
    
    original_quantity = blood_stock.quantity_ml
    blood_stock.quantity_ml += quantity_change

    if blood_stock.quantity_ml < 0:
        return Response({"error": "Quantity cannot be negative"}, status=status.HTTP_400_BAD_REQUEST)

    blood_stock.save()

    # Determine action (increase or decrease)
    if quantity_change > 0:
        action = 'increase'
    elif quantity_change < 0:
        action = 'decrease'
    else:
        action = 'unknown'

    # Save history
    BloodHistory.objects.create(
        blood=blood_stock,
        action=action,
        quantity_change=quantity_change,
        user=request.user
    )

    serializer = BloodSerializer(blood_stock)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_blood_history(request):
    history_objects = BloodHistory.objects.filter(user=request.user).order_by('-timestamp')
    serializer = BloodHistorySerializer(history_objects, many=True)
    return Response(serializer.data)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def clear_blood_history(request):
    try:
        # Assuming you want to clear all entries related to the logged-in hospital user
        BloodHistory.objects.filter(user=request.user).delete()
        return Response({"message": "Blood history cleared successfully"}, status=status.HTTP_204_NO_CONTENT)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_blood_stock(request):
    blood_stock_objects = Blood.objects.filter(hospital=request.user)
    serializer = BloodSerializer(blood_stock_objects, many=True)
    return Response(serializer.data)





