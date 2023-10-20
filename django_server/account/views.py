from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from account.serializers import SendPasswordResetEmailSerializer, UserChangePasswordSerializer, UserLoginSerializer, UserPasswordResetSerializer,     DoctorProfileSerializer, DoctorPatientAppointmentSerializer,    UserProfileSerializer, UserRegistrationSerializer,ReviewSerializer,DoctorProfilePostSerializer
from django.contrib.auth import authenticate
from account.renderers import UserRenderer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from account.models import User,Doctor,DoctorPatientAppointment,Review
from django.db.models import Q



# Generate Token Manually
def get_tokens_for_user(user):
  refresh = RefreshToken.for_user(user)
  return {
      'refresh': str(refresh),
      'access': str(refresh.access_token),
  }

class UserRegistrationView(APIView):
  renderer_classes = [UserRenderer]
  def post(self, request, format=None):
    serializer = UserRegistrationSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    user = serializer.save()
    token = get_tokens_for_user(user)
    is_patient=user.is_patient
    is_doctor=user.is_doctor
    return Response({'token':token, 'msg':'Registration Successful','is_patient':is_patient,'is_doctor':is_doctor}, status=status.HTTP_201_CREATED)

class UserLoginView(APIView):
  renderer_classes = [UserRenderer]
  def post(self, request, format=None):
    serializer = UserLoginSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    email = serializer.data.get('email')
    password = serializer.data.get('password')
    user = authenticate(email=email, password=password)
    if user is not None:
      token = get_tokens_for_user(user)
      is_patient=user.is_patient
      is_doctor=user.is_doctor
      return Response({'token':token, 'msg':'Login Success','is_patient':is_patient,'is_doctor':is_doctor}, status=status.HTTP_200_OK)
    else:
      return Response({'errors':{'non_field_errors':['Email or Password is not Valid']}}, status=status.HTTP_404_NOT_FOUND)


class DoctorProfileView(APIView):
  renderer_classes = [UserRenderer]
  permission_classes = [IsAuthenticated]

  def get(self,request,pk=None,format=None):
    id=pk
    if id is not None:
      doctor=Doctor.objects.select_related('user').get(user=id)
      serializer=DoctorProfileSerializer(doctor)
      return Response({"data":serializer.data,"msg":"Successful"}, status=status.HTTP_201_CREATED)

    doctor=Doctor.objects.select_related('user').all()
    serializer=DoctorProfileSerializer(doctor,many=True)
    return Response({'data':serializer.data,'msg':'Successful'}, status=status.HTTP_201_CREATED)

  def post(self, request, format=None):
    try:
      d=Doctor.objects.get(user=request.user)
      d.delete()
      serializer = DoctorProfilePostSerializer(data=request.data)
      serializer.is_valid(raise_exception=True)
      serializer.save()
      return Response({'data':serializer.data,'msg':'Data Update Successful'}, status=status.HTTP_201_CREATED)

    except:
      serializer = DoctorProfilePostSerializer(data=request.data)
      serializer.is_valid(raise_exception=True)
      serializer.save()
      return Response({'data':serializer.data,'msg':'Data Added Successful'}, status=status.HTTP_201_CREATED)


class DoctorProfileSearchView(APIView):
  renderer_classes = [UserRenderer]
  permission_classes = [IsAuthenticated]

  def get(self,request,search_key,format=None):
    if search_key:
      doctor=Doctor.objects.select_related('user').filter(Q(user__name__icontains=search_key) | Q(specialist__icontains=search_key)).distinct()
      serializer=DoctorProfileSerializer(doctor,many=True)
      return Response({"data":serializer.data,"msg":"Successful"}, status=status.HTTP_201_CREATED)

    doctor=Doctor.objects.select_related('user').all()
    serializer=DoctorProfileSerializer(doctor,many=True)
    return Response({'data':serializer.data,'msg':'Successful'}, status=status.HTTP_201_CREATED)


