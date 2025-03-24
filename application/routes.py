from flask import current_app as app,jsonify,request,render_template,send_from_directory
from flask_security import auth_required, roles_required,current_user,login_user,roles_accepted
from application.database import db
from werkzeug.security import check_password_hash,generate_password_hash
from .resources import roles_list
from .models import *
from celery.result import AsyncResult
from .task import csv_report,monthly_report,delivery_report
from sqlalchemy import cast,Float
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt

@app.route('/',methods=['GET'])
def home():
    return render_template('index.html')
def roles_list(roles):
    role_list=[]
    for role in roles:
        role_list.append(role.name)
    return role_list

@app.route('/api/admin')
@auth_required('token')
@roles_required('admin')
def admin_home():
    return {
        "message":"admin logged in success"
    }
@app.route('/api/home')   
@auth_required('token')
@roles_accepted('user','prof','admin')
def userhome():
    user=current_user
    if "user" in  roles_list(user.roles):
        if not db.session.query(Customer).filter_by(user_id=user.id).first():
            ser=Customer(user_id=user.id)
            db.session.add(ser)
            db.session.commit()
    elif "prof" in roles_list(user.roles):
        if not db.session.query(Professional).filter_by(user_id=user.id).first():
            ser=Professional(user_id=user.id)
            db.session.add(ser)
            db.session.commit()
    return jsonify({
        "id":user.id,
        "email":user.email,
        "password":user.password,
        "username":user.username,
        "roles":roles_list(user.roles) 
    })

@app.route('/api/cregister',methods=['POST'])
def cregister():
    cred=request.get_json()
    if not cred["username"]:
        return{
            "message":"username is required please register again"
        }
    if not cred["email"]:
        return{
            "message":"email is required please register again"
        }
    if not cred["password"]:
        return{
            "message":"password is required please register again"
        } 
    
    if not app.security.datastore.find_user(username=cred["username"]):
        app.security.datastore.create_user(username=cred["username"],
                                                email=cred["email"],
                                                password=generate_password_hash(cred["password"]),
                                                roles=['user'])
        db.session.commit()
        return jsonify({
            "message":"User created succesfully"
        }),201
    return jsonify({   
        "message": "User already exsists"
    }),400
@app.route('/api/pregister',methods=['POST'])
def pregister():
    cred=request.get_json()
    if not cred["username"]:
        return{
            "message":"username is required please register again"
        }
    if not cred["email"]:
        return{
            "message":"email is required please register again"
        }
    if not cred["password"]:
        return{
            "message":"password is required please register again"
        } 
    
    if not app.security.datastore.find_user(username=cred["username"]):
        app.security.datastore.create_user(username=cred["username"],
                                                email=cred["email"],
                                                password=generate_password_hash(cred["password"]),
                                                roles=['prof'])
        db.session.commit()
        return jsonify({
                "message":"Professional-User created succesfully"
            }),201
    return jsonify({
        "message": "Credentials already exsists"
    }),400

@app.route('/api/login',methods=['POST'])
def log34():
    body=request.get_json()
    email=body['email']
    password=body['password']
    if not email:
        return jsonify({
            "message":"Email is required"
        })
    if not password:
        return jsonify({
            "message":"password is required"
        })
    user=app.security.datastore.find_user(email=email)
    if user:
        if check_password_hash(user.password,password):
            login_user(user)
            return jsonify({
                "id":user.id,
                "email":user.email,
                "username":user.username,
                "auth-token":user.get_auth_token(),
                "roles":roles_list(user.roles)
            })
        else:
            return jsonify({
                "message":"Wrong credentials"
            })
    else:
        return jsonify({
            "message":"User does not exsist "
        })
    
