from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField, FloatField
from wtforms.validators import DataRequired

class BookForm(FlaskForm):
  publisher_id = IntegerField('Publisher Id', validators=[DataRequired()])
  title = StringField('Title', validators=[DataRequired()])
  author = StringField('Author', validators=[DataRequired()])
  type = StringField('Type', validators=[DataRequired()])
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
  sales_rank= IntegerField('Sales Rank')
