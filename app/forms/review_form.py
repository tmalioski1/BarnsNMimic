from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField
from wtforms.validators import DataRequired



class ReviewForm(FlaskForm):
  user_id = StringField('User Id', validators=[DataRequired()])
  book_id = IntegerField('Book Id', validators=[DataRequired()])
  stars = IntegerField('Stars', validators=[DataRequired()])
  review_title = StringField('Review Title', validators=[DataRequired()])
  review_txt = TextAreaField('Review', validators=[DataRequired()])
  recommended = StringField('Recommended')
  spoilers = StringField('Spoilers')