class UserProfileView(APIView):
  renderer_classes = [UserRenderer]
  permission_classes = [IsAuthenticated]
  def get(self, request, format=None):
    serializer = UserProfileSerializer(request.user)
    # print('serializer',serializer.data)
    return Response(serializer.data, status=status.HTTP_200_OK)



class DoctorPatientAppointmentView(APIView):
  renderer_classes = [UserRenderer]
  permission_classes = [IsAuthenticated]
  def get(self,request,pk,format=None):
    id=pk
    user=User.objects.get(pk=id)
    if user.is_patient:
      data=DoctorPatientAppointment.objects.filter(patient_email=user).order_by('-appointment_date')
    else:
      data=DoctorPatientAppointment.objects.filter(doctor_email=user).order_by('-appointment_date')
    serializer=DoctorPatientAppointmentSerializer(data,many=True)
    return Response({'data':serializer.data,'msg':'Appointment Data'}, status=status.HTTP_201_CREATED)

  def post(self, request, format=None):
    serializer = DoctorPatientAppointmentSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    serializer.save()
    return Response({'data':serializer.data,'msg':'Data Added Successful'}, status=status.HTTP_201_CREATED)



class ReviewView(APIView):
  renderer_classes = [UserRenderer]
  permission_classes = [IsAuthenticated]
  def get(self, request, pk,format=None):
    id=pk
    user=User.objects.get(pk=id)
    if user.is_doctor:
      data=Review.objects.filter(doctor_email=user)
      if data:
        serializer = ReviewSerializer(data,many=True)
        return Response({'data':serializer.data,}, status=status.HTTP_201_CREATED)
      return Response({'errors':{'non_field_errors':['Your have no review yet']}}, status=status.HTTP_404_NOT_FOUND)
    return Response({'errors':{'non_field_errors':['Your are patient']}}, status=status.HTTP_404_NOT_FOUND)


  def post(self, request, format=None):
    serializer = ReviewSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)

    doctor_email=serializer.validated_data['doctor_email']
    doctor_name=serializer.validated_data['doctor_name']
    patient_name=serializer.validated_data['patient_name']
    rating=serializer.validated_data['rating']
    review=serializer.validated_data['review']

    avail=DoctorPatientAppointment.objects.filter(doctor_email=doctor_email,patient_email=request.user).first()
    if avail:
      obj, created = Review.objects.update_or_create(
      doctor_email=doctor_email,patient_email=request.user, 
      defaults={"doctor_name":doctor_name,"patient_name": patient_name,"rating": rating,"review": review}
  )

      return Response({'data':serializer.data,'msg':'Review Added Successful'}, status=status.HTTP_201_CREATED)
    return Response({'errors':{'non_field_errors':['Your have not taken appointment to doctor']}}, status=status.HTTP_404_NOT_FOUND)





class UserChangePasswordView(APIView):
  renderer_classes = [UserRenderer]
  permission_classes = [IsAuthenticated]
  def post(self, request, format=None):
    serializer = UserChangePasswordSerializer(data=request.data, context={'user':request.user})
    serializer.is_valid(raise_exception=True)
    return Response({'msg':'Password Changed Successfully'}, status=status.HTTP_200_OK)

class SendPasswordResetEmailView(APIView):
  renderer_classes = [UserRenderer]
  def post(self, request, format=None):
    serializer = SendPasswordResetEmailSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    return Response({'msg':'Password Reset link send. Please check your Email'}, status=status.HTTP_200_OK)

class UserPasswordResetView(APIView):
  renderer_classes = [UserRenderer]
  def post(self, request, uid, token, format=None):
    serializer = UserPasswordResetSerializer(data=request.data, context={'uid':uid, 'token':token})
    serializer.is_valid(raise_exception=True)
    return Response({'msg':'Password Reset Successfully'}, status=status.HTTP_200_OK)


