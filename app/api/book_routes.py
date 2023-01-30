from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Book, db
from ..forms.book_form import BookForm


book_routes = Blueprint('books', __name__)


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
    print('outside form validation')
    if form.validate_on_submit():
        new_book = Book()
        form.populate_obj(new_book)
        print('inside form validation')
        db.session.add(new_book)
        db.session.commit()
        return new_book.to_dict(), 201

    if form.errors:
        return {
            "errors": form.errors

        }, 400



# update book by id
@book_routes.route('/<int:book_id>', methods=['PUT'])
@login_required
def update_song(book_id):

    current_book = Book.query.get(book_id)
    print('before-------')
    form = BookForm()
    print('this is the form------', form)
    form['csrf_token'].data = request.cookies['csrf_token']
    print('after-------', form)
    if form.validate_on_submit():

        form.populate_obj(current_book)
        db.session.add(current_book)
        db.session.commit()
        return current_book.to_dict(), 201

    print('this is the form errors------', form.errors)


# delete book by id
@book_routes.route('/<int:book_id>', methods=['DELETE'])
@login_required
def delete_book(book_id):
    deleted_book = Book.query.get(book_id)
    db.session.delete(deleted_book)
    db.session.commit()

    return {"message": 'successfully deleted'}
