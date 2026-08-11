from celery import shared_task
from django.core.mail import send_mail


@shared_task(bind=True,autoretry_for=(Exception,),retry_backoff=True,retry_backoff_max=60,max_retries=5,)
def send_password_reset_email(self,subject,message,from_email,recipient_list):

    print("EMAIL TASK: Trying to send email...", flush=True)

    print("EMAIL: Sending password reset email...",flush=True)

    send_mail(subject,message,from_email,recipient_list)

    print("EMAIL TASK: Email sent successfully", flush=True)

    return "Password reset email sent"