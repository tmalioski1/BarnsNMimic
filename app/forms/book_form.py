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

# def price(form, field):
#     # If resource is True, validate resource amount
#     num = form.data["paperback"]
#     if not num:
#         num = 0.0
#     if num isinstance(amount, float):
#         if amount < 1.0 or amount > 3000.0:
#             raise ValidationError('too little or too much message.')
#         else:
#             raise ValidationError('some message.')






class BookForm(FlaskForm):
  publisher_id = IntegerField('Publisher Id', validators=[DataRequired()])
  title = StringField('Title', validators=[DataRequired()])
  author = StringField('Author', validators=[DataRequired()])
  price_paperback = FloatField('Paperback Price')
  price_hardcover = FloatField('Hardcover Price')
  price_eBook = FloatField('eBook Price')
  genre = StringField('Genre')
  overview = TextAreaField('Overview')
  editorial_review = TextAreaField('Editorial Review')
  publication_date = StringField('Publication Date')
  publisher= StringField('Publisher')
  cover_art  = StringField('Book Cover')
  pages = IntegerField('Pages')
