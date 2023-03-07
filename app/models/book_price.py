from .db import db, environment,SCHEMA, add_prefix_for_prod

book_prices = db.Table(
    'book_prices',
    db.Model.metadata,
    db.Column('book_id', db.Integer, db.ForeignKey(add_prefix_for_prod('books.id')), primary_key=True ),
    db.Column('price_id', db.Integer, db.ForeignKey(add_prefix_for_prod('prices.id')), primary_key=True )
)

if environment == "production":
    book_prices.schema = SCHEMA
