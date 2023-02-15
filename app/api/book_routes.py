from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Book, Review, db
from ..forms.book_form import BookForm
from ..forms.review_form import ReviewForm
from app.aws_functionality import (
    upload_file_to_s3, allowed_file, get_unique_filename)

book_routes = Blueprint('books', __name__)

# get all reviews based on bookID for book detials page
@book_routes.route('/<int:id>/reviews')
def all_reviews(id):
    reviews = Review.query.filter(Review.book_id == id)

    return {'reviews' :[review.to_dict() for review in reviews]} , 200


# get all books for homepage
@book_routes.route('/')
def all_books():
    books = Book.query.all()

    return {'books': [book.to_dict() for book in books]}


#get a book by ID for book details page
@book_routes.route('/<int:id>')
def book(id):
    book = Book.query.get(id)

    if not book:
        return {"errors": "Book not found"}, 404

    return {'book': book.to_dict()} , 200


#post a book
@book_routes.route('/', methods = ['POST'])
@login_required
def new_book():
    form = BookForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    print('made it here')
    print('form.data-----', form.data)
    print('request.files-----', request.files)

    if "cover_art" not in request.files:
         print("request.files", request.files)
         return {"errors": "cover"}

    cover_art = request.files['cover_art']

    if not allowed_file(cover_art.filename):
        return {"errors": "file type not permitted"}, 400

    print('pre validation--------')

    if form.validate_on_submit():
        print('past validation--------')
        cover_art.filename = get_unique_filename(cover_art.filename)
        upload = upload_file_to_s3(cover_art)
        print('upload--------', upload)
        if "url" not in upload:
            # if the dictionary doesn't have a url key
            # it means that there was an error when we tried to upload
            # so we send back that error message
            return upload, 400

        url = upload["url"]

        new_book = Book()
        form.populate_obj(new_book)
        new_book.cover_art = url
        db.session.add(new_book)
        db.session.commit()
        return new_book.to_dict(), 201

    if form.errors:
        return {
            "errors": form.errors

        }, 400

#post review
@book_routes.route('/<int:id>/reviews/new', methods=['POST'])
@login_required
def post_review(id):

    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():

        new_review = Review()
        form.populate_obj(new_review)

        db.session.add(new_review)
        db.session.commit()

        return new_review.to_dict(), 200


    if form.errors:
        return {
            "errors": form.errors
        }, 400


# update book by id
@book_routes.route('/<int:book_id>', methods=['PUT'])
@login_required
def update_book(book_id):

    current_book = Book.query.get(book_id)
    form = BookForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():

        form.populate_obj(current_book)
        db.session.add(current_book)
        db.session.commit()
        return current_book.to_dict(), 201


#update review
@book_routes.route('/reviews/<int:review_id>', methods=['PUT'])
@login_required
def update_review(review_id):


    updated_review = Review.query.get(review_id)
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        form.populate_obj(updated_review)

        db.session.add(updated_review)
        db.session.commit()
        return updated_review.to_dict(), 201
    else:
        return form.errors


# delete book by id
@book_routes.route('/<int:book_id>', methods=['DELETE'])
@login_required
def delete_book(book_id):
    deleted_book = Book.query.get(book_id)
    db.session.delete(deleted_book)
    db.session.commit()

    return {"message": 'successfully deleted'}


#delete review by id
@book_routes.route('/reviews/<int:review_id>', methods=['DELETE'])
@login_required
def delete_review(review_id):

    deleted_review = Review.query.get(review_id)

    db.session.delete(deleted_review)
    db.session.commit()

    return {"message": 'successfully deleted'}
