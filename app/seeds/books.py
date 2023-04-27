from app.models import db, Book, environment, SCHEMA
import datetime

def seed_books():
  demo_book = Book(
    publisher_id = 1, title='The Prince', author= 'Niccolò Machiavelli',  price_paperback=12.50, price_hardcover=20.95, price_eBook=10.95, genre='Non-Fiction', overview= 'A timeless classic!', editorial_review= 'Continues to captivate centuries later!', publication_date= '05/29/2017', publisher= 'Fall River Press', cover_art='https://m.media-amazon.com/images/I/41r6dW8dd5L._SL500_.jpg', pages= 128)
  demo_book2 = Book(
    publisher_id = 3, title='Meditations', author= 'Marcus Aurelius',  price_paperback=9.50, price_hardcover=24.00, price_eBook=10.95, genre='Non-Fiction', overview= 'A true masterpiece!', editorial_review= 'Ancient wisdom still relevant for today.', publication_date= '02/10/1996', publisher= 'Penguin Publishing Group', cover_art='https://kbimages1-a.akamaihd.net/233196f9-1586-481b-8e71-f8d08357337b/1200/1200/False/meditations-41.jpg', pages= 304)
  demo_book3 = Book(
    publisher_id = 3,  title='Do Androids Dream of Electric Sheep?', author= 'Philip K. Dick', price_paperback=15.30, price_hardcover=24.00, price_eBook=13.99, genre='Science Fiction', overview= 'Thrilling!', editorial_review= 'Thought provoking.', publication_date= '04/26/2014', publisher= 'Random House Worlds', cover_art='https://m.media-amazon.com/images/I/41zIEWqtWYL._SX331_BO1,204,203,200_.jpg', pages= 240)
  demo_book4 = Book(
    publisher_id = 3,  title='The Godfather', author= 'Mario Puzo', price_paperback=15.99, price_hardcover=32.50, price_eBook=12.99, genre='Fiction', overview= 'With its brilliant and brutal portrayal of the Corleone family, The Godfather burned its way into our national consciousness. This unforgettable saga of crime and corruption, passion and loyalty continues to stand the test of time, as the definitive novel of the Mafia underworld.', editorial_review= 'A staggering triumph...The definitive novel about a sinister fraternity of crime.”—The Saturday Review', publication_date= '04/26/1969', publisher= 'Penguin Publishing Group', cover_art='https://prodimage.images-bn.com/pimages/9780451205766_p0_v5_s1200x630.jpg', pages= 448)
  demo_book5 = Book(
    publisher_id = 3,  title='Democracy Awakening: Notes on the State of America', author= 'Heather Cox Richardson', price_paperback=15.99, price_hardcover=3.00, price_eBook=12.99, genre='Fiction', overview= 'With its brilliant and brutal portrayal of the Corleone family, The Godfather burned its way into our national consciousness. This unforgettable saga of crime and corruption, passion and loyalty continues to stand the test of time, as the definitive novel of the Mafia underworld.', editorial_review= 'A staggering triumph...The definitive novel about a sinister fraternity of crime.”—The Saturday Review', publication_date= '04/26/1969', publisher= 'Penguin Publishing Group', cover_art='https://prodimage.images-bn.com/pimages/9780451205766_p0_v5_s1200x630.jpg', pages= 448)

  db.session.add(demo_book)
  db.session.add(demo_book2)
  db.session.add(demo_book3)
  db.session.add(demo_book4)
  db.session.add(demo_book5)
  db.session.commit()



def undo_books():
  if environment == "production":
    db.session.execute(f"TRUNCATE table {SCHEMA}.books RESTART IDENTITY CASCADE;")
  else:
    db.session.execute("DELETE FROM books")

  db.session.commit()
