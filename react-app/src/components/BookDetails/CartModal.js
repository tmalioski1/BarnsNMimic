import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { useModal } from '../../context/Modal'
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
        <img src={book.cover_art}></img>
        <div>{book.title}</div>
        <div>{book.author}</div>
        <div>${price?.toFixed(2)}</div>
        <div>{priceFormat}</div>
        <div>${price?.toFixed(2)}</div>
        <div>Qty: {currentCartItem?.quantity}</div>
        <button onClick={() => window.location.href = '/checkout'}>View Shopping Cart</button>
        <button  onClick={() => closeModal()}>Continue Shopping</button>
      </>
    );
  }

export default CartModal;
