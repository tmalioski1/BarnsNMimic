from .db import db, environment, SCHEMA, add_prefix_for_prod

class Cart(db.Model):
    __tablename__ = 'carts'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    book_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('books.id')),  nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('users.id')), nullable=True, unique=True)
    quantity = db.Column(db.Integer, nullable=False)
    price = db.Column(db.Integer, nullable=False)
    total_item_price = db.Column(db.Integer, nullable=False)

    user = db.relationship('User', back_populates='cart')
    books = db.relationship('Book', back_populates='cart')
    order = db.relationship('Order',  uselist=False, back_populates='cart')

    def to_dict(self):
        return{
            "id": self.id,
            "book_id": self.book_id,
            'user_id': self.user_id,
            "quantity": self.quantity,
            "price": self.price,
            "total_item_price": self.total_item_price
        }
