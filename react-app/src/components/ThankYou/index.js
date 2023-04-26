import { useSelector } from "react-redux";
import { useLocation } from 'react-router-dom';
import './index.css'

const ThankYou = () => {
    const cart = useSelector((state) => state.cart);
    const location = useLocation();
    const totalPrice = location.state.totalPrice;

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
        <div className='order-number-container-price'>{cart.order_number}</div>
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
