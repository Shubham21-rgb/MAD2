from flask import Flask
from application.database import db
from application.models import *
from application.config import LocalDevelopmentConfig
from flask_security import Security,SQLAlchemyUserDatastore

#here we will use the hash password for encrypting the password
from flask_security import hash_password
def create_app():
    app=Flask(__name__)
    app.config.from_object(LocalDevelopmentConfig)
    db.init_app(app)
    datastore=SQLAlchemyUserDatastore(db,User,Role)
    app.security=Security(app,datastore)
    app.app_context().push()
    return app
app=create_app()
with app.app_context():
    db.create_all()

    app.security.datastore.find_or_create_role(name="admin",description="super user of app ")
    app.security.datastore.find_or_create_role(name="user",description="Customer user of app ")
    app.security.datastore.find_or_create_role(name="prof",description="Professional user of app ")
    db.session.commit()
    if not app.security.datastore.find_user(email="Mastercontrol@admin.com"):
        app.security.datastore.create_user(username="Admin01",
                                           email="Mastercontrol@admin.com",
                                           password=hash_password("12345"),
                                           roles=['admin'])
    if not app.security.datastore.find_user(email="RaviKisan@gmail.com"):
        app.security.datastore.create_user(username="Ravi21",
                                           email="RaviKisan@gmail.com",
                                           password=hash_password("Hotis1234"),
                                           roles=['user'])
    if not app.security.datastore.find_user(email="Gucciofficial@gmail.com"):
        app.security.datastore.create_user(username="Gucci92",
                                           email="Gucciofficial@gmail.com",
                                           password=hash_password("Hotis1234"),
                                           roles=['prof'])
    db.session.commit()
from application.routes import *
if __name__=="__main__":
    app.run()