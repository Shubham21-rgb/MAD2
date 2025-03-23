from flask import Flask
from application.database import db
from application.models import *
from application.config import LocalDevelopmentConfig
from flask_security import Security,SQLAlchemyUserDatastore
from werkzeug.security import generate_password_hash
from application.resources import api
from application.celery_init import celery_init_app
from celery.schedules import crontab
#here we will use the hash password for encrypting the password
from flask_security import hash_password
def create_app():
    app=Flask(__name__)
    app.config.from_object(LocalDevelopmentConfig)
    db.init_app(app)
    api.init_app(app)
    datastore=SQLAlchemyUserDatastore(db,User,Role)
    app.security=Security(app,datastore)
    app.app_context().push()
    return app
app=create_app()
celery=celery_init_app(app)
celery.autodiscover_tasks()

with app.app_context():
    db.create_all()

    app.security.datastore.find_or_create_role(name="admin",description="super user of app ")
    app.security.datastore.find_or_create_role(name="user",description="Customer user of app ")
    app.security.datastore.find_or_create_role(name="prof",description="Professional user of app ")
    db.session.commit()
    if not app.security.datastore.find_user(email="Mastercontrol@admin.com"):
        app.security.datastore.create_user(username="Admin01",
                                           email="Mastercontrol@admin.com",
                                           password=generate_password_hash("12345"),
                                           roles=['admin'])
    if not app.security.datastore.find_user(email="RaviKisan@gmail.com"):
        app.security.datastore.create_user(username="Ravi21",
                                           email="RaviKisan@gmail.com",
                                           password=generate_password_hash("Hotis1234"),
                                           roles=['user'])
    if not app.security.datastore.find_user(email="Gucciofficial@gmail.com"):
        app.security.datastore.create_user(username="Gucci92",
                                           email="Gucciofficial@gmail.com",
                                           password=generate_password_hash("Hotis1234"),
                                           roles=['prof'])
    db.session.commit()
from application.routes import *

@celery.on_after_finalize.connect 
def setup_periodic_tasks(sender, **kwargs):
    sender.add_periodic_task(
        crontab(minute = '*/2'),
        monthly_report.s(),
    )
if __name__=="__main__":
    app.run()