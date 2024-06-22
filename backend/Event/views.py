from django.http import JsonResponse,Http404 
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Event
from .serializers import EventSerializer
from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from django.core.mail import send_mail
from .models import Event
from django.utils.dateparse import parse_datetime
from datetime import datetime


@api_view(['POST'])
def ajouter_event(request):
    if request.method == 'POST':
        eventname = request.data.get('eventname')
        location = request.data.get('location')
        association_or_hospital = request.data.get('association_or_hospital')
        date = request.data.get('date')
        hour = request.data.get('hour')

        date_and_hour = f'{date} {hour}'

        data = {
            'eventname': eventname,
            'location': location,
            'association_or_hospital': association_or_hospital,
            'date_and_hour': date_and_hour,
        }

        serializer = EventSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        print("Serializer errors:", serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    return Response({'error': 'Method Not Allowed'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

@api_view(['GET'])
def liste_events(request):
    events = Event.objects.all()
    serializer = EventSerializer(events, many=True)
    return Response(serializer.data)

@api_view(['GET']) 
def event_details(request, eventId):
    try:
        event = Event.objects.get(id=eventId)
        serializer = EventSerializer(event)
        return Response(serializer.data)
    except Event.DoesNotExist:
        raise Http404("Event does not exist")

@api_view(['POST'])
def generate_ticket(request, event_id):

    if 'email' not in request.data:
        return Response({'error': 'Email field is missing.'}, status=400)

    try:
        event = Event.objects.get(id=event_id)
        if event.participants_emails:
                event.participants_emails += f',{request.data["email"]}'
        else:
                event.participants_emails = request.data['email']
            
        event.participants += 1
        event.save()

            # Contenu de l'email
        ticket_message = (
                f'Dear Participant,\n\n'
                f'Welcome to the {event.eventname} event on {event.date_and_hour.strftime("%B %d, %Y")} at {event.date_and_hour.strftime("%I:%M %p")}! '
                f'We sincerely thank you for your participation. Your ticket is confirmed.\n\n'
                f'Please bring this email or your ID to the event as proof of registration.\n\n'
                f'Warm regards,\n\n'
                f'Blood-Care Team'
            )

            # Envoyer l'email du ticket
        send_mail(
                f'Ticket for {event.eventname}',
                ticket_message,
                'bloodcare.website@gmail.com',  # Adresse email de l'expéditeur
                [request.data['email']], 
                fail_silently=False,
            )

        return Response({'message': 'Ticket generated and sent to your email.'}, status=200)
      
    except Event.DoesNotExist:
        return Response({'error': 'Event not found.'}, status=404)
    except Exception as e:
        print(f"Error: {e}") 
        return Response({'error': str(e)}, status=500)
    
#get event location pour aff dans map 
@api_view(['GET'])
def event_locations(request):
    events = Event.objects.all()
    locations = [event.location for event in events]
    return Response(locations)


def get_participant_emails(event_id):
    try:
        event = Event.objects.get(id=event_id)

        if event.participants_emails:
            participant_emails = event.participants_emails.split(',')
        else:
            participant_emails = []

        return participant_emails

    except Event.DoesNotExist:
        return [] 
    except Exception as e:
        return {'error': str(e)}

@api_view(['PUT'])
def edit_event(request, event_id):
    try:
        event = Event.objects.get(id=event_id)
    except Event.DoesNotExist:
        raise Http404("Event not found.")

    if request.method == 'PUT':
        # Extract data de request
        location = request.data.get('location', event.location)
        date_str = request.data.get('date', event.date_and_hour.strftime('%Y-%m-%d'))
        hour_str = request.data.get('hour', event.date_and_hour.strftime('%H:%M:%S'))

        try:
            date_time_str = f'{date_str}T{hour_str}'
            date_and_hour = datetime.fromisoformat(date_time_str)
        except ValueError:
            return Response({'error': 'Invalid date or time format.'}, status=status.HTTP_400_BAD_REQUEST)

        # Update 
        event.location = location
        event.date_and_hour = date_and_hour
        event.save()

        #email message
        message = (
            f'Dear Participant,\n\n'
            f'The event {event.eventname} organized by {event.association_or_hospital} has been updated.\n\n'
            f'Event Details:\n'
            f'- Date and Time: {event.date_and_hour.strftime("%d %B %Y at %H:%M")}\n\n'
            f'Thank you for your participation and continuous support.\n\n'
            f'Regards,\n\n'
            f'Blood-Care Team'
        )

        # Get participant emails & send emails
        participant_emails = get_participant_emails(event_id)
        if isinstance(participant_emails, list):
            for email in participant_emails:
                send_mail(
                    f'{event.eventname} has been updated',
                    message,
                    'bloodcare.website@gmail.com',
                    [email],
                    fail_silently=False,
                )
        else:
            return Response(participant_emails, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        serializer = EventSerializer(event)
        return Response(serializer.data, status=status.HTTP_200_OK)

    return Response({'error': 'Method not allowed'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)