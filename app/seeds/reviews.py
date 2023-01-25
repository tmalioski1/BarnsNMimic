from app.models import db, Review, environment, SCHEMA


# Adds a comment1 user, you can add other users here if you want
def seed_reviews():
    review1 = Review(
        user_id= 1, book_id=1, stars= 5, review_txt = 'Amazing book', recommended= 'Yes', spoilers='No')
    review2 = Review(
        user_id= 2, book_id=2, stars= 1, review_txt = 'Just terrible', recommended= 'No', spoilers='No')
    review3 = Review(
        user_id= 3, book_id=2, stars= 3, review_txt = 'Pretty average', recommended= 'Yes', spoilers='No')
    review4 = Review(
        user_id= 3, book_id=2, stars= 1, review_txt = 'Changed my mind, terrible', recommended= 'No', spoilers='No')
    review5 = Review(
        user_id= 2, book_id=2, stars= 4, review_txt = 'Didn\'t read', recommended= 'Yes', spoilers='Yes')

    db.session.add(review1)
    db.session.add(review2)
    db.session.add(review3)
    db.session.add(review4)
    db.session.add(review5)
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
