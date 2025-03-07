from flask import current_app as app,jsonify,request
from flask_security import auth_required, roles_required,current_user,login_user
from application.database import db
from werkzeug.security import check_password_hash,generate_password_hash

@app.route('/',methods=['GET'])
def home():
    return "<h1>This is my home page</h1>"


@app.route('/api/admin')
@auth_required('token')
@roles_required('admin')
def admin_home():
    return {
        "message":"admin logged in success"
    }
@app.route('/api/userhome')
@auth_required('token')
@roles_required('user')
def userhome():
    user=current_user
    return jsonify({
        "email":user.email,
        "password":user.password,
        "username":user.username  
    })


@app.route('/api/profhome')
@auth_required('token')
@roles_required('prof')
def profhome():
    user=current_user
    return jsonify({
        "email":user.email,
        "password":user.password,
        "username":user.username  
    })


@app.route('/api/cregister',methods=['POST'])
def cregister():
    cred=request.get_json()
    try:
        if not app.security.datastore.find_user(username=cred["username"]):
            app.security.datastore.create_user(username=cred["username"],
                                                email=cred["email"],
                                                password=generate_password_hash(cred["password"]),
                                                roles=['user'])
        db.session.commit()
        return jsonify({
            "message":"User created succesfully"
        }),201
    except:
        return jsonify({   
            "message": "Credentials already exsists"
        }),400
@app.route('/api/pregister',methods=['POST'])
def pregister():
    cred=request.get_json()
    try:
        if not app.security.datastore.find_user(username=cred["username"]):
            app.security.datastore.create_user(username=cred["username"],
                                                email=cred["email"],
                                                password=generate_password_hash(cred["password"]),
                                                roles=['prof'])
        db.session.commit()
        return jsonify({
            "message":"Professional-User created succesfully"
        }),201
    except:
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
    user=app.security.datastore.find_user(email=email)
    if user:
        if check_password_hash(user.password,password):
            if current_user is None:
                return jsonify({
                    "message":"Already logged in"
                })
            login_user(user)
            return jsonify({
                "id":user.id,
                "email":user.email,
                "username":user.username,
                "auth-token":user.get_auth_token()
            })
        else:
            return jsonify({
                "message":"Wrong credentials"
            })
    else:
        return jsonify({
            "message":"User does not exsist "
        })