@app.route('/api/getprof',methods=['POST'])
@auth_required('token')
@roles_required('admin')
def log32():
    prof=Professional.query.all()
    tran=[]
    for role in prof:
        user=User.query.filter_by(id=role.user_id)
        for pro in user:
            profess={}
            profess["id"]=pro.id
            profess["username"]=pro.username
            profess["email"]=pro.email
            tran.append(profess)
    if tran:
        return tran
    return{
        "message":"Unable to get"
    }
@app.route('/api/getser',methods=['POST'])
@auth_required('token')
@roles_accepted('user','prof','admin')
def log30():
    prof=Service.query.all()
    tran=[]
    for role in prof:
        profess={}
        profess["id"]=role.id
        profess["Service_name"]=role.Service_name
        profess["Time_required"]=role.Time_required
        profess["Description"]=role.Description
        profess["amount"]=role.amount
        profess["prof_id"]=role.prof_id
        tran.append(profess)
    if tran:
        return tran
    return{
        "message":"Unable to get"
    }
@app.route('/api/getsers',methods=['POST'])
def log28():
    prof=Service.query.all()
    tran=[]
    for role in prof:
        profess={}
        profess["ids"]=role.id
        profess["amount"]=role.amount
        tran.append(profess)
    if tran:
        return tran
    return{
        "message":"Unable to get"
    }

#to update status to Accepted
@app.route('/api/accept/<int:id>',methods=['POST'])
@auth_required('token')
@roles_accepted('prof','admin')
def log27(id):
    servicerequest=ServiceRequest.query.get(id)
    servicerequest.status="Accepted"
    db.session.commit()
    user=servicerequest.bearer.username
    request=delivery_report.delay(user)
    return{
        "message":"Updated Succesfully"
    }

#to update status to Rejected
@app.route('/api/reject/<int:id>',methods=['POST'])
@auth_required('token')
@roles_accepted('prof','admin')
def log26(id):
    servicerequest=ServiceRequest.query.get(id)
    servicerequest.status="Rejected"
    db.session.commit()
    user=servicerequest.bearer.username
    request=delivery_report.delay(user)
    return{
        "message":"Updated Succesfully"
    }
#to Delete close/rejected Service
@app.route('/api/deleted/<int:id>',methods=['POST'])
@auth_required('token')
@roles_accepted('prof')
def log25(id):
    servicerequest=ServiceRequest.query.get(id)
    db.session.delete(servicerequest)
    db.session.commit()
    user=servicerequest.bearer.username
    request=delivery_report.delay(user)
    return{
        "message":"Deleted Succesfully"
    }

#Pay part wroks as Completed Services
@app.route('/api/pay/<int:id>',methods=['POST'])
@auth_required('token')
@roles_accepted('user')
def log24(id):
    servicerequest=ServiceRequest.query.get(id)
    servicerequest.status="Completed"
    db.session.commit()
    return{
        "message":"Paid Succesfully"
    }
#professional user used to change status to Completed
@app.route('/api/complete/<int:id>',methods=['POST'])
@auth_required('token')
@roles_accepted('prof','admin')
def log23(id):
    servicerequest=ServiceRequest.query.get(id)
    servicerequest.status="Completed"
    db.session.commit()
    user=servicerequest.bearer.username
    request=delivery_report.delay(user)
    return{
        "message":"Changed Succesfully"
    }
#professional user used to change status to Closed
@app.route('/api/close/<int:id>',methods=['POST'])
@auth_required('token')
@roles_accepted('prof','admin')
def log22(id):
    servicerequest=ServiceRequest.query.get(id)
    servicerequest.status="Closed"
    db.session.commit()
    user=servicerequest.bearer.username
    request=delivery_report.delay(user)
    return{
        "message":"Changed Succesfully"
    }
# user used to change cancel-Pending requets means to delete
@app.route('/api/cancel/<int:id>',methods=['POST'])
@auth_required('token')
@roles_accepted('user')
def log21(id):
    servicerequest=ServiceRequest.query.get(id)
    db.session.delete(servicerequest)
    db.session.commit()
    return{
        "message":"Closed-Service Permanently"
    }

