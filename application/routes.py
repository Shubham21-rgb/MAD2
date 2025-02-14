from flask import current_app as app,jsonify,request
from flask_security import auth_required, roles_required,current_user,hash_password 
from application.database import db

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
@app.route('/check/user')
@auth_required('token')
@roles_required('user')#here it works as and if we give this @roles_required(['user','admin'])
#@roles_accepted(['User','admin']) works as or
def user():
    user=current_user
    return jsonify({
        "email":user.email,
        "password":user.password,
        "username":user.username
    })
@app.route('/api/register',methods=['POST'])
def register():
    cred=request.get_json()
    try:
        if not app.security.datastore.find_user(username=cred["username"]):
            app.security.datastore.create_user(username=cred["username"],
                                                email=cred["email"],
                                                password=hash_password(cred["password"]),
                                                roles=['user'])
        db.session.commit()
        return jsonify({
            "message":"User created succesfully"
        }),201
    except:
        return jsonify({
            "message": "Credentials already exsists"
        }),400
    