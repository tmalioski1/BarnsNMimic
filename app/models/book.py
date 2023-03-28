from .db import db, environment, SCHEMA, add_prefix_for_prod
from .wishlist import wishlists



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
  price_paperback = db.Column(db.Float, nullable=True)
  price_hardcover = db.Column(db.Float, nullable=True)
  price_eBook = db.Column(db.Float, nullable=True)
  cover_art = db.Column(db.String(255), nullable=True)
  pages = db.Column(db.Integer, nullable=True)


  cart_item = db.relationship("CartItem", back_populates="book", cascade="all, delete-orphan")
  reviews = db.relationship("Review", cascade='all, delete-orphan', back_populates='book')
  user = db.relationship('User', back_populates='books')
  book_wishlists = db.relationship('User', secondary=wishlists, back_populates='user_wishlists')


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
      'price_paperback': self.price_paperback,
      'price_hardcover': self.price_hardcover,
      'price_eBook': self.price_eBook,
      'pages': self.pages,
  }

  def __repr__(self):
      return f"<Book {self.id}: {self.title}>"

  def get_price(self, format):
        if format == 'paperback':
            return self.price_paperback
        elif format == 'hardcover':
            return self.price_hardcover
        elif format == 'eBook':
            return self.price_eBook
        else:
            return None
