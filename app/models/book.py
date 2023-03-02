from .db import db, environment, SCHEMA, add_prefix_for_prod
from .book_price import book_prices



class Book(db.Model):
  __tablename__ = 'books'

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  publisher_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
  title = db.Column(db.String(255), nullable=False)
  author = db.Column(db.String(255), nullable=False)
  genre = db.Column(db.String(255), nullable=True)
  overview = db.Column(db.String(5000), nullable=True)
  editorial_review = db.Column(db.String(5000), nullable=True)
  publication_date = db.Column(db.String, nullable=True)
  publisher= db.Column(db.String(255), nullable=True)
  cover_art = db.Column(db.String(255), nullable=True)
  pages = db.Column(db.Integer, nullable=True)

  prices = db.relationship('Price', secondary=book_prices, backref='books')
  cart_item = db.relationship("Cart_Item", uselist=False, back_populates="book")
  reviews = db.relationship("Review",cascade='all, delete-orphan', back_populates='book')
  user = db.relationship('User', back_populates='books')



  def to_dict(self):
    return {
      'id': self.id,
      'publisher_id': self.publisher_id,
      'title': self.title,
      'author': self.author,
      'genre': self.genre,
      'overview': self.overview,
      'editorial_review': self.editorial_review,
      'publication_date': self.publication_date,
      'publisher': self.publisher,
      'cover_art': self.cover_art,
      'pages': self.pages,
      'prices': [price.to_dict() for price in self.prices]
  }
