from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField, FloatField
from wtforms.validators import DataRequired, Optional, ValidationError

# def paperback_price_fixer(form, field):
#     # If resource is True, validate resource amount
#     price_paperback = field.data
#     if price_paperback is False:
#       price_paperback = ''


# def hardcover_price_fixer(form, field):
#     # If resource is True, validate resource amount
#     price_hardcover = field.data
#     if price_hardcover is False:
#      price_hardcover = ''


# def eBook_price_fixer(form, field):
#     # If resource is True, validate resource amount
#     price_eBook = field.data
#     if price_eBook is False:
#      price_eBook = ''







class BookForm(FlaskForm):
  publisher_id = IntegerField('Publisher Id', validators=[DataRequired()])
  title = StringField('Title', validators=[DataRequired()])
  author = StringField('Author', validators=[DataRequired()])
  price_paperback = IntegerField('Paperback Price', validators=[Optional()])
  price_hardcover = IntegerField('Hardcover Price', validators=[Optional()])
  price_eBook = IntegerField('eBook Price', validators=[Optional()])
  genre = StringField('Genre')
  overview = TextAreaField('Overview')
  editorial_review = TextAreaField('Editorial Review')
  publication_date = StringField('Publication Date')
  publisher= StringField('Publisher')
  cover_art  = StringField('Book Cover')
  pages = IntegerField('Pages')
