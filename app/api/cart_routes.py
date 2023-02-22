
from flask import Blueprint, session
from flask_login import login_required, current_user
from app.models import db, Cart, Book, Cart_Item, Order



cart_routes = Blueprint('cart', __name__)


@cart_routes.route('/')
def get_cart():
    cart_items = Cart_Item.query.all()
    return {'cartItems': [cart_items.to_dict() for cart_items in cart_items]}, 200


@cart_routes.route('/newItem/<int:id>', methods = ['POST'])
def add_cart(id):
    if current_user.is_authenticated:
        current_cart = Cart.query.filter(
            Cart.user_id == current_user.id).first()

        if not current_cart:
            current_cart = Cart(user_id=current_user.id)
            db.session.add(current_cart)
            db.session.commit()

    else:
        current_cart = Cart.query.filter(Cart.user_id == None).first()
        if not current_cart:
            current_cart= Cart(user_id=None)
            db.session.add(current_cart)
            db.session.commit()

    book = Book.query.get(id)
    add_item = Cart_Item.query.filter(Cart_Item.book_id == book.id).first()

    if not add_item:
        add_item = Cart_Item(
            book_id=book.id,
            cart_id=current_cart.id,
            title= book.title,
            author= book.author,
            quantity=1,
            price = current_cart.price,
            total_item_price=current_cart.total_item_price

        )


    else:
        add_item.quantity += 1
        add_item.total_item_price += book.price_paperback
        current_cart.total_price += book.price
        db.session.add(add_item)
        db.session.commit()
        return add_item.to_dict()


@cart_routes.route('/addItem/<int:id>', methods=['POST'])
def add_one_in_cart(id):
    cart_item = Cart_Item.query.get(id)
    cart_item.quantity += 1
    cart_item.total_item_price += cart_item.price
    cart = Cart.query.get(cart_item.cart_id)
    cart.total_price += cart_item.price
    db.session.commit()
    return cart_item.to_dict()

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
