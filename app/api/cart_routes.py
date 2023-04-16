
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

def add_cart(format):
    print('format argument:', format)

    user_id = current_user.get_id()

    # Check if user has an active cart
    cart = Cart.query \
        .filter((Cart.user_id == user_id)) \
        .filter(Cart.purchased == False).first()

    if not cart:
        order_number = (f'FS{random.randint(10000, 100000)}')
        cart = Cart(user_id=user_id, total_price=0, purchased=False, order_number=order_number)
        db.session.add(cart)

    book = Book.query.get(request.json['book_id'])
    price = book.price_paperback

    if format == 'price_hardcover':
        price = book.price_hardcover
    elif format == 'price_eBook':
        price = book.price_eBook

    # Check if book already exists in cart
    cart_item = CartItem.query \
        .filter(CartItem.cart_id == cart.id) \
        .filter(CartItem.book_id == book.id) \
        .first()

    if cart_item:
        # Update quantity and price of existing cart item
        cart_item.quantity += 1
        if cart_item.price != price:
            cart_item = CartItem(
                cart_id=cart.id,
                book_id=book.id,
                quantity=1,
                price=price
            )
            db.session.add(cart_item)
    else:
        # Create new cart item
        cart_item = CartItem(
            cart_id=cart.id,
            book_id=book.id,
            quantity=1,
            price=price
        )
        db.session.add(cart_item)

    # Update total price of cart
    cart.total_price += price
    db.session.commit()

    return cart_item.to_dict()

@cart_routes.route("/<int:id>", methods=["PUT"])
@login_required
def update_cart_item(id):
    """
    Query for a single cart item by id from the current user's active cart and update the quantity.
    """
    print('hi, this is PUT')
    cart_item = CartItem.query.get(id)
    print('this is the cart_item---', cart_item)

    setattr(cart_item, "quantity", request.json['quantity'])
    print('this is the quantity---', cart_item.quantity)
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
