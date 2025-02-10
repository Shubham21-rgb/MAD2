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
'''class Professional(db.Model):
    __tablename__='Professional'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer,db.ForeignKey('user.id'))
    user = db.relationship('User', back_populates='Professional')
    description=db.Column(db.String,nullable=False)
    Service_type=db.Column(db.String,nullable=False)
    Experience=db.Column(db.String,nullable=False)
    Founder=db.Column(db.String,nullable=False)
class Customer(db.Model):
    __tablename__='Customer'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    user = db.relationship('User', back_populates='Customer')
    email=db.Column(db.String,db.ForeignKey('user.email'))
    username=db.Column(db.String,db.ForeignKey('user.username'))
    description=db.Column(db.String,nullable=False)
    Service_type=db.Column(db.String,nullable=False)
    Experience=db.Column(db.String,nullable=False)
    Founder=db.Column(db.String,nullable=False)'''
    
