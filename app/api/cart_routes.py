
from flask import Blueprint, session, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Cart, Book, CartItem
from ..forms.cart_item_form import CartItemForm
from sqlalchemy.orm import joinedload
import random



cart_routes = Blueprint('cart', __name__)


@cart_routes.route("")
@login_required
def get_cart():
    """
    Query for logged-in user's active cart and returns it as a dictionary.
    """
    has_active_cart = Cart.query \
        .filter(Cart.user_id == current_user.get_id()) \
        .filter(Cart.purchased == False).count()

    if has_active_cart:
        cart = Cart.query \
            .filter(Cart.user_id == current_user.get_id()) \
            .filter(Cart.purchased == False).one()

        return cart.to_dict()

    else:
        cart = Cart(
            user_id = current_user.get_id(),
            total_price = 0,
            purchased = False,
            order_number= (f'FS{random.randint(10000, 100000)}')
        )
        db.session.add(cart)
        db.session.commit()

        return cart.to_dict()


@cart_routes.route('', methods=['POST'])
@login_required
def add_cart():
    user_id = current_user.get_id()
    has_active_cart = Cart.query \
        .filter((Cart.user_id == user_id)) \
        .filter(Cart.purchased == False).count()

    if has_active_cart:
        cart = Cart.query \
            .filter((Cart.user_id == user_id)) \
            .filter(Cart.purchased == False).one()
    else:
        order_number = (f'FS{random.randint(10000, 100000)}')
        cart = Cart(user_id=user_id, total_price=0, purchased=False, order_number=order_number)
        db.session.add(cart)

    book_id = request.json.get('book_id')
    book_format = request.json.get('format')

    book = Book.query.get(book_id)

    if book is None:
        return jsonify({"message": "Book not found."}), 404

    price = book.get_price(book_format)

    if price is None:
        return jsonify({"message": "Invalid format."}), 400

    cart_item = CartItem(
        cart_id=cart.id,
        book_id=book.id,
        quantity=1,
        price=price
    )

    db.session.add(cart_item)
    db.session.commit()

    return jsonify(cart_item.to_dict()), 201

@cart_routes.route("/<int:id>", methods=["PUT"])
@login_required
def update_cart_item(id):
    """
    Query for a single cart item by id from the current user's active cart and update the quantity.
    """
    user_id = current_user.get_id()
    cart = Cart.query.filter_by(user_id=user_id, purchased=False).first()

    if not cart:
        return jsonify({'error': 'no active cart found'})

    cart_item = CartItem.query.get(id)

    if not cart_item or cart_item.cart_id != cart.id:
        return jsonify({'error': 'invalid cart item id'})

    quantity = request.json.get('quantity', None)

    if not quantity:
        return jsonify({'error': 'quantity is required'})

    cart_item.quantity = quantity
    db.session.commit()

    return cart_item.to_dict()


@cart_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_cart_item(id):
    """
    Query for a single cart item by id and delete the cart item from the current user's active cart.
    """
    cart_item = CartItem.query.get(id)
    db.session.delete(cart_item)
    db.session.commit()
    return {
        'message': 'Successfully deleted',
        'status_code': 200
    }

@cart_routes.route("", methods=["PUT"])
@login_required
def purchase_cart():
    """
    Query for the current user's current cart and set the cart's purchased status to True.
    """
    cart = Cart.query \
            .filter(Cart.user_id == current_user.get_id()) \
            .filter(Cart.purchased == False).one()

    setattr(cart, "purchased", True)
    setattr(cart, "total", request.json['total'])
    db.session.commit()
    return cart.to_dict()


@cart_routes.route("/history")
@login_required
def get_history():
    """
    Query for the current user's purchased carts and and return them in a list of cart dictionaries.
    """
    carts = Cart.query \
                .filter(Cart.user_id == current_user.get_id()) \
                .filter(Cart.purchased == True).all()

    return {"OrderHistory": [cart.to_dict() for cart in carts]}