# To Update the date Of Completion
@app.route('/api/tupdate/<int:id>',methods=['POST'])
@auth_required('token')
@roles_accepted('prof')
def log20(id):
    body=request.get_json()
    servicerequest=ServiceRequest.query.get(id)
    servicerequest.Date_of_completion=body["time"]
    db.session.commit()
    return{
        "message":"Updated Succesfully"
    }

#To get professional Service
@app.route('/api/entry',methods=['POST'])
def log19():
    user=current_user
    prof=Service.query.filter_by(prof_id=user.id)
    tran=[]
    for role in prof:
        profess={}
        profess["ids"]=role.id
        tran.append(profess)
    if tran:
        return tran
    return{
        "message":"Unable to get"
    }

@app.route('/api/export')
def export_csv():
    user=current_user
    result=csv_report.delay()#async object
    return jsonify({
        "id":result.id,
        "result":result.result,
    })

@app.route('/api/csv_result/<id>')
def csv_result(id):
    result = AsyncResult(id)
    
    return send_from_directory('static', result.result)

################## Customer and Professional Verification part by User##################
@app.route('/api/cdetails')
@auth_required('token')
@roles_accepted('admin')
def cdetail():
    acc_val=[]
    cus=Customer.query.all()
    for t in cus:
        value={}
        value["id"]=t.id
        value["user_id"]=t.user_id
        value["username"]=t.bearer.username
        value["address"]=t.address
        value["contact_no"]=t.contact_no
        value["Verification"]=t.Verification
        acc_val.append(value)
    if acc_val:
        return acc_val
    else:
        return {
            "message":"No Customer available"
        }


@app.route('/api/pdetails')
@auth_required('token')
@roles_accepted('admin')
def pdetail():
    acc_val=[]
    cus=Professional.query.all()
    for t in cus:
        value={}
        value["id"]=t.id
        value["user_id"]=t.user_id
        value["username"]=t.bearer.username
        value["description"]=t.description
        value["Experience"]=t.Experience
        value["Verification"]=t.Verification
        acc_val.append(value)
    if acc_val:
        return acc_val
    else:
        return {
            "message":"No Professional available"
        }

@app.route('/api/ratings')
@auth_required('token')
@roles_accepted('admin','prof')
def ratings():
    acc_val=[]
    cus=Ratings.query.all()
    for t in cus:
        value={}
        value["id"]=t.id
        value["review"]=t.review
        value["remarks"]=t.remarks
        acc_val.append(value)
    if acc_val:
        return acc_val
    else:
        return {
            "message":"No Ratings available"
        }
    
############################# Verify profeesional and customer ####################
@app.route('/api/cverify/<int:id>') 
@auth_required('token')
@roles_accepted('admin')
def cverify(id):
    cus=Customer.query.get(id)
    if cus:
        cus.Verification="Verified"
        db.session.commit()
        return{
            "message":"succesfully Verified"
        }
    else:
        return{
            "message":"Cannot Verify"
        }

@app.route('/api/pverify/<int:id>') 
@auth_required('token')
@roles_accepted('admin')
def pverify(id):
    cus=Professional.query.get(id)
    if cus:
        cus.Verification="Verified"
        db.session.commit()
        return{
            "message":"succesfully Verified"
        }
    else:
        return{
            "message":"Cannot Verify"
        }
############################# Block profeesional and customer ####################

@app.route('/api/cblock/<int:id>') 
@auth_required('token')
@roles_accepted('admin')
def cblock(id):
    cus=Customer.query.get(id)
    if cus:
        cus.Verification="Verified-Blocked"
        db.session.commit()
        return{
            "message":"succesfully Blocked"
        }
    else:
        return{
            "message":"Cannot Block"
        }

@app.route('/api/pblock/<int:id>') 
@auth_required('token')
@roles_accepted('admin')
def pblock(id):
    cus=Professional.query.get(id)
    if cus:
        cus.Verification="Verified-Blocked"
        db.session.commit()
        return{
            "message":"succesfully Blocked"
        }
    else:
        return{
            "message":"Cannot Block"
        }

