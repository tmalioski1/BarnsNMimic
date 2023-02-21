from .db import db, environment, SCHEMA, add_prefix_for_prod

class Cart(db.Model):
    __tablename__ = 'carts'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('users.id')), nullable=True, unique=True)
    total_price = db.Column(db.Float, default=0)

    user = db.relationship('User', back_populates='cart')
    order = db.relationship('Order', back_populates='cart')
    cart_item = db.relationship(
        'Cart_Item', back_populates='cart', cascade='all, delete-orphan')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'total_price': self.total_price,
        }
