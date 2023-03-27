import { useSelector } from 'react-redux';
import { useModal } from '../../context/Modal'
import {  useHistory } from 'react-router-dom';

import './cartmodal.css'

function CartModal({ currentBookId, isOpen, itemPrice, setIsCartOpen }) {
    const bookObj = useSelector((state) => state.books?.singleBook);
    const bookData = Object.values(bookObj);
    const book = bookData[0];
    const cartItemObject = useSelector((state) => state.cartItems);
    const cartItemData = Object.values(cartItemObject);
    const currentCartItem = cartItemData[cartItemData.length - 1];
    const { closeModal } = useModal();
    const history = useHistory()

    if (itemPrice === 0) {
      itemPrice = book.price_paperback;
    }


    return (
      <>
        <div>Item Successfully Added To Your Cart</div>
        <img src={book.cover_art} alt="book-cover-art"></img>
        <div>{book.title}</div>
        <div>{book.author}</div>
        <div>${itemPrice?.toFixed(2)}</div>
        {itemPrice === 0.00 && <div>Paperback</div>}
        {itemPrice === book.price_paperback && <div>Paperback</div>}
        {itemPrice === book.price_hardcover && <div>Hardcover</div>}
        {itemPrice === book.price_eBook && <div>eBook</div>}
        <div>${itemPrice?.toFixed(2)}</div>
        <div>Qty: 1</div>
        <button onClick={() => {closeModal(); history.push('/checkout')}}>View Shopping Cart</button>
        <button  onClick={() => closeModal()}>Continue Shopping</button>
      </>
    );


  }

export default CartModal;
