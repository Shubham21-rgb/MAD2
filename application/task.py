from celery import shared_task
import time

@shared_task(ignore_result=False,name="download_csv_report")
def csv_report():
    time.sleep(6)
    return"Initiated CSV Download"

@shared_task(ignore_result=False,name="monthly_report")
def monthly_report():
    return"Monthly reports sent"

@shared_task(ignore_result=False,name="delivery_update")
def delivery_reort():
    return"The Delivery send to user"