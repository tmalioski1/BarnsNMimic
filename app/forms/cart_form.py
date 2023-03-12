from flask_wtf import FlaskForm
from wtforms import FloatField, IntegerField


class CartForm(FlaskForm):
  price = FloatField('Price')
  total_price = FloatField('Total Price')
  quantity = IntegerField('Quantity')
