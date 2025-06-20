from flask import current_app as app,jsonify,request,render_template
from flask_security import auth_required, roles_required,current_user,login_user,roles_accepted
from application.database import db
from werkzeug.security import check_password_hash,generate_password_hash
from .resources import roles_list
from .models import *

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
    return{
        "message":"Updated Succesfully"
    }
#to Delete close/rejected Service
@app.route('/api/deleted/<int:id>',methods=['POST'])
@auth_required('token')
@roles_accepted('prof','admin')
def log25(id):
    servicerequest=ServiceRequest.query.get(id)
    db.session.delete(servicerequest)
    db.session.commit()
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
@roles_accepted('prof','admin')
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
@auth_required('token')
@roles_accepted('prof')
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

