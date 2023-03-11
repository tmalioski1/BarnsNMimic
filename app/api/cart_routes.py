
from flask import Blueprint, session, request
from flask_login import login_required, current_user
from app.models import db, Cart, Book, Cart_Item, Order
from sqlalchemy.orm import joinedload



cart_routes = Blueprint('cart', __name__)



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

    data = request.json
    book = Book.query.get(id)
    price_format = data.get('price_format')

    if price_format == 'price_paperback':
        price = book.prices[0].price_paperback
    elif price_format == 'price_hardcover':
        price = book.prices[0].price_hardcover
    elif price_format == 'price_eBook':
        price = book.prices[0].price_eBook
    else:
        return {'error': 'Invalid price format'}

    cart_item = Cart_Item(
        book_id=id,
        quantity=1,
        price=price,
        total_item_price=price
    )

    current_cart.cart_items.append(cart_item)
    current_cart.cart.total_price += price
    db.session.add(cart_item)
    db.session.commit()

    return current_cart.to_dict(), 201








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
