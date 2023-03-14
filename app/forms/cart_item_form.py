from flask_wtf import FlaskForm
from wtforms import IntegerField, SubmitField
from wtforms.validators import DataRequired

class CartItemForm(FlaskForm):
    quantity = IntegerField("Quantity", validators=[DataRequired()])
    submit = SubmitField("Update Quantity")
