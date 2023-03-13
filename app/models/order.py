from .db import db, environment, SCHEMA, add_prefix_for_prod

class Order(db.Model):
    __tablename__='orders'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id'), ondelete='CASCADE'),  nullable=False)
    cart_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('carts.id')),  nullable=False)
    order_number = db.Column(db.String, nullable=False)
    date_time = db.Column(db.String(255), nullable=False)

    cart = db.relationship('Cart', back_populates='order')
    user = db.relationship('User', back_populates='order')

    def to_dict(self):
        return{
            "id": self.id,
            "user_id": self.user_id,
            "cart_id": self.cart_id,
            'orderNumber': self.order_number,
            'dateTime': self.date_time,
        }
