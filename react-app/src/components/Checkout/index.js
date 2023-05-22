import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { getCart } from "../../store/carts";
import { removeCartItem } from "../../store/cart_items";
import { purchaseCart } from '../../store/carts';
import SelectField from "./SelectField"
import './checkout.css'


const Checkout = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const cart = useSelector((state) => state.cart);
  const cartItems = cart?.cartItems ? Object.values(cart.cartItems) : [];
  const differentItemsCount = cartItems.length

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  let subTotalPrice = 0;

  const cartItemCount = (array) => {
    let sum = 0
    array.forEach(object => {
      sum += object.quantity
    })
    return sum
  }

  if (cartItems.length === 0) {
    return (
      <>
      <div className='gold-bar'> &nbsp; </div>
      <div className='greenbar-top'> &nbsp; </div>
        <h1 className='checkout-cart-empty-message'>Your cart is empty</h1>
        <div className="checkout-shop-now-button-container">
        <button className="checkout-shop-now-button" onClick={() => history.push('/')}>
  SHOP NOW
</button>
</div>
      </>
    )
  }

  return (
    <>
    <div className='gold-bar'> &nbsp; </div>
    <div className='greenbar-top'> &nbsp; </div>
    <div className='checkout-main-container'>
      <div className='checkout-details'>
        <div className='checkout-details-header-container'>
        <hr class="checkout-details-header-line"></hr>
        <h1 className='cart-checkout-header'>My Shopping Cart</h1>
        <hr class="checkout-details-header-line"></hr>
        </div>
        <div className='checkout-details-box'>


        <div className='different-item-count-container'>
          <h2>({differentItemsCount}) Items from Barnes & Noble</h2>
        </div>
      <div className="cart-items-container">
        {cartItems.map(item => (
          <div className="one-cart-item" key={item.id}>
                 <div className="cart-item-title-and-author">
              <NavLink to={`/books/${item.book.id}`} className="cart-item-title">
               {item.book.title}
              </NavLink>
              <div className="cart-item-author">{`by ${item.book.author}`}</div>
            </div>
            <div className='cart-item-image-price-info'>
              <div className='cart-item-image-format'>
            <NavLink to={`/books/${item.book.id}`}>
              <img className='cart-item-image'
                src={item.book.cover_art}
                alt="cart item"
              />
            </NavLink>
            <p className='cart-item-format'>Paperback</p>
            </div>
            <div className="cart-quantity-and-price">
                <div className="cart-item-checkout-price">
                  ${item.book.price_paperback.toFixed(2)}
                </div>
                <div className="cart-quantity-container">
              <SelectField currentItem={item} />
               </div>
                <div className="cart-item-checkout-price-total">
                  ${(item.book.price_paperback * item.quantity).toFixed(2)}
                  {(subTotalPrice += item.book.price_paperback * item.quantity) && false}
                </div>
              </div>
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
                  Remove
              </button>
              <span className='checkout-divider'>|</span>
              </div>
              <div className='cart-item-homepage'>
                <NavLink to={`/`}>
                  Save for Later
            </NavLink>
              </div>
            </div>
          </div>
        ))}
     </div>
     </div>
      </div>
      <div className='checkout-order-summary'>
        <h1 className='checkout-order-summary-header'>Order Summary</h1>
        <div className="cart-subtotal-container">
        <span className="cart-subtotal-text">Subtotal</span>
        <span className="cart-subtotal-item-count">  ({cartItemCount(cartItems)} {cartItemCount(cartItems) === 1 ? 'item' : 'items'})</span>

          <span className="cart-subtotal-price">
            ${subTotalPrice.toFixed(2)}
          </span>
        </div>
        <hr class="checkout-order-summary-line"></hr>
        <div className="cart-total-container">
          <span className="cart-total-text">Order Total:</span>
          <span className="cart-total-price">${(subTotalPrice * 1.15).toFixed(2)}</span>
        </div>
        <div className="checkout-submit-button-container">
      <button
          className='checkout-submit-button'
          onClick={() => {
            dispatch(purchaseCart(subTotalPrice));
            history.push({
              pathname: '/thank-you',
              state: { subTotalPrice: subTotalPrice }
            });
          }}
        >
          CHECKOUT
        </button>
      </div>
      </div>
      </div>
     </>
    );
  }

  export default Checkout;
