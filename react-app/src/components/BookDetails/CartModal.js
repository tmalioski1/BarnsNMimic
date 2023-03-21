import { useSelector } from 'react-redux';
import { useModal } from '../../context/Modal'
import {  useHistory } from 'react-router-dom';

import './cartmodal.css'

function CartModal({ currentBookId, isOpen, priceFormat, setIsCartOpen }) {
    const bookObj = useSelector((state) => state.books?.singleBook);
    const bookData = Object.values(bookObj);
    const book = bookData[0];
    const cartItemObject = useSelector((state) => state.cartItems);
    const cartItemData = Object.values(cartItemObject);
    const currentCartItem = cartItemData[cartItemData.length - 1];
    const { closeModal } = useModal();
    console.log('this is the currentCartItem', currentCartItem);
    const history = useHistory()

    let price;
    if (priceFormat === 'price_paperback') {
      price = book.price_paperback;
    } else if (priceFormat === 'price_hardcover') {
      price = book.price_hardcover;
    } else if (priceFormat === 'price_eBook') {
      price = book.price_eBook;
    }


    return (
      <>
        <div>Item Successfully Added To Your Cart</div>
        <img src={book.cover_art} alt="book-cover-art"></img>
        <div>{book.title}</div>
        <div>{book.author}</div>
        <div>${price?.toFixed(2)}</div>
        <div>{priceFormat}</div>
        <div>${price?.toFixed(2)}</div>
        <div>Qty: 1</div>
        <button onClick={() => {closeModal(); history.push('/checkout')}}>View Shopping Cart</button>
        <button  onClick={() => closeModal()}>Continue Shopping</button>
      </>
    );
  }

export default CartModal;
