import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { getCart } from "../../store/carts";
import { removeCartItem } from "../../store/cart_items";
import './checkout.css'

const Checkout = ({itemPrice}) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  // const book = useSelector((state) => state.cart?.cartItems?.book)
  // console.log('this is the book', book)
  const cartItems = Object.values(cart.cartItems);
  console.log('these are the cartItems---', cartItems)


  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);


  // let price;
  // if (priceFormat === 'price_paperback') {
  //   price = item.book.price_paperback;
  // } else if (priceFormat === 'price_hardcover') {
  //   price = item.book.price_hardcover;
  // } else if (priceFormat === 'price_eBook') {
  //   price = item.book.price_eBook;
  // }


  const usDollar = Intl.NumberFormat("en-US");
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
              <div className="cart-price">
              {/* ${usDollar.format(item.price * item.quantity)}
              {(totalPrice += item.price * item.quantity) && false} */}
              ${usDollar.format(itemPrice)}
              </div>
            </div>
        </div>
      </div>
      ))}



     </div>
     </>
    );
  }

  export default Checkout;
