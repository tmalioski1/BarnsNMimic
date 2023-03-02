from app.models import db, Price, environment, SCHEMA

def seed_prices():
  price1 = Price(
    price_paperback=12.50, price_hardcover=20.95, price_eBook=10.95)
  price2 = Price(
   price_paperback=9.50, price_hardcover=24.00, price_eBook=10.95)
  price3 = Price(
    price_paperback=15.30, price_hardcover=24.00, price_eBook=13.99)
  price4 = Price(
    price_paperback=15.99, price_hardcover=32.50)


  db.session.add(price1)
  db.session.add(price2)
  db.session.add(price3)
  db.session.add(price4)
  db.session.commit()







def undo_prices():
  if environment == "production":
    db.session.execute(f"TRUNCATE table {SCHEMA}.prices RESTART IDENTITY CASCADE;")
  else:
    db.session.execute("DELETE FROM prices")

  db.session.commit()
