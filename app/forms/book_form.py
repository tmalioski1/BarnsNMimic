from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField, DateField
from wtforms.validators import DataRequired

class BookForm(FlaskForm):
  publisher_id = IntegerField('Publisher Id', validators=[DataRequired()])
  title = StringField('Title', validators=[DataRequired()])
  author = StringField('Author', validators=[DataRequired()])
  type = StringField('Type', validators=[DataRequired()])
  price_paperback = StringField('Paperback Price')
  price_hardcover = StringField('Hardcover Price')
  price_eBook = StringField('eBook Price')
  genre = StringField('Genre')
  overview = TextAreaField('Overview')
  editorial_review = TextAreaField('Editorial Review')
  publication_date = DateField('Publication Date', format='%Y-%m-&d')
  publisher= StringField('Publisher')
  cover_art  = StringField('Book Cover')
  pages = IntegerField('Pages')
  sales_rank= IntegerField('Sales Rank')
