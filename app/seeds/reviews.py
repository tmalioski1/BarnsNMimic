from app.models import db, Review, environment, SCHEMA

# Adds a comment1 user, you can add other users here if you want
def seed_reviews():
    review1 = Review(
        user_id= 1, book_id=2, stars= 5, review_title = 'Masterpiece', review_txt = 'Amazing book, could not put it down.  Another triumph by the author!', recommended='Yes', spoilers='No')
    review2 = Review(
        user_id= 2, book_id=3, stars= 1, review_title = 'Just terrible', review_txt = 'Pure drivel.  I want my money back.  Wish nothing but the worst on the author and his fans.', recommended='No', spoilers='Yes')
    review3 = Review(
        user_id= 3, book_id=1, stars= 3, review_title = 'Pretty average', review_txt = 'I could go either way with this book.  Definitely has its flaws, but some great strengths as well.', recommended='Yes', spoilers='No')
    review4 = Review(
        user_id= 3, book_id=2, stars= 3, review_title = 'Flawed yet compelling', review_txt = 'The author makes his points well but could have done so in a more concise manner.  Would still recommend this book for fans of the genre.  The main character dies.', recommended='Yes', spoilers='Yes')



    db.session.add(review1)
    db.session.add(review2)
    db.session.add(review3)
    db.session.add(review4)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM reviews")

    db.session.commit()
