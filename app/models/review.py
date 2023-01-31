from .db import db, environment, SCHEMA, add_prefix_for_prod

class Review(db.Model):
    __tablename__='reviews'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id'), ondelete='CASCADE'),  nullable=False)
    book_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('books.id'), ondelete='CASCADE'),  nullable=False)
    stars = db.Column(db.Integer, nullable=False)
    review_txt = db.Column(db.String(5000), nullable=False)
    recommended = db.Column(db.Boolean, nullable=False)
    spoilers = db.Column(db.Boolean, nullable=False)


    book = db.relationship('Book', back_populates='reviews')
    user = db.relationship('User', back_populates='reviews')

    def to_dict(self):
        return{
            "id": self.id,
            "user_id": self.user_id,
            "book_id": self.book_id,
            "stars": self.stars,
            "review_txt": self.review_txt,
            "recommended": self.recommended,
            "spoilers": self.spoilers

        }
