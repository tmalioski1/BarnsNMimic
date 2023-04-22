import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { getCart } from "../../store/carts";
import { removeCartItem } from "../../store/cart_items";
import SelectField from "./SelectField"
import './checkout.css'

const Checkout = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const cartItems = Object.values(cart.cartItems);


  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  let totalPrice = 0;
  if (!cart || !cart.cartItems) return null;

    return (
    <>
    <div className='cart-header'>
     <h1>My Shopping Cart</h1>
     </div>
     <div className="cart-item-container">
      {cartItems.map(item => (
      <div className="one-cart-item" key={item.id}>
      <NavLink to={`/books/${item.book.id}`}>
        <img className='cart-item-image'
        src={item.book.cover_art}
        alt="cart item"
        />
      </NavLink>
      <div className="cart-item-title-and-author">
      <div className="cart-item-title">{item.book.title}</div>
      <div className="cart-item-author">{`by ${item.book.author}`}</div>
      </div>
      <div className="cart-quantity-container">
                <SelectField currentItem={item} />
              </div>
      <div className="cart-item-remove-or-homepage">
        <div className='cart-item-remove'>
              <button
                className="cart-remove-button"
                onClick={async () => {
                  await dispatch(removeCartItem(item.id));
                  dispatch(getCart());
                }}
              >
                REMOVE
              </button>
              </div>
          <div className='cart-item-homepage'>
            <NavLink to={`/`}>
              Save for Later
            </NavLink>
          </div>
         <div className="cart-quantity-and-price">
              <div className="cart-item-checkout-price">
                 ${item.book.price_paperback.toFixed(2)}
              </div>
              <div className="cart-item-checkout-quantity">
              {item.quantity}
            </div>
            <div className="cart-item-checkout-price-total">
                 ${(item.book.price_paperback * item.quantity).toFixed(2)}
                 {(totalPrice += item.book.price_paperback * item.quantity) && false}
              </div>
            </div>
        </div>
        <div className="cart-total-container">
          <span className="cart-total-text">TOTAL</span>
          <span className="cart-total-price">
            ${totalPrice.toFixed(2)}
          </span>
        </div>
      </div>
      ))}



     </div>
     </>
    );
  }

  export default Checkout;
