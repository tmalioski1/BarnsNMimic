from flask_wtf import FlaskForm
from wtforms import IntegerField, SubmitField, FloatField
from wtforms.validators import DataRequired

class CartItemForm(FlaskForm):
    quantity = IntegerField("Quantity", validators=[DataRequired()])
    price= FloatField("Price", validators=[DataRequired()])
    submit = SubmitField("Update Quantity")
