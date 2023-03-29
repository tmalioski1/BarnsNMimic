
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
    print('this is the user_id---', user_id)
    has_active_cart = Cart.query \
        .filter((Cart.user_id == user_id)) \
        .filter(Cart.purchased == False).count()

    if has_active_cart:
        cart = Cart.query \
            .filter((Cart.user_id == user_id)) \
            .filter(Cart.purchased == False).one()
    else:
        order_number = (f'FS{random.randint(10000, 100000)}')
        print('order_number---', order_number)
        cart = Cart(user_id=user_id, total_price=0, purchased=False, order_number=order_number)
        db.session.add(cart)
    print('this is the cart---', cart)
    book_id = request.json.get('book_id')


    book = Book.query.get(book_id)
    print('this is the book---', book)

    if book is None:
        return jsonify({"message": "Book not found."}), 404



    form = CartItemForm(request.form)
    print('this is the form---', form)
    if form.validate_on_submit():
        print('successfull validation')
        cart_item = CartItem()
        form.populate_obj(cart_item)
        db.session.add(cart_item)
        db.session.commit()

        return jsonify(cart_item.to_dict()), 201

    return jsonify({"message": "Invalid data."}), 400


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
    print('this is the cart_item---', cart_item)

    if not cart_item or cart_item.cart_id != cart.id:
        return jsonify({'error': 'invalid cart item id'})

    form = CartItemForm(request.form)

    if form.validate_on_submit():
        print('successfully validated')
        cart_item.quantity = form.quantity.data
        cart_item.price = form.price.data
        db.session.commit()

        return cart_item.to_dict()

    return jsonify({"message": "Invalid data."}), 400


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
