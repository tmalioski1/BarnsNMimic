from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Book, Price, book_prices, Review, db
from ..forms.book_form import BookForm
from ..forms.price_form import PriceForm
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
    return jsonify({'books': [book.to_dict() for book in books]})


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
    book_form = BookForm()
    book_form['csrf_token'].data = request.cookies['csrf_token']
    price_form = PriceForm()
    price_form['csrf_token'].data = request.cookies['csrf_token']
    print('book_form.data-----',  book_form.data)
    print('price_form.data-----',  price_form.data)

    if "cover_art" not in request.files:
         print("request.files---", request.files)
         return {"errors": "cover"}

    cover_art = request.files['cover_art']

    if not allowed_file(cover_art.filename):
        return {"errors": "file type not permitted"}, 400

    print('pre validation--------')

    if  book_form.validate_on_submit() and price_form.validate_on_submit():
        print('past validation--------')
        cover_art.filename = get_unique_filename(cover_art.filename)
        print('this is the coverart--------', cover_art)
        upload = upload_file_to_s3(cover_art)
        print('upload--------', upload)
        if "url" not in upload:
            print('is the url not in upload?---')
            # if the dictionary doesn't have a url key
            # it means that there was an error when we tried to upload
            # so we send back that error message
            return upload, 400

        url = upload["url"]
        new_price= Price()
        price_form.populate_obj(new_price)
        new_book = Book()
        book_form.populate_obj(new_book)
        new_book.prices=[new_price]
        new_book.cover_art = url
        db.session.add(new_price)
        db.session.add(new_book)
        db.session.commit()
        return new_book.to_dict(), 201

    if  book_form.errors:
        print('here is an error')
        return {
            "errors":  book_form.errors

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

    book = Book.query.get(book_id)
    if not book:
        return {"errors": "Book not found"}, 404

    book_form = BookForm()
    book_form['csrf_token'].data = request.cookies['csrf_token']
    price_form = PriceForm()
    price_form['csrf_token'].data = request.cookies['csrf_token']

    if "cover_art" not in request.files:
         print("request.files---", request.files)
         return {"errors": "cover"}

    cover_art = request.files['cover_art']

    if not allowed_file(cover_art.filename):
        return {"errors": "file type not permitted"}, 400

    if not book_form.validate_on_submit() or not price_form.validate_on_submit():
        return {"errors": book_form.errors}, 400


    cover_art.filename = get_unique_filename(cover_art.filename)
    upload = upload_file_to_s3(cover_art)
    if "url" not in upload:
            # if the dictionary doesn't have a url key
            # it means that there was an error when we tried to upload
            # so we send back that error message
            return upload, 400

    url = upload["url"]

    # Update Book details
    book_form.populate_obj(book)
    book.cover_art = url
    db.session.add(book)

    # Update Price
    new_price = Price()
    price_form.populate_obj(new_price)
    db.session.add(new_price)
    db.session.flush()

    # Update join table entry
    book_price = book_prices.update().where(
        book_prices.c.book_id == book_id).values(price_id=new_price.id)
    db.session.execute(book_price)

    db.session.commit()
    return book.to_dict(), 200





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




# @book_routes.route('/selected_price/<int:book_id>', methods = ['PUT'])

# def book_price(book_id):
#     book = Book.query.get(book_id)
#     # print('this is the book in the backend route-----', book)
#     # print('this is the book_id in the backend route-----', book_id)
#     print('this is the request for updating price----', request.get_json())

#     if not book:
#          return jsonify({'error': 'Book not found'}), 404


#     request_data = request.get_json()
#     selected_format = request_data.get('selected_format')

#     if selected_format == 'paperback':
#         selected_price = book.price_paperback
#     elif selected_format == 'hardcover':
#         selected_price = book.price_hardcover
#     elif selected_format == 'eBook':
#          selected_price = book.price_eBook
#     else:
#         # Return 400 Bad Request response if user selection is invalid
#         return jsonify({'error': 'Invalid book format'}), 400

#     # Update book data with selected price and return updated book as response
#     book.selected_price = selected_price
#     db.session.commit()
#     return jsonify({
#         'id': book.id,
#         'title': book.title,
#         'author': book.author,
#         'paperback_price': book.price_paperback,
#         'hardcover_price': book.price_hardcover,
#         'eBook_price': book.price_eBook,
#         'genre': book.genre,
#         'overview': book.overview,
#         'editorial_review': book.editorial_review,
#         'publication_date': book.publication_date,
#         'publisher': book.publisher,
#         'cover_art': book.cover_art,
#         'pages': book.pages,
#         'selected_format': selected_format,
#         'selected_price': book.selected_price
#     })
