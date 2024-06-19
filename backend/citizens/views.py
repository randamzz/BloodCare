from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import UserDonations
from .serializers import UserDonationsSerializer
from rest_framework.permissions import IsAuthenticated
from django.core.exceptions import ValidationError

class UserDonationsList(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        donations = UserDonations.objects.filter(user=request.user)
        serializer = UserDonationsSerializer(donations, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = UserDonationsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserDonationsDetail(APIView):
    permission_classes = [IsAuthenticated]

    def get_object(self, pk):
        try:
            return UserDonations.objects.get(pk=pk)
        except UserDonations.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        donation = self.get_object(pk)
        serializer = UserDonationsSerializer(donation)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        donation = self.get_object(pk)
        serializer = UserDonationsSerializer(donation, data=request.data)
        if serializer.is_valid():
            if donation.user != request.user:
                return Response({'error': 'You do not have permission to edit this donation.'}, status=status.HTTP_403_FORBIDDEN)
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        donation = self.get_object(pk)
        if donation.user != request.user:
            return Response({'error': 'You do not have permission to delete this donation.'}, status=status.HTTP_403_FORBIDDEN)
        donation.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
class AddDonation(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, format=None):
        serializer = UserDonationsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)