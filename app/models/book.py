from .db import db, environment, SCHEMA, add_prefix_for_prod


class Book(db.Model):
  __tablename__ = 'books'

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  publisher_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
  title = db.Column(db.String(255), nullable=False)
  author = db.Column(db.String(255), nullable=False)
  selected_price = db.Column(db.Float, nullable=True)
  price_paperback = db.Column(db.Float, nullable=True)
  price_hardcover = db.Column(db.Float, nullable=True)
  price_eBook = db.Column(db.Float, nullable=True)
  genre = db.Column(db.String(255), nullable=True)
  overview = db.Column(db.String(5000), nullable=True)
  editorial_review = db.Column(db.String(5000), nullable=True)
  publication_date = db.Column(db.String, nullable=True)
  publisher= db.Column(db.String(255), nullable=True)
  cover_art = db.Column(db.String(255), nullable=True)
  pages = db.Column(db.Integer, nullable=True)


  cart_item = db.relationship("Cart_Item", uselist=False, back_populates="book")
  reviews = db.relationship("Review",cascade='all, delete-orphan', back_populates='book')
  user = db.relationship('User', back_populates='books')


  def to_dict(self):
    return {
      'id': self.id,
      'publisher_id': self.publisher_id,
      'title': self.title,
      'author': self.author,
      "selected_price": self.selected_price,
      'price_paperback': self.price_paperback,
      'price_hardcover': self.price_hardcover,
      'price_eBook': self.price_eBook,
      'genre': self.genre,
      'overview': self.overview,
      'editorial_review': self.editorial_review,
      'publication_date': self.publication_date,
      'publisher': self.publisher,
      'cover_art': self.cover_art,
      'pages': self.pages,
  }
