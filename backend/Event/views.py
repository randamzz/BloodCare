from django.http import Http404 
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Event
from .serializers import EventSerializer
from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from django.core.mail import send_mail
from .models import Event


@api_view(['POST'])
def ajouter_event(request):
    if request.method == 'POST':
        # Extract data from the request
        eventname = request.data.get('eventname')
        location = request.data.get('location')
        association_or_hospital = request.data.get('association_or_hospital')
        date = request.data.get('date')
        hour = request.data.get('hour')

        # Combine date and hour into a single field
        date_and_hour = f'{date} {hour}'

        # Create a dictionary with all extracted data
        data = {
            'eventname': eventname,
            'location': location,
            'association_or_hospital': association_or_hospital,
            'date_and_hour': date_and_hour,
        }

        # Create an instance of EventSerializer with the combined data
        serializer = EventSerializer(data=data)

        # Validate the serializer
        if serializer.is_valid():
            # Save the serialized data
            serializer.save()
            # Return success response with serialized data and 201 status code
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        # Print serializer errors for debugging
        print("Serializer errors:", serializer.errors)
        # Return error response with serializer errors and 400 status code
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # Return error response if the request method is not POST
    return Response({'error': 'Method Not Allowed'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

@api_view(['GET'])
def liste_events(request):
    events = Event.objects.all()
    serializer = EventSerializer(events, many=True)
    return Response(serializer.data)

@api_view(['GET'])  # Specify the HTTP method this view accepts
def event_details(request, eventId):
    try:
        # Get the event object based on the eventId
        event = Event.objects.get(id=eventId)
        # Serialize the event object
        serializer = EventSerializer(event)
        return Response(serializer.data)
    except Event.DoesNotExist:
        # If event with given ID does not exist, return 404 error
        raise Http404("Event does not exist")
    
@api_view(['POST'])
def generate_ticket(request, event_id):
    print(f"Received request data: {request.data}")  # Debug statement

    # Vérifiez que 'email' est présent dans les données de la requête
    if 'email' not in request.data:
        return Response({'error': 'Email field is missing.'}, status=400)

    try:
        event = Event.objects.get(id=event_id)
        if not event.ticket_generated:
            event.participants += 1
            # event.ticket_generated = True
            event.save()

            #  email content
            ticket_message = (
                f'Dear Participant,\n\n'
                f'Welcome to the {event.eventname} event on {event.date_and_hour.strftime("%B %d, %Y")} at {event.date_and_hour.strftime("%I:%M %p")}! '
                f'We sincerely thank you for your participation. Your ticket is confirmed.\n\n'
                f'Please bring this email or your ID to the event as proof of registration.\n\n'
                f'Warm regards,\n\n'
                f'Blood-Care Team'
            )

            # Send ticket email
            send_mail(
                f'Ticket for {event.eventname}',
                ticket_message,
                'bloodcare.website@gmail.com',  # Sender's email address
                [request.data['email']], 
                fail_silently=False,
            )

            return Response({'message': 'Ticket generated and sent to your email.'}, status=200)
        else:
            return Response({'error': 'Ticket already generated for this event.'}, status=400)
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