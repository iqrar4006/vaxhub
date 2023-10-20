from django.urls import path
from account.views import SendPasswordResetEmailView, UserChangePasswordView, UserLoginView, UserProfileView, UserRegistrationView, UserPasswordResetView,    DoctorProfileView,DoctorPatientAppointmentView,ReviewView,DoctorProfileSearchView

urlpatterns = [
    path('register/', UserRegistrationView.as_view(), name='register'),
    path('login/', UserLoginView.as_view(), name='login'),

    
    path('doctor-data/',DoctorProfileView.as_view(),name='doctor-data'),
    path('doctor-data/<int:pk>/',DoctorProfileView.as_view(),name='doctor-data'),
    path('doctor-data-search/<search_key>/',DoctorProfileSearchView.as_view(),name='doctor-data-search'),
    path('appointment/',DoctorPatientAppointmentView.as_view(),name='appointment'),
    path('appointment/<int:pk>/',DoctorPatientAppointmentView.as_view(),name='appointment'),
    path('review/<int:pk>/',ReviewView.as_view(),name='review'),
    path('review/',ReviewView.as_view(),name='review'),


    path('profile/', UserProfileView.as_view(), name='profile'),
    path('changepassword/', UserChangePasswordView.as_view(), name='changepassword'),
    path('send-reset-password-email/', SendPasswordResetEmailView.as_view(), name='send-reset-password-email'),
    path('reset-password/<uid>/<token>/', UserPasswordResetView.as_view(), name='reset-password'),

] 