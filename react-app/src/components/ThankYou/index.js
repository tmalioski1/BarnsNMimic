import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { getCart } from "../../store/carts";

import './index.css'

const ThankYou = () => {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    console.log('this is the cart--------', cart)
    const cartOrderNumber = cart?.order_number
    console.log('this is the cart order number--------', cartOrderNumber)
    const location = useLocation();
    const totalPrice = location.state.totalPrice;

    useEffect(() => {
        dispatch(getCart(cart));
      }, [dispatch]);


    return (
    <>
    <div className='gold-bar'> &nbsp; </div>
    <div className='greenbar-top'> &nbsp; </div>
    <div className="thank-you-page">
    <div className="thank-you-page-first-line">Thanks for shopping at bn.com!</div>
    <div className="thank-you-page-second-line">We'll get started on your order right away.</div>
    <div className='order-thank-you-message'>
    <div className='order-number-container'>
        <div className='order-number-container-message'>Your Order Number:</div>
        <div className='order-number-container-price'>{cartOrderNumber}</div>
    </div>
    <div className='order-thank-you-message-gray-line'> &nbsp; </div>
    <div className='thank-you-total'>
        <div className='thank-you-total-message'>Order Total:</div>
        <div className='thank-you-total-price'>${totalPrice.toFixed(2)}</div>
    </div>
    </div>
    </div>
    </>
    );
  }

  export default ThankYou;
