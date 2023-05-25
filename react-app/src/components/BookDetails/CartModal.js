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
        <div className='cart-modal-row'>
        <img className= "cart-modal-book-cover-art" src={book.cover_art} alt="book-cover-art"></img>
        <div className='cart-modal-row-right'>
        <div className='item-added-message'>Item Successfully Added To Your Cart</div>
        <hr class="cart-modal-line"></hr>
        <div className="cart-modal-title-price">
        <div className="cart-modal-title">{book.title}</div>
        <div className="cart-modal-title-price-one">${book.price_paperback?.toFixed(2)}</div>
        </div>
        <div className="cart-modal-author">By {book.author}</div>
        <div className="cart-modal-format-price-quantity">
        <div>Paperback</div>
        <span class="cart-modal-format-price-quantity-line">|</span>
        <div>${book.price_paperback?.toFixed(2)}</div>
        <span class="cart-modal-format-price-quantity-line">|</span>
        <div>Qty: 1</div>
        </div>
        <div className="cart-modal-buttons">
        <button className="cart-modal-view-shopping-cart-button" onClick={() => {closeModal(); history.push('/checkout')}}>View Shopping Cart</button>
        <button className="cart-modal-view-continue-shopping-button"onClick={() => closeModal()}>Continue Shopping</button>
        </div>
        </div>
        </div>
        </div>

    );
  }

export default CartModal;
