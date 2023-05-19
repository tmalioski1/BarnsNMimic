import { useSelector } from 'react-redux';
import { useModal } from '../../context/Modal'

import {  useHistory } from 'react-router-dom';

import './cartmodal.css'

function CartModal() {
    const bookObj = useSelector((state) => state.books?.singleBook);
    const bookData = Object.values(bookObj);
    const book = bookData[0];
    const { closeModal } = useModal();
    const history = useHistory()



    return (
      <div className='cart-modal-container'>
        <div className="cart-modal-header">
        <button
          className="cart-header-x"
          onClick={() => closeModal()}
        >
          <i className="fa-sharp fa-solid fa-xmark"></i>
        </button>
        </div>
        <div className='item-added-message'>Item Successfully Added To Your Cart</div>
        <img src={book.cover_art} alt="book-cover-art"></img>
        <div>{book.title}</div>
        <div>{book.author}</div>
        <div>${book.price_paperback?.toFixed(2)}</div>
        <div>Paperback</div>
        <div>${book.price_paperback?.toFixed(2)}</div>
        <div>Qty: 1</div>
        <button onClick={() => {closeModal(); history.push('/checkout')}}>View Shopping Cart</button>
        <button  onClick={() => closeModal()}>Continue Shopping</button>
        </div>

    );
  }

export default CartModal;
