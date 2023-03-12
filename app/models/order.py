from .db import db, environment, SCHEMA, add_prefix_for_prod

class Order(db.Model):
    __tablename__='orders'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id'), ondelete='CASCADE'),  nullable=False)
    book_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('books.id')),  nullable=False)
    order_number = db.Column(db.String, nullable=False)
    date_time = db.Column(db.String(255), nullable=False)

    books = db.relationship('Cart', back_populates='order')
    user = db.relationship('User', back_populates='orders')

    def to_dict(self):
        return{
            "id": self.id,
            "user_id": self.user_id,
            "book_id": self.book_id,
            'orderNumber': self.order_number,
            'dateTime': self.date_time,
        }