############################# un-Block profeesional and customer ####################
@app.route('/api/cunblock/<int:id>',methods=['POST']) 
@auth_required('token')
@roles_accepted('admin')
def cunblock(id):
    cus=Customer.query.get(id)
    if cus:
        cus.Verification="Verified"
        db.session.commit()
        return{
            "message":"succesfully Restored"
        }
    else:
        return{
            "message":"Cannot restore"
        }

@app.route('/api/punblock/<int:id>',methods=['POST']) 
@auth_required('token')
@roles_accepted('admin')
def punblock(id):
    cus=Professional.query.get(id)
    if cus:
        cus.Verification="Verified"
        db.session.commit()
        return{
            "message":"succesfully Restored"
        }
    else:
        return{
            "message":"Cannot restore"
        }

################### Admin To contol The Service -Request ####################
@app.route('/api/aclose/<int:id>',methods=['POST']) 
@auth_required('token')
@roles_accepted('admin')
def aclose(id):
    cus=ServiceRequest.query.get(id)
    if cus:
        cus.status="Closed"
        db.session.commit()
        user=cus.bearer.username
        request=delivery_report.delay(user)
        return{
            "message":"succesfully Restored"
        }
    else:
        return{
            "message":"Cannot restore"
        }

@app.route('/api/adelete/<int:id>',methods=['POST']) 
@auth_required('token')
@roles_accepted('admin')
def adelete(id):
    cus=ServiceRequest.query.get(id)
    if cus:
        db.session.delete(cus)
        db.session.commit()
        user=cus.bearer.username
        request=delivery_report.delay(user)
        return{
            "message":"succesfully Restored"
        }
    else:
        return{
            "message":"Cannot restore"
        }

@app.route('/api/acomplete/<int:id>',methods=['POST']) 
@auth_required('token')
@roles_accepted('admin')
def acomplete(id):
    cus=ServiceRequest.query.get(id)
    if cus:
        cus.status="Completed"
        db.session.commit()
        user=cus.bearer.username
        request=delivery_report.delay(user)
        return{
            "message":"succesfully Restored"
        }
    else:
        return{
            "message":"Cannot restore"
        }

@app.route('/api/aupdate/<int:id>',methods=['POST']) 
@auth_required('token')
@roles_accepted('admin')
def aupdate(id):
    body=request.get_json()
    servicerequest=ServiceRequest.query.get(id)
    servicerequest.Date_of_completion=body["time"]
    db.session.commit()
    return{
        "message":"Updated Succesfully"
    }

################################################  professional and customer profile works ########################
@app.route('/api/updateprof/<int:id>',methods=['POST']) 
@auth_required('token')
@roles_accepted('prof','user')
def profete(id):
    if 'prof' in roles_list(current_user.roles):
        body=request.get_json()
        ser=Professional.query.filter_by(user_id=id).all()
        for t in ser:
            t.description=body["description"]
            t.Service_type=body["service_type"]
            t.Experience=body["Experience"]
            t.Founder=body["Founder"]
            db.session.commit()
            return {
            "message":"Succesfully Updated"
            }
        return{
            'message':'cannot update'
        }
    else:
        body=request.get_json()
        ser=Customer.query.filter_by(user_id=id).all()
        for t in ser:
            t.contact_no=body["contact_no"]
            t.address=body["address"]
            db.session.commit()
            return {
            "message":"Succesfully Updated"
            }
        return{
            'message':'cannot update'
        }

@app.route('/api/profentryies')
@auth_required('token')
@roles_accepted('prof','user')
def rot():
    user=current_user
    d=[{"id":user.id}]
    return d

