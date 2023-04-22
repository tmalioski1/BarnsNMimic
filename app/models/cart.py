from .db import db, environment, SCHEMA, add_prefix_for_prod

class Cart(db.Model):
    __tablename__ = 'carts'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('users.id')), nullable=True)
    purchased = db.Column(db.Boolean, default=False)
    order_number = db.Column(db.String, nullable=False)

    cart_items = db.relationship("CartItem", back_populates="item_cart")
    cart_user = db.relationship('User', back_populates='cart')

    def to_dict(self):
        return{
            "id": self.id,
            'user_id': self.user_id,
            "purchased": self.purchased,
            "order_number": self.order_number,
            "cartItems": {item.to_dict()["id"]: item.to_dict() for item in self.cart_items},
            "cartUser": self.cart_user.to_dict()
        }

    def __repr__(self):
        return f"<Cart: {self.id}, User ID: {self.user_id}>"
