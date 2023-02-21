from .db import db, environment, SCHEMA, add_prefix_for_prod

class Order(db.Model):
    __tablename__='orders'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id'), ondelete='CASCADE'),  nullable=False)
    cart_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('carts.id')),  nullable=False)


    cart = db.relationship('Book', back_populates='orders')
    user = db.relationship('User', back_populates='orders')

    def to_dict(self):
        return{
            "id": self.id,
            "user_id": self.user_id,
            "cart_id": self.cart_id,


        }
