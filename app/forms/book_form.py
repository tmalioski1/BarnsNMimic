from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField, FloatField
from wtforms.validators import DataRequired, ValidationError


class BookForm(FlaskForm):
  publisher_id = IntegerField('Publisher Id', validators=[DataRequired()])
  title = StringField('Title', validators=[DataRequired()])
  author = StringField('Author', validators=[DataRequired()])
  genre = StringField('Genre')
  overview = TextAreaField('Overview')
  editorial_review = TextAreaField('Editorial Review')
  publication_date = StringField('Publication Date')
  publisher= StringField('Publisher')
  cover_art  = StringField('Book Cover')
  pages = IntegerField('Pages')
