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
            purchased = False,
            order_number= (f'FS{random.randint(10000, 100000)}')
        )
        db.session.add(cart)
        db.session.commit()

        return cart.to_dict()

@cart_routes.route("", methods=["POST"])
@login_required
def create_cart_item():
    """
    A logged-in user can send a post request to add a product to their currently active cart.
    """
    has_active_cart = Cart.query \
        .filter(Cart.user_id == current_user.get_id()) \
        .filter(Cart.purchased == False).count()

    if has_active_cart:
        cart = Cart.query \
            .filter(Cart.user_id == current_user.get_id()) \
            .filter(Cart.purchased == False).one()

        book = Book.query.get(request.json['book_id'])
        button_clicked = request.json.get('button_clicked')

        if button_clicked == 'paperback':
            price = book.price_paperback
        elif button_clicked == 'hardcover':
            price = book.price_hardcover
        elif button_clicked == 'eBook':
            price = book.price_eBook
        else:
            return jsonify(error='Invalid button clicked'), 400

        new_cart_item = CartItem(
            cart_id=cart.to_dict()["id"],
            book_id=request.json['book_id'],
            quantity=1,
            price=price,
            added=False
        )

        db.session.add(new_cart_item)
        db.session.commit()

        return new_cart_item.to_dict()

    else:
        order_number = f'FS{random.randint(10000, 100000)}'
        cart = Cart(
            user_id=current_user.get_id(),
            total_price=0,
            purchased=False,
            order_number=order_number
        )
        db.session.add(cart)
        db.session.commit()

        book = Book.query.get(request.json['book_id'])
        button_clicked = request.json.get('button_clicked')

        if button_clicked == 'paperback':
            price = book.price_paperback
        elif button_clicked == 'hardcover':
            price = book.price_hardcover
        elif button_clicked == 'eBook':
            price = book.price_eBook
        else:
            return jsonify(error='Invalid button clicked'), 400

        new_cart_item = CartItem(
            cart_id=cart.to_dict()["id"],
            book_id=request.json['book_id'],
            quantity=1,
            price=price,
            added=False
        )

        db.session.add(new_cart_item)
        db.session.commit()

        return new_cart_item.to_dict()




@cart_routes.route("/<int:id>", methods=["PUT"])
@login_required
def update_cart_item(id):
    """
    Query for a single cart item by id and add the item to the cart.
    """
    cart_item = CartItem.query.get(id)
    existing_cart_item = CartItem.query.filter_by(book_id=cart_item.book_id, price=cart_item.price, added=True).first()
    if existing_cart_item:
        setattr(existing_cart_item, "quantity", request.json['quantity'])
        return existing_cart_item.to_dict()
    else:
        setattr(cart_item, "added", True)
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
