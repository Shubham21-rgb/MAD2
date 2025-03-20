from celery import shared_task
import time

@shared_task(ignore_result=False,name="download_csv_report")
def csv_report():
    transactions = ServiceRequest.query.filter_by(status="Closed") # admin
    csv_file_name = f"closed_{datetime.datetime.now().strftime("%f")}.csv" #transaction_123456.csv
    with open(f'static/{csv_file_name}', 'w', newline = "") as csvfile:
    # csvfile = open(f'static/{csv_file_name}', 'w', newline = "")
        sr_no = 1
        trans_csv = csv.writer(csvfile, delimiter = ',')
        trans_csv.writerow(['Sr No.','Unique id', 'Customer Name', 'Type', 'Created at', 'Delivery Date', 'Source', 'Destination', 'Date_of_Request', 'Date_of_completion', 'Amount', 'Service id'])
        for t in transactions:
            this_trans = [sr_no, t.id,t.services.username, t.Date_of_Request, t.Date_of_completion, t.amount, t.prof_id]
            trans_csv.writerow(this_trans)
            sr_no += 1

    return csv_file_name


@shared_task(ignore_result=False,name="monthly_report")
def monthly_report():
    return"Monthly reports sent"

@shared_task(ignore_result=False,name="delivery_update")
def delivery_reort():
    return"The Delivery send to user"