from .db import db, environment, SCHEMA, add_prefix_for_prod

class Cart_Item(db.Model):
    __tablename__='cart_items'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    cart_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('carts.id'), ondelete='CASCADE'),  nullable=False)
    order_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('orders.id')))
    book_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('books.id'), ondelete='CASCADE'),  nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    price = db.Column(db.Integer, nullable=False)
    total_price = db.Column(db.Integer, nullable=False)

    book = db.relationship('Book', back_populates='cart_item')
    cart = db.relationship('Cart', back_populates='cart_items')
    order = db.relationship('Order', back_populates='cart_items')

    def to_dict(self):
        return{
            "id": self.id,
            "cart_id": self.cart_id,
            "order_id": self.order_id,
            "book_id": self.book_id,
            "quantity": self.quantity,
            "price": self.price,
            "total_price": self.total_price

        }
