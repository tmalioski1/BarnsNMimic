from .db import db, environment, SCHEMA, add_prefix_for_prod
from .book_price import book_prices

class Price(db.Model):
    __tablename__='prices'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    price_paperback = db.Column(db.Float, nullable=True)
    price_hardcover = db.Column(db.Float, nullable=True)
    price_eBook = db.Column(db.Float, nullable=True)






    def to_dict(self):
        return{
            "id": self.id,
            'price_paperback': self.price_paperback,
            'price_hardcover': self.price_hardcover,
            'price_eBook': self.price_eBook,

        }
