from django.db import models
from django.contrib.auth.models import BaseUserManager,AbstractBaseUser

#  Custom User Manager
class UserManager(BaseUserManager):
  def create_user(self, email, name, is_patient,is_doctor,tc, password=None, password2=None):
      """
      Creates and saves a User with the given email, name, tc and password.
      """
      if not email:
          raise ValueError('User must have an email address')

      user = self.model(
          email=self.normalize_email(email),
          name=name,
          is_patient=is_patient,
          is_doctor=is_doctor,
          tc=tc
      )

      user.set_password(password)
      user.save(using=self._db)
      return user

  def create_superuser(self, email, name,is_patient,is_doctor, tc, password=None):
      """
      Creates and saves a superuser with the given email, name, tc and password.
      """
      user = self.create_user(
          email,
          password=password,
          name=name,
          is_patient=is_patient,
          is_doctor=is_doctor,
          tc=tc,
      )
      user.is_admin = True
      user.save(using=self._db)
      return user

#  Custom User Model
class User(AbstractBaseUser):
  email = models.EmailField(
      verbose_name='Email',
      max_length=255,
      unique=True,
  )
  name = models.CharField(max_length=200)
  is_patient=models.BooleanField()
  is_doctor=models.BooleanField()
  tc = models.BooleanField()
  is_active = models.BooleanField(default=True)
  is_admin = models.BooleanField(default=False)
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)

  objects = UserManager()

  USERNAME_FIELD = 'email'
  REQUIRED_FIELDS = ['name', 'is_patient','is_doctor','tc']

  def __str__(self):
      return self.email

  def has_perm(self, perm, obj=None):
      "Does the user have a specific permission?"
      # Simplest possible answer: Yes, always
      return self.is_admin

  def has_module_perms(self, app_label):
      "Does the user have permissions to view the app `app_label`?"
      # Simplest possible answer: Yes, always
      return True

  @property
  def is_staff(self):
      "Is the user a member of staff?"
      # Simplest possible answer: All admins are staff
      return self.is_admin


class Doctor(models.Model):
    user=models.OneToOneField(User, on_delete=models.CASCADE,primary_key=True,limit_choices_to={'is_doctor':True})
    doctor_image=models.ImageField(upload_to='doctorimg')
    study=models.CharField(max_length=50)
    specialist=models.CharField(max_length=50)
    experience=models.IntegerField()
    fee=models.IntegerField()
    avail_time_start=models.TimeField(auto_now=False, auto_now_add=False)
    avail_time_end=models.TimeField(auto_now=False, auto_now_add=False)
    about=models.TextField()

    def __str__(self):
      return str(self.user)





class DoctorPatientAppointment(models.Model):
    doctor_name=models.CharField(max_length=50)
    doctor_email=models.EmailField(max_length = 50)
    patient_name=models.CharField(max_length=50)
    patient_email=models.EmailField(max_length = 50)
    problem=models.CharField(max_length=50)
    fees=models.IntegerField()
    appointment_date=models.DateField()
    appointment_time=models.TimeField(auto_now=False, auto_now_add=False)

    def __str__(self):
        return str(self.patient_email)


class Review(models.Model):
    doctor_name=models.CharField(max_length=50)
    doctor_email=models.EmailField(max_length = 50)
    patient_name=models.CharField(max_length=50)
    patient_email=models.EmailField(max_length = 50)
    rating=models.IntegerField()
    review=models.TextField()
    
    def __str__(self):
        return str(self.doctor_email)

    






