
from flask import Blueprint, session, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Cart, Book, Order
from sqlalchemy.orm import joinedload



cart_routes = Blueprint('cart', __name__)


@cart_routes.route('/')
def get_cart():
    # cart_items = Cart_Item.query.all()
    return {'cartItems': [cart_items.to_dict() for cart_items in cart_items]}, 200


# @cart_routes.route('/newItem/<int:id>', methods = ['POST'])
# def add_cart(id):
#     if current_user.is_authenticated:
#         current_cart = Cart.query.filter(
#             Cart.user_id == current_user.id).first()

#         if not current_cart:
#             current_cart = Cart(user_id=current_user.id)
#             db.session.add(current_cart)
#             db.session.commit()

#     else:
#         current_cart = Cart.query.filter(Cart.user_id == None).first()
#         if not current_cart:
#             current_cart= Cart(user_id=None)
#             db.session.add(current_cart)
#             db.session.commit()

#     book = Book.query.get(id)
#     # add_item = Cart_Item.query.filter(Cart_Item.book_id == book.id).first()

#     if not add_item:
#         add_item = Cart_Item(
#             book_id=book.id,
#             cart_id=current_cart.id,
#             quantity=1,
#             price = book.selected_price,
#             total_item_price=book.selected_price

#         )
#         print("this is the cart's total price", current_cart.total_price)
#         print("this is the book's selected price", book.selected_price)
#         current_cart.total_price += book.selected_price
#         db.session.add(add_item)
#         db.session.commit()
#         return add_item.to_dict()


#     else:
#         add_item.quantity += 1
#         add_item.total_item_price += book.selected_price
#         current_cart.total_price += book.selected_price
#         db.session.add(add_item)
#         db.session.commit()
#         return add_item.to_dict()


@cart_routes.route('/addItem/<int:id>', methods=['POST'])
def add_one_in_cart(id):
    if current_user.is_authenticated:
        current_cart = Cart.query.filter(
            Cart.user_id == current_user.id).first()

        if not current_cart:
            current_cart = Cart(user_id=current_user.id)
            db.session.add(current_cart)
            db.session.commit()


        if selected_format == 'paperback':
            current_cart.price = book.price_paperback
        elif selected_format == 'hardcover':
            current_cart.price = book.price_hardcover
        elif selected_format == 'eBook':
            current_cart.price = book.price_eBook
        else:
        # Return 400 Bad Request response if user selection is invalid
            return jsonify({'error': 'Invalid book format'}), 400

    # current_cart.total_price += book.price

    else:
        current_cart = Cart.query.filter(Cart.user_id == None).first()
        if not current_cart:
            current_cart= Cart(user_id=None)
            db.session.add(current_cart)
            db.session.commit()
        if selected_format == 'paperback':
            current_cart.price = book.price_paperback
        elif selected_format == 'hardcover':
            current_cart.price = book.price_hardcover
        elif selected_format == 'eBook':
            current_cart.price = book.price_eBook
        else:
    # Return 400 Bad Request response if user selection is invalid
            return jsonify({'error': 'Invalid book format'}), 400

    # current_cart.total_price += book.price

        book = Book.query.get(id)
        request_data = request.get_json()
        selected_format = request_data.get('selected_format')


    db.session.commit()
    return book.to_dict()

@cart_routes.route('/minus/<int:id>', methods=['POST'])
def minus_one_in_cart(id):
    cart_item = Cart_Item.query.get(id)
    cart_item.quantity -= 1
    cart_item.total_item_price -= cart_item.price
    cart = Cart.query.get(cart_item.cart_id)
    cart.total_price -= cart_item.price
    if cart_item.quantity == 0:
        db.session.delete(cart_item)
        db.session.commit()
    db.session.commit()
    return cart_item.to_dict()

@cart_routes.route('/<int:id>', methods=['DELETE'])
def remove_from_cart(id):
    cart_item = Cart_Item.query.get(id)
    removed_price = cart_item.total_item_price * cart_item.quantity
    cart_list = Cart_Item.query.filter(Cart_Item.cart_id == cart_item.cart_id).all()
    db.session.delete(cart_item)
    cart = Cart.query.get(cart_item.cart_id)
    cart.total_price -= removed_price
    if len(cart_list) == 0:
        db.session.delete(cart)
    db.session.commit()
    return cart_item.to_dict()



@cart_routes.route('/checkout/<int:id>', methods=['DELETE'])
def checkout_cart(id):
    cart_items = Cart_Item.query.filter(Cart_Item.cart_id == id).all()
    [db.session.delete(item) for item in cart_items]
    db.session.commit()
    return cart_items.to_dict()
