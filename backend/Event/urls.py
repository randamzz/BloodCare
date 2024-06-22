from django.urls import path
from . import views

urlpatterns = [
    path('liste_events/', views.liste_events, name='liste_events'),
    path('ajouter_event/', views.ajouter_event, name='ajouter_event'),
    path('events/<int:eventId>/', views.event_details, name='event_details'),  
    path('api/events/<int:event_id>/submit_email/', views.generate_ticket, name='submit_email'),
    path('event_locations/',views.event_locations,name='event_locations') ,
    path('participant/<int:event_id>/',views.get_participant_emails,name='participant') ,
    path('edit_event/<int:event_id>/', views.edit_event, name='edit_event'),
    


]
