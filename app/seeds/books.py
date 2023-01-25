from app.models import db, Book, environment, SCHEMA
import datetime

def seed_books():
  demo_book = Book(
    publisher_id = 1, title='The Prince', author= 'Niccolò Machiavelli',  type= 'Hardcover', price_paperback=12.50, price_hardcover=20.95, genre='Non-Fiction', overview= 'A timeless classic!', editorial_review= 'Continues to captivate centuries later!', publication_date= datetime.date(2017, 5, 29), publisher= 'Fall River Press', cover_art='https://m.media-amazon.com/images/I/41r6dW8dd5L._SL500_.jpg', pages= 128, sales_rank= 7537)
  demo_book2 = Book(
    publisher_id = 2, title='Meditations', author= 'Marcus Aurelius',  type= 'Paperback', price_paperback=9.50, price_hardcover=24.00, genre='Non-Fiction', overview= 'A true masterpiece!', editorial_review= 'Ancient wisdom still relevant for today.', publication_date= datetime.date(2006, 10, 31), publisher= 'Penguin Publishing Group', cover_art='https://kbimages1-a.akamaihd.net/233196f9-1586-481b-8e71-f8d08357337b/1200/1200/False/meditations-41.jpg', pages= 304, sales_rank= 1551)
  demo_book3 = Book(
    publisher_id = 3,  title='Do Androids Dream of Electric Sheep?', author= 'Philip K. Dick',  type= 'eBook', price_paperback=15.30, price_eBook=13.99, genre='Science Fiction', overview= 'Thrilling!', editorial_review= 'Thought provoking.', publication_date= datetime.date(1996, 5, 28), publisher= 'Random House Worlds', cover_art='https://m.media-amazon.com/images/I/41zIEWqtWYL._SX331_BO1,204,203,200_.jpg', pages= 240, sales_rank= 4853)

  db.session.add(demo_book)
  db.session.add(demo_book2)
  db.session.add(demo_book3)
  db.session.commit()


def undo_books():
  if environment == "production":
    db.session.execute(f"TRUNCATE table {SCHEMA}.books RESTART IDENTITY CASCADE;")
  else:
    db.session.execute("DELETE FROM books")

  db.session.commit()