######################### UPDATE/DELETE OF Service By Admin #########################
@app.route('/api/adminser',methods=['POST'])
@auth_required('token')
@roles_accepted('admin')
def adminser():
    prof=Service.query.all()
    tran=[]
    for role in prof:
        profess={}
        profess["id"]=role.id
        profess["Service_name"]=role.Service_name
        profess["Time_required"]=role.Time_required
        profess["Description"]=role.Description
        profess["prof_id"]=role.prof_id
        profess["amount"]=role.amount
        tran.append(profess)
    if tran:
        return tran
    return{
        "message":"Unable to get"
    }
############################## Admin/Professional to create Service ##########################
@app.route('/api/adcreate',methods=['POST'])
@auth_required('token')
@roles_accepted('admin','prof')
def createserwer():
    if 'prof' in roles_list(current_user.roles):
            body=request.get_json()
            try:
                Service_create=Service(id=body['id'],
                                    Service_name=body['service_name'],
                                    Time_required=body['Time_required'],
                                    Description=body['Description'],
                                    amount=body['amount'],
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
    elif 'admin' in roles_list(current_user.roles):
        body=request.get_json()
        try:
            Service_create=Service(id=body['id'],
                                    Service_name=body['service_name'],
                                    Time_required=body['Time_required'],
                                    Description=body['Description'],
                                    amount=body['amount'],
                                    prof_id=body['prof_id']
                                    )
            db.session.add(Service_create)
            db.session.commit()
            return{
                    "message":"Service Created Succesfully Generated"
                } 
        except:
            return{
                "message":"Service feilds are missiing or exsists"
                }

############################### Customer Ratings #################################
@app.route('/api/cusrate/<int:ids>',methods=['POST'])
@auth_required('token')
@roles_accepted('user')
def cusserrate(ids):
    body=request.get_json()
    ser = ServiceRequest.query.get(ids)
    try:
        d=ser.id
        s2=Ratings(id=d,
                    review=body['review'],
                    remarks='to_be_updated_by_the_company'

        )
        db.session.add(s2)
        db.session.commit()
        return{
                "message":"Rating Created Succesfully Generated"
            } 
    except:
        return{
            "message":"Rating feilds are missiing or exsists"
            }

#################################### Admin Ratings Management ###############
@app.route('/api/rateadmin/<int:ids>',methods=['POST'])
@auth_required('token')
@roles_accepted('admin')
def rateadmin123(ids):
    body=request.get_json()
    ser=Ratings.query.get(ids)
    ser.remarks=body['remark']
    db.session.commit()
    return{
        "message":"Succesfully responded"
    }

######################### 
@app.route('/api/mail')
def send_reports():
    res = monthly_report.delay()
    return {
        "result": res.result
    }
############## Search FUnctionalities for Admin And Customers #############
@app.route('/api/adminsearchin',methods=['POST'])
def adminsearchin():
    body=request.get_json()
    tran=[]
    if body['filter']=='Service_name':
        ser=Service.query.filter_by(Service_name=body['search']).all()
        for role in ser:
            profess={}
            profess["id"]=role.id
            profess["Service_name"]=role.Service_name
            profess["Time_required"]=role.Time_required
            profess["Description"]=role.Description
            profess["amount"]=role.amount
            profess["prof_id"]=role.prof_id
            tran.append(profess)

    elif body['filter']=='amount':
        ser=Service.query.filter(cast(Service.amount,Float) <= float(body['search'])).all()
        print(f"Query Results: {ser}")
        for role in ser:
            profess={}
            profess["id"]=role.id
            profess["Service_name"]=role.Service_name
            profess["Time_required"]=role.Time_required
            profess["Description"]=role.Description
            profess["amount"]=role.amount
            profess["prof_id"]=role.prof_id
            tran.append(profess)
    if tran:
        return tran
    else:
        return{
            "message":"No Data"
        }

######################### Admin And User Summary ##################
@app.route('/api/persummary')
@auth_required('token')
@roles_accepted('admin','user')
def adminsummary():
    if 'admin' in roles_list(current_user.roles):
        sql1=ServiceRequest.query.all()
        c=0
        for j in sql1:
            if 'Closed' in j.status:
                c=c+1
        d=0
        for j in sql1:
            if 'Rejected' in j.status:
                d=d+1
        e=0
        for j in sql1:
            if 'Accepted' in j.status:
                e=e+1
        f=0
        for j in sql1:
            if 'Pending' in j.status:
                f=f+1
        g=0
        for j in sql1:
            if 'Completed' in j.status:
                g=g+1
        mv=c+d+e+f+g
        ac=(c/mv)*100    
        ad=(d/mv)*100
        ae=(e/mv)*100    
        af=(f/mv)*100    
        ag=(g/mv)*100
        labels = ['Closed Services', 'Pending Services', 'Accepted Services', 'Completed Services','Rejected Services']
        sizes = [ac,af,ae,ag,ad]
        colors = ['gold', 'yellowgreen', 'lightcoral', 'lightskyblue','red']
        explode = (0, 0.1, 0, 0,0)  
        fig, ax = plt.subplots(figsize=(10, 10))
        ax.pie(sizes, explode=explode, labels=labels, colors=colors, autopct='%1.1f%%', shadow=True, startangle=140)
        ax.axis('equal')  # Equal aspect ratio ensures the pie chart is circular.
        plt.title('Summary')
        image_path = 'static/pie_chart1.png'
        plt.savefig(image_path)
        plt.close()
        fig, ax = plt.subplots(figsize=(10, 10))
        ax.bar(labels,sizes, color='skyblue')
        ax.set_xlabel('labels',fontsize=14)
        ax.set_ylabel('size',fontsize=14)
        ax.set_title('Services_Records',fontsize=18)
        image_path1 = 'static/bar_chart1.png'
        plt.savefig(image_path1)
        plt.close()
        return {"image_path":image_path,"image_path1":image_path1}
    elif 'user' in roles_list(current_user.roles):
        id=current_user.id
        sql1=ServiceRequest.query.filter_by(customer_id=id).all()
        c=0
        for j in sql1:
            if 'Closed' in j.status:
                c=c+1
        d=0
        for j in sql1:
            if 'Rejected' in j.status:
                d=d+1
        e=0
        for j in sql1:
            if 'Accepted' in j.status:
                e=e+1
        f=0
        for j in sql1:
            if 'Pending' in j.status:
                f=f+1
        g=0
        for j in sql1:
            if 'Completed' in j.status:
                g=g+1
        mv=c+d+e+f+g
        ac=(c/mv)*100    
        ad=(d/mv)*100
        ae=(e/mv)*100    
        af=(f/mv)*100    
        ag=(g/mv)*100
        labels = ['Closed Services', 'Pending Services', 'Accepted Services', 'Completed Services','Rejected Services']
        sizes = [ac,af,ae,ag,ad]
        colors = ['gold', 'yellowgreen', 'lightcoral', 'lightskyblue','red']
        explode = (0, 0.1, 0, 0,0)  
        fig, ax = plt.subplots(figsize=(10, 10))
        ax.pie(sizes, explode=explode, labels=labels, colors=colors, autopct='%1.1f%%', shadow=True, startangle=140)
        ax.axis('equal')  # Equal aspect ratio ensures the pie chart is circular.
        plt.title('Summary')
        image_path = 'static/pie_chart1.png'
        plt.savefig(image_path)
        plt.close()
        fig, ax = plt.subplots(figsize=(10, 10))
        ax.bar(labels,sizes, color='skyblue')
        ax.set_xlabel('labels',fontsize=14)
        ax.set_ylabel('size',fontsize=14)
        ax.set_title('Services_Records',fontsize=18)
        image_path1 = 'static/bar_chart1.png'
        plt.savefig(image_path1)
        plt.close()
        return {"image_path":image_path,"image_path1":image_path1}