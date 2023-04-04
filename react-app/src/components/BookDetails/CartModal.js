import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useModal } from '../../context/Modal';
import { useHistory } from 'react-router-dom';

import './cartmodal.css';

function CartModal({ currentBookId, isOpen, setIsCartOpen, onItemAdded }) {
  const bookObj = useSelector((state) => state.books?.singleBook);
  const bookData = Object.values(bookObj);
  const book = bookData[0];
  const cartItemObject = useSelector((state) => state.cartItems);
  const cartItemData = Object.values(cartItemObject);
  const currentCartItem = cartItemData[cartItemData.length - 1];
  const { closeModal } = useModal();
  const history = useHistory();
  const [itemPrice, setItemPrice] = useState(0);

  if (itemPrice === 0) {
    setItemPrice(book.price_paperback);
  }

  const handleItemAdded = () => {
    closeModal();
    onItemAdded(itemPrice);
    history.push('/checkout');
  };

  return (
    <>
      <div>Item Successfully Added To Your Cart</div>
      <img src={book.cover_art} alt="book-cover-art" />
      <div>{book.title}</div>
      <div>{book.author}</div>
      <div>${itemPrice?.toFixed(2)}</div>
      {itemPrice === 0.0 && <div>Paperback</div>}
      {itemPrice === book.price_paperback && <div>Paperback</div>}
      {itemPrice === book.price_hardcover && <div>Hardcover</div>}
      {itemPrice === book.price_eBook && <div>eBook</div>}
      <div>${itemPrice?.toFixed(2)}</div>
      <div>Qty: 1</div>
      <button onClick={handleItemAdded}>View Shopping Cart</button>
      <button onClick={closeModal}>Continue Shopping</button>
    </>
  );
}

export default CartModal;
