from celery import shared_task
from .models import ServiceRequest,User
import time
import datetime
import csv
from .utils import format_report
from .mail import send_email

@shared_task(ignore_result=False,name="download_csv_report")
def csv_report():
    transactions = ServiceRequest.query.filter_by(status="Closed") # admin
    csv_file_name = f"closed_{datetime.datetime.now().strftime("%f")}.csv" #transaction_123456.csv
    with open(f'static/{csv_file_name}', 'w', newline = "") as csvfile:
    # csvfile = open(f'static/{csv_file_name}', 'w', newline = "")
        sr_no = 1
        trans_csv = csv.writer(csvfile, delimiter = ',')
        trans_csv.writerow(['Sr No.','Unique id', 'Customer Name', 'Date_of_Request', 'Date_of_completion', 'Amount', 'Service id'])
        for t in transactions:
            this_trans = [sr_no, t.id,t.bearer.username, t.Date_of_Request, t.Date_of_completion, t.amount, t.service_id]
            trans_csv.writerow(this_trans)
            sr_no += 1

    return csv_file_name


@shared_task(ignore_results = False, name = "monthly_report")
def monthly_report():
    users = User.query.all()
    for user in users:
        user_data = {}
        if 'user' in user.roles:
            user_data['username'] = user.username
            user_data['email'] = user.email
            user_trans = []
            for transaction in user.service:
                this_trans = {}
                this_trans["id"] = transaction.id
                this_trans["service_id"] = transaction.service_id
                this_trans["Date_of_Request"] = transaction.Date_of_Request
                this_trans["Date_of_completion"] = transaction.Date_of_completion
                this_trans["status"] = transaction.status
                this_trans["amount"] = transaction.amount
                this_trans["user"] = transaction.bearer.username #/current_user.id 
                user_trans.append(this_trans)
            user_data['transactions'] = user_trans
            message = format_report('templates/mail_details.html', user_data)
            send_email(user.email, subject = "Monthly Services Report - UNITY SERVICES", message = message)
    return "Monthly reports sent"


@shared_task(ignore_result=False,name="delivery_update")
def delivery_reort():
    return"The Delivery send to user"