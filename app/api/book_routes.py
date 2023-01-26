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
@login_required
def book(id):
    book = Book.query.get(id)

    if not book:
        return {"errors": "Song not found"}, 404

    return {'book': book.to_dict()} , 200


#post a book
@book_routes.route('/', methods = ['POST'])
@login_required
def new_book():
    form = BookForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_book = Book()
        form.populate_obj(new_book)

        db.session.add(new_book)
        db.session.commit()
        return new_book.to_dict(), 201

    if form.errors:
        return {
            "errors": form.errors
        }, 400
