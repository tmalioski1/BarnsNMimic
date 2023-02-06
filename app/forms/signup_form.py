from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def valid_email(form, field):
    email = field.data
    substring = '@'
    if substring not in email:
        raise ValidationError('Must be a valid email address')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')

def username_length(form, field):
    username = field.data
    if len(username) > 20:
        raise ValidationError('Username maximum character length (20) exceeded')


def email_name_length(form, field):
    email = field.data
    if len(email) > 40:
        raise ValidationError('Email maximum character length (40) exceeded')

def password_length(form, field):
    password = field.data
    if len(password) > 40:
        raise ValidationError('Password maximum character length (40) exceeded')


def first_name_length(form, field):
    first_name = field.data
    if len(first_name) > 20:
        raise ValidationError('First name maximum character length (20) exceeded')


def last_name_length(form, field):
    last_name = field.data
    if len(last_name) > 20:
        raise ValidationError('Last name maximum character length (20) exceeded')


class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(), username_exists, username_length])
    email = StringField('email', validators=[DataRequired(), user_exists, valid_email, email_name_length])
    password = StringField('password', validators=[DataRequired(), password_length])
    first_name = StringField('First Name', validators=[DataRequired(), first_name_length])
    last_name = StringField('Last Name', validators=[DataRequired(), last_name_length])
