from .database import db
from flask_security import UserMixin,RoleMixin
class User(db.Model,UserMixin):
    __tablename__='user'
    id=db.Column(db.Integer,primary_key=True,autoincrement=True)
    username=db.Column(db.String,nullable=False,unique=True)
    email=db.Column(db.String,nullable=False,unique=True)
    password=db.Column(db.String,nullable=False)
    fs_uniquifier=db.Column(db.String,unique=True,nullable=False)
    roles=db.relationship('Role',secondary='roles_users',backref="bearer")
    active=db.Column(db.Boolean,nullable=False)

class Role(db.Model,RoleMixin):
     __tablename__='role'
     id=db.Column(db.Integer,primary_key=True)
     name=db.Column(db.String,nullable=False,unique=True)
     description=db.Column(db.String,nullable=False)
class RolesUsers(db.Model):
     id=db.Column(db.Integer,primary_key=True)
     user_id=db.Column(db.Integer,db.ForeignKey('user.username'))
     role_id=db.Column(db.Integer,db.ForeignKey('role.name'))
class Professional(db.Model):
    __tablename__='professional'
    id = db.Column(db.String, primary_key=True)
    user_id = db.Column(db.Integer,db.ForeignKey('user.id'))
    description=db.Column(db.String,nullable=False)
    Service_type=db.Column(db.String,nullable=False)
    Experience=db.Column(db.String,nullable=False)
    Founder=db.Column(db.String,nullable=False)
    Verification=db.Column(db.String,default="Not Verfied")
class Customer(db.Model):
    __tablename__='customer'
    id = db.Column(db.String, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    email=db.Column(db.String,db.ForeignKey('user.email'))
    username=db.Column(db.String,db.ForeignKey('user.username'))
    address=db.Column(db.String,nullable=False)
    contact_no=db.Column(db.String,nullable=False)
    Verification=db.Column(db.String,default="Not Verfied")
    f1=db.relationship('User', foreign_keys=[user_id],backref='bearer1')
    f2=db.relationship('User', foreign_keys=[email],backref='bearer2')
    f3=db.relationship('User', foreign_keys=[username],backref='bearer3')

class Service(db.Model):
    __tablename__="service"
    id=db.Column(db.String,primary_key=True)
    Service_name=db.Column(db.String,nullable=False)
    Time_required=db.Column(db.String,nullable=False)
    Description=db.Column(db.String,nullable=False)


class ServiceRequest(db.Model):
    __tablename__='service_request'
    id= db.Column(db.String, primary_key=True)
    service_id=db.Column(db.String, db.ForeignKey('service.id'))#Service model to be created
    customer_id=db.Column(db.String, db.ForeignKey('customer.id'))
    professional_id=db.Column(db.String, db.ForeignKey('professional.id'))
    Date_of_Request=db.Column(db.String,nullable=False)
    Date_of_completion=db.Column(db.String,nullable=False)
    Status=db.Column(db.String,nullable=False)
    f1=db.relationship('Service', foreign_keys=[service_id],backref='bearer1')
    f2=db.relationship('Customer', foreign_keys=[customer_id],backref='bearer2')
    f3=db.relationship('Professional', foreign_keys=[professional_id],backref='bearer3')

class Ratings(db.Model):
    __tablename__="Ratings"
    id= db.Column(db.String, db.ForeignKey('service_request.id'),primary_key=True)
    review=db.Column(db.String, nullable=False)
    remarks=db.Column(db.String, nullable=False)