from .database import db
from flask_security import UserMixin,RoleMixin
class User(db.Model,UserMixin):
    id=db.Column(db.Integer,primary_key=True,autoincrement=True)
    username=db.Column(db.String,nullable=False,unique=True)
    email=db.Column(db.String,nullable=False,unique=True)
    password=db.Column(db.String,nullable=False)
    fs_uniquifier=db.Column(db.String,unique=True,nullable=False)
    roles=db.relationship('Role',secondary='roles_users',backref="bearer")
    active=db.Column(db.Boolean,nullable=False)
    customer=db.relationship('Customer',backref='bearer')
    professional=db.relationship('Professional',backref='bearer')
    service=db.relationship('ServiceRequest',backref='bearer')

class Role(db.Model,RoleMixin):
     id=db.Column(db.Integer,primary_key=True)
     name=db.Column(db.String,nullable=False,unique=True)
     description=db.Column(db.String,nullable=False)
class RolesUsers(db.Model):
     id=db.Column(db.Integer,primary_key=True)
     user_id=db.Column(db.Integer,db.ForeignKey('user.username'))
     role_id=db.Column(db.Integer,db.ForeignKey('role.name'))
class Professional(db.Model):
    id = db.Column(db.Integer, primary_key=True,autoincrement=True)
    user_id=db.Column(db.Integer,db.ForeignKey('user.id'))
    description=db.Column(db.String,nullable=True)
    Service_type=db.Column(db.String,nullable=True)
    Experience=db.Column(db.String,nullable=True)
    Founder=db.Column(db.String,nullable=True)
    Verification=db.Column(db.String,default="Not Verfied",nullable=True)
class Customer(db.Model):
    id = db.Column(db.Integer, primary_key=True,autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    address=db.Column(db.String,nullable=True)
    contact_no=db.Column(db.String,nullable=True)
    Verification=db.Column(db.String,default="Not Verfied",nullable=True)

class Service(db.Model):
    id=db.Column(db.String,primary_key=True)
    Service_name=db.Column(db.String,nullable=False)
    Time_required=db.Column(db.String,nullable=False)
    Description=db.Column(db.String,nullable=False)
    amount=db.Column(db.String,default="1000")
    prof_id=db.Column(db.String,db.ForeignKey('user.id'),nullable=False)
    professional=db.relationship('User',backref='services')


class ServiceRequest(db.Model):
    id= db.Column(db.String, primary_key=True)
    customer_id=db.Column(db.String, db.ForeignKey('user.id'))
    Date_of_Request=db.Column(db.String,nullable=False)
    Date_of_completion=db.Column(db.String,nullable=False)
    amount=db.Column(db.String,default="1000")
    status=db.Column(db.String,nullable=False,default="In_process")
    service_id = db.Column(db.String, db.ForeignKey('service.id'))
    service=db.relationship('Service',backref='request')


class Ratings(db.Model):
    __tablename__="Ratings"
    id= db.Column(db.String, db.ForeignKey('service_request.id'),primary_key=True)
    review=db.Column(db.String, nullable=False)
    remarks=db.Column(db.String, nullable=False)