from django.contrib import admin
from account.models import User,Doctor,DoctorPatientAppointment,Review
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

class UserModelAdmin(BaseUserAdmin):
  # The fields to be used in displaying the User model.
  # These override the definitions on the base UserModelAdmins
  # that reference specific fields on auth.User.
  list_display = ('id', 'email', 'name', 'is_patient','is_doctor','tc','is_admin')
  list_filter = ('is_admin',)
  fieldsets = (
      ('User Credentials', {'fields': ('email', 'password')}),
      ('Personal info', {'fields': ('name','is_patient','is_doctor','tc')}),
      ('Permissions', {'fields': ('is_admin',)}),
  )
  # add_fieldsets is not a standard ModelAdmin attribute. UserModelAdmin
  # overrides get_fieldsets to use this attribute when creating a user.
  add_fieldsets = (
      (None, {
          'classes': ('wide',),
          'fields': ('email', 'name', 'is_patient','is_doctor','tc', 'password1', 'password2'),
      }),
  )
  search_fields = ('email',)
  ordering = ('email', 'id')
  filter_horizontal = ()


# Now register the new UserModelAdmin...
admin.site.register(User, UserModelAdmin)

@admin.register(Doctor)
class DoctorAdmin(admin.ModelAdmin):
    list_display=('user','doctor_image','study','specialist','experience','fee','avail_time_start','avail_time_end','about')


@admin.register(DoctorPatientAppointment)
class DoctorPatientAppointmentAdmin(admin.ModelAdmin):
    list_display=('id','doctor_name','doctor_email','patient_name','patient_email','problem','fees','appointment_date','appointment_time')

@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display=('id','doctor_name',"doctor_email","patient_name","patient_email","rating","review")



