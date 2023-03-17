
from flask import Blueprint, session, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Cart, Book, CartItem
from sqlalchemy.orm import joinedload



cart_routes = Blueprint('cart', __name__)


@cart_routes.route('/')
def get_cart():
    cart_items = CartItem.query.all()
    return {'cartItems': [cart_items.to_dict() for cart_items in cart_items]}, 200


@cart_routes.route('/newItem/<int:id>', methods = ['POST'])
def add_cart():
    """
    A user can send a post request to add a product to their currently active cart.
    """
    if current_user.is_authenticated:
        user_id = current_user.get_id()
    else:
        user_id = None

    has_active_cart = Cart.query \
        .filter((Cart.user_id == user_id) | (Cart.user_id == None)) \
        .filter(Cart.purchased == False).count()

    if has_active_cart:
        cart = Cart.query \
            .filter((Cart.user_id == user_id) | (Cart.user_id == None)) \
            .filter(Cart.purchased == False).one()

    else:
        cart = Cart(user_id=user_id, total=0, purchased=False)
        db.session.add(cart)

    # Get the book based on the _id
    book = Book.query.get(request.json['book_id'])

    # Determine the price based on the selected format
    price = book.price_paperback
    if request.json['selected_format'] == 'hardcover':
        price = book.price_hardcover
    elif request.json['selected_format'] == 'ebook':
        price = book.price_eBook

    # Create the new cart item with the correct price
    new_cart_item = CartItem(
        cart_id=cart.to_dict()["id"],
        book_id=request.json['book_id'],
        quantity=1
    )

    db.session.add(new_cart_item)

    # Update the cart total price to include the price of the new cart item
    
    db.session.commit()

    return new_cart_item.to_dict()

# @cart_routes.route('/addItem/<int:id>', methods=['POST'])
# def add_one_in_cart(id):
#     cart_item = Cart_Item.query.get(id)
#     cart_item.quantity += 1
#     cart_item.total_item_price += cart_item.price
#     cart = Cart.query.get(cart_item.cart_id)
#     cart.total_price += cart_item.price
#     db.session.commit()
#     return cart_item.to_dict()




@cart_routes.route('/minus/<int:id>', methods=['POST'])
def minus_one_in_cart(id):
    cart_item = CartItem.query.get(id)
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
    cart_item = CartItem.query.get(id)
    removed_price = cart_item.total_item_price * cart_item.quantity
    cart_list = CartItem.query.filter(CartItem.cart_id == cart_item.cart_id).all()
    db.session.delete(cart_item)
    cart = Cart.query.get(cart_item.cart_id)
    cart.total_price -= removed_price
    if len(cart_list) == 0:
        db.session.delete(cart)
    db.session.commit()
    return cart_item.to_dict()



@cart_routes.route('/checkout/<int:id>', methods=['DELETE'])
def checkout_cart(id):
    cart_items = CartItem.query.filter(CartItem.cart_id == id).all()
    [db.session.delete(item) for item in cart_items]
    db.session.commit()
    return cart_items.to_dict()
