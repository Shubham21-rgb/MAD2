from flask import current_app as app,jsonify#by doing this we are doing basics no security to the routes but for security follow the below import
from flask_security import auth_required, roles_required,current_user #auth_required for authetication, roles_required for RBAC

@app.route('/admin')
@auth_required('token')
@roles_required('admin')
def admin_home():
    return {
        "message":"admin logged in success"
    }
@app.route('/user')
@auth_required('token')
@roles_required('user')#here it works as and if we give this @roles_required(['user','admin'])
#@roles_accepted(['User','admin']) works as or
def user():
    user=current_user
    return jsonify({
        "email":user.email,
        "password":user.password
    })
