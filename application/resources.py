from flask_restful import Api, Resource, reqparse
from .models import *
from flask_security import auth_required,roles_required,roles_accepted,current_user
import datetime
api=Api()

def roles_list(roles):
    role_list=[]
    for role in roles:
        role_list.append(role.name)
    return role_list

parser=reqparse.RequestParser()
class TransApi(Resource):
    @auth_required('token')
    @roles_accepted('user','admin','prof')
    def get(self):
        transactions=[]
        trans_json=[]
        if "admin" in roles_list(current_user.roles):
            transactions=ServiceRequest.query.all()
        elif "prof" in roles_list(current_user.roles):
            service_request = Service.query.filter_by(prof_id=current_user.id).first()
            for i in service_request.request:
                continue
            transactions=ServiceRequest.query.filter_by(service_id=i.id)

        else:
            transactions= current_user.service
        for transaction in transactions:
            this_trans={}
            this_trans["id"]=transaction.id
            this_trans["customer_id"]=transaction.customer_id
            this_trans["Date_of_Request"]=transaction.Date_of_Request
            this_trans["amount"]=transaction.amount  
            this_trans["Date_of_completion"]=transaction.Date_of_completion
            this_trans["status"]=transaction.status
            this_trans["service_id"]=transaction.service_id
            trans_json.append(this_trans)
        if trans_json:
            return trans_json
        return{
            "message":"No transactions"
        },400
    @auth_required('token')
    @roles_accepted('prof','user','admin')
    def post(self):
        if 'prof' in roles_list(current_user.roles):
            parser.add_argument('id', type=str, required=True)
            parser.add_argument('service_name', type=str, required=True, help='Name cannot be blank')
            parser.add_argument('Time_required', type=str, required=True, help='Customer-id cannot be blank')
            parser.add_argument('Description', type=str, required=True)
            parser.add_argument('amount', type=str, required=True)
            args= parser.parse_args()
            try:
                Service_create=Service(id=args['id'],
                                    Service_name=args['service_name'],
                                    Time_required=args['Time_required'],
                                    Description=args['Description'],
                                    amount=args['amount'],
                                    prof_id=current_user.id
                                    )
                db.session.add(Service_create)
                db.session.commit()
                return{
                    "message":"Service Created Succesfully Generated"
                } 
            except:
                return{
                "message":"Service feilds are missiing"
                }
        elif 'user' in roles_list(current_user.roles):
            parser.add_argument('id', type=str, required=True)
            parser.add_argument('amt', type=str, required=True)
            parser.add_argument('status', type=str, required=True)
            parser.add_argument('service_id', type=str, required=True)
            parser.add_argument('Date_of_completion', type=str, required=True)
            args= parser.parse_args()
            try:
                servreq=ServiceRequest(    id=args['id'],
                                        customer_id=current_user.id,
                                        Date_of_Request=datetime.datetime.now(),
                                        Date_of_completion="to_be_updated",
                                        amount=args['amt'],
                                        status="pending",
                                        service_id=args['service_id'])
                db.session.add(servreq)
                db.session.commit()
                return{
                "message":"Request Created Succesfully Generated"
                } 
                
            except:
                return{
                    "message":"Cannot add Service Already exists"
                }
        else:
            parser.add_argument('id', type=str, required=True)
            parser.add_argument('service_name', type=str, required=True, help='Name cannot be blank')
            parser.add_argument('Time_required', type=str, required=True, help='Customer-id cannot be blank')
            parser.add_argument('Description', type=str, required=True)
            parser.add_argument('amount', type=str, required=True)
            parser.add_argument('prof_id', type=str, required=True)
            args= parser.parse_args()
            try:
                Service_create=Service(id=args['id'],
                                    Service_name=args['service_name'],
                                    Time_required=args['Time_required'],
                                    Description=args['Description'],
                                    amount=args['amount'],
                                    prof_id=args['prof_id']
                                    )
                db.session.add(Service_create)
                db.session.commit()
                return{
                    "message":"Service Created Succesfully Generated"
                } 
            except:
                return{
                "message":"Service feilds are missiing"
                }
    @auth_required('token')
    @roles_accepted('prof','admin','user')
    def put(self,trans_id):
        if "prof" in roles_list(current_user.roles):
            try:
                parser.add_argument('amount', type=str, required=True)
                parser.add_argument('Date_of_completion', type=str, required=True)
                parser.add_argument('amount', type=str, required=True)
                parser.add_argument('service_name', type=str, required=True)
                parser.add_argument('time', type=str, required=True)
                parser.add_argument('description', type=str, required=True)
                service_request = Service.query.filter_by(prof_id=current_user.id).all()
                args= parser.parse_args()
        
                for i in service_request[0].request:
                    continue
                strans=Service.query.filter_by(id=i.service_id).first()
                trans=ServiceRequest.query.filter_by(customer_id=trans_id).first()
                strans.amount=args['amount']
                strans.Service_name=args['service_name']
                strans.Time_required=args['time']
                strans.Description=args['description']
                trans.Date_of_completion=args['Date_of_completion']
                trans.amount=args['amount']
                db.session.commit()
                return{
                    "message":"Updated Sucessfully"
                }
            except :
                return{
                    "message":"Cannot Update"
                },400 
        else:
            try:
                parser.add_argument('amount', type=str, required=True)
                parser.add_argument('Date_of_completion', type=str, required=True)
                parser.add_argument('amount', type=str, required=True)
                parser.add_argument('service_name', type=str, required=True)
                parser.add_argument('time', type=str, required=True)
                parser.add_argument('description', type=str, required=True)
                service_request = ServiceRequest.query.get(trans_id).first()
                args= parser.parse_args()
        
                for i in service_request.service:
                    continue
                strans=Service.query.filter_by(id=i.service_id).first()
                trans=ServiceRequest.query.filter_by(id=trans_id).first()
                strans.amount=args['amount']
                strans.Service_name=args['service_name']
                strans.Time_required=args['time']
                strans.Description=args['description']
                trans.Date_of_completion=args['Date_of_completion']
                trans.amount=args['amount']
                db.session.commit()
                return{
                    "message":"Updated Sucessfully"
                }
            except :
                return{
                    "message":"Cannot Update"
                },400 

    @auth_required('token')
    @roles_accepted('user','prof','admin')
    def delete(self,trans_id):
        if "prof" in roles_list(current_user.roles):
            t=Service.query.get(trans_id)
            if t:
                db.session.delete(t)
                db.session.commit()
                return{
                    "message":"Transaction deleted Succesfully"
                }
            else:
                return{
                    "message":"Deletion Failed"
                },400
        elif "user" in roles_list(current_user.roles):
            t=ServiceRequest.query.get(trans_id)


    
api.add_resource(TransApi,'/api/get','/api/create','/api/update/<int:trans_id>','/api/delete/<int:trans_id>')
