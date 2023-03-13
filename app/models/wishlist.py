from .db import db, environment, SCHEMA, add_prefix_for_prod

wishlists = db.Table(
    'wishlists',
    db.Model.metadata,
    db.Column('user_id', db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), primary_key=True ),
    db.Column('book_id', db.Integer, db.ForeignKey(add_prefix_for_prod('books.id')), primary_key=True )
)








# class Wishlist(db.Model):
#     __tablename__ = 'wishlists'

#     if environment == "production":
#         __table_args__ = {'schema': SCHEMA}

#     id = db.Column(db.Integer, primary_key=True)
#     book_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('books.id')), nullable=False)
#     user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)


#     user = db.relationship('User', back_populates='user_wishlists')
#     books = db.relationship('Book', back_populates='wishlist')

#     def to_dict(self):
#         return {
#             'id': self.id,
#             'book_id': self.book_id,
#             'user_id': self.user_id,
#         }




if environment == "production":
    wishlists.schema = SCHEMA
