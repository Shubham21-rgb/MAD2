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