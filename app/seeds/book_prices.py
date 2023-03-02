from app.models import db, book_prices, environment, SCHEMA


def seed_book_prices():
    book_prices_1 = book_prices.insert().values(book_id=1, price_id=1)
    book_prices_2 = book_prices.insert().values(book_id=2, price_id=2)
    book_prices_3 = book_prices.insert().values(book_id=3, price_id=3)
    book_prices_4 = book_prices.insert().values(book_id=4, price_id=4)

    db.session.execute(book_prices_1)
    db.session.execute(book_prices_2)
    db.session.execute(book_prices_3)
    db.session.execute(book_prices_4)
    db.session.commit()


def undo_book_prices():
  if environment == "production":
    db.session.execute(f"TRUNCATE table {SCHEMA}.book_prices RESTART IDENTITY CASCADE;")
  else:
    db.session.execute("DELETE FROM book_prices")

  db.session.commit()
