from flask_wtf import FlaskForm
from wtforms import FloatField


class PriceForm(FlaskForm):
  price_paperback = FloatField('Paperback Price')
  price_hardcover = FloatField('Hardcover Price')
  price_eBook = FloatField('eBook Price')
