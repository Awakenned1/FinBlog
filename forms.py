from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, SelectField, BooleanField, FileField, SubmitField, PasswordField
from wtforms.validators import DataRequired, Length, Optional, Email, EqualTo, ValidationError
from models import User

class PostForm(FlaskForm):
    title = StringField('Title', validators=[DataRequired(), Length(min=3, max=200)])
    content = TextAreaField('Content', validators=[DataRequired()])
    excerpt = TextAreaField('Excerpt', validators=[Optional(), Length(max=300)])
    category = SelectField('Category', choices=[
        ('budgeting', 'Budgeting'),
        ('banking', 'Banking'),
        ('saving', 'Saving'),
        ('investing', 'Investing'),
        ('side-hustles', 'Side Hustles'),
        ('student-life', 'Student Life')
    ])
    featured_image = FileField('Featured Image')
    tags = StringField('Tags (comma separated)', validators=[Optional()])
    is_published = BooleanField('Publish immediately?')
    is_featured = BooleanField('Feature this post?')
    submit = SubmitField('Save Post')

class LoginForm(FlaskForm):
    email = StringField('Email', validators=[DataRequired(), Email()])
    password = PasswordField('Password', validators=[DataRequired()])
    remember = BooleanField('Remember Me')
    submit = SubmitField('Sign In')

class RegistrationForm(FlaskForm):
    username = StringField('Username', validators=[DataRequired(), Length(min=4, max=20)])
    email = StringField('Email', validators=[DataRequired(), Email()])
    password = PasswordField('Password', validators=[DataRequired(), Length(min=6)])
    confirm_password = PasswordField('Confirm Password', validators=[DataRequired(), EqualTo('password')])
    submit = SubmitField('Sign Up')

    def validate_username(self, username):
        user = User.query.filter_by(username=username.data).first()
        if user:
            raise ValidationError('That username is taken. Please choose a different one.')

    def validate_email(self, email):
        user = User.query.filter_by(email=email.data).first()
        if user:
            raise ValidationError('That email is taken. Please choose a different one.')
