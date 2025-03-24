from flask_restful import Api, Resource, reqparse
from .models import *
from flask import jsonify
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
            service_request = Service.query.filter_by(prof_id=current_user.id).all()
            for i in service_request[0].request:
                #print(i.service_id)
                trans_json=[]

                transactions=ServiceRequest.query.filter_by(service_id=i.service_id)
                for transaction in transactions:
                    this_trans = {
                    "id": transaction.id,
                    "customer_id": transaction.customer_id,
                    "Date_of_Request": transaction.Date_of_Request,
                    "amount": transaction.amount,
                    "Date_of_completion": transaction.Date_of_completion,
                    "status": transaction.status,
                    "service_id": transaction.service_id
                        }
                    trans_json.append(this_trans)
            return jsonify(trans_json)

        

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
    @roles_accepted('user')
    def post(self,trans_id):
        if 'user' in roles_list(current_user.roles):
            parser.add_argument('amount', type=str, required=True)
            args= parser.parse_args()
            try:
                servreq=ServiceRequest(customer_id=current_user.id,
                                        Date_of_Request=datetime.datetime.now(),
                                        Date_of_completion="to_be_updated",
                                        amount=args['amount'],
                                        status="Pending",
                                        service_id=trans_id)
                db.session.add(servreq)
                db.session.commit()
                return{   
                "message":"Request Created Succesfully Generated"
                } 
                
            except:
                return{
                    "message":"Cannot add Service Already exists"
                }
    @auth_required('token')
    @roles_accepted('prof','admin','user')
    def put(self,trans_id):
        if "prof" in roles_list(current_user.roles):
            
            parser.add_argument('amount', type=str, required=True)
            parser.add_argument('amount', type=str, required=True)
            parser.add_argument('Service_name', type=str, required=True)
            parser.add_argument('Time_required', type=str, required=True)
            parser.add_argument('Description', type=str, required=True)
            service_request = Service.query.filter_by(prof_id=current_user.id).first()
            args= parser.parse_args()
        
            for i in service_request.request:
                strans=Service.query.filter_by(id=i.service_id).first()
                trans=ServiceRequest.query.filter_by(service_id=trans_id).filter_by(customer_id=i.customer_id).all()
                strans.amount=args['amount']
                strans.Service_name=args['Service_name']
                strans.Time_required=args['Time_required']
                strans.Description=args['Description']
                trans[0].amount=args['amount']
                db.session.commit()
            return{
                    "message":"Updated Sucessfully"
            }
        elif 'admin' in roles_list(current_user.roles):
            parser.add_argument('amount', type=str, required=True)
            parser.add_argument('amount', type=str, required=True)
            parser.add_argument('Service_name', type=str, required=True)
            parser.add_argument('Time_required', type=str, required=True)
            parser.add_argument('Description', type=str, required=True)
            service_request = Service.query.filter_by(prof_id=trans_id).first()
            args= parser.parse_args()
        
            for i in service_request.request:
                strans=Service.query.filter_by(id=i.service_id).first()
                trans=ServiceRequest.query.filter_by(service_id=i.service_id).filter_by(customer_id=i.customer_id).all()
                strans.amount=args['amount']
                strans.Service_name=args['Service_name']
                strans.Time_required=args['Time_required']
                strans.Description=args['Description']
                trans[0].amount=args['amount']
                db.session.commit()
            return{
                    "message":"Updated Sucessfully"
            } 

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
        else:
            service_request = Service.query.filter_by(prof_id=trans_id).first()

            for i in service_request.request:
                trans=ServiceRequest.query.filter_by(service_id=i.service_id).all()
                for iu in trans:
                    db.session.delete(iu)

            db.session.delete(service_request)
            db.session.commit()
            return{
                "message":"Service deleted Succesfully"
            }



    
api.add_resource(TransApi,'/api/get','/api/create/<int:trans_id>','/api/update/<int:trans_id>','/api/delete/<int:trans_id>')

