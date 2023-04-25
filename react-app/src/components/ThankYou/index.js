import { useSelector } from "react-redux";
import { useLocation } from 'react-router-dom';
import './index.css'

const ThankYou = () => {
    const cart = useSelector((state) => state.cart);
    const location = useLocation();
    const totalPrice = location.state.totalPrice;

    return (
    <>
    <div>Thanks for shopping at bn.com</div>
    <div>We'll get started on your order right away.</div>

    <div className='order-number-container'>
        <div>Your Order Number:</div>
        <div>{cart.order_number}</div>
    </div>
    <div className='thank-you-total'>
        <div>Order Total:</div>
        <div>${totalPrice.toFixed(2)}</div>
    </div>

    </>
    );
  }

  export default ThankYou;
