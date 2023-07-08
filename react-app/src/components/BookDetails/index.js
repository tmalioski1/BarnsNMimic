import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useParams, NavLink, useHistory } from 'react-router-dom';
import { DynamicStar } from 'react-dynamic-star';
import { getOneBook, deleteABook } from '../../store/books';
import { getAllReviews, deleteAReview } from '../../store/reviews';
import { postCartItem, editCartItem } from "../../store/cart_items";
import CartModal from './CartModal'
import { getCart } from "../../store/carts";
import OpenModalButton from '../OpenModalButton';
import EditBookModal from './EditBookModal'
import ReviewModal from './ReviewModal'
import NotAvailableModal from "../NotAvailableModal"

import './bookdetails.css';


const BookDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const sessionUser = useSelector(state => state.session.user);
  const bookObj = useSelector(state => state.books.singleBook);
  const bookData = Object.values(bookObj)
  const book = bookData[0]
  const reviewsObj = useSelector(state => state.reviews.reviews)
  const reviews = Object.values(reviewsObj)
  const userObj = useSelector(state => state.session?.user)
  const cart = useSelector((state) => state.cart)
  const cartItemArray = cart?.cartItems ? Object.values(cart.cartItems) : [];
  const newCartItem = cartItemArray[cartItemArray?.length - 1];
  const [isCartOpen, setIsCartOpen] = useState(false);
  const history = useHistory()

  const [users, setUsers] = useState([]);

  console.log('newCartItem---', newCartItem)

  useEffect(() => {
    dispatch(getOneBook(id))
    dispatch(getAllReviews(id))
    async function fetchData() {
      const response = await fetch('/api/users/');
      const responseData = await response.json();
      setUsers(responseData.users);
    }
    fetchData();
  }, [id, dispatch])

  if (!bookData.length){
    return null
  }

  let message = ''
  const handleDeletion = async (bookId) => {
    const response = await dispatch(deleteABook(bookId))
    if (response) {
      message = response.message
    }
    history.push(`/`)
  }

  const handleReviewDeletion = async (reviewId) => {
    const response = await dispatch(deleteAReview(reviewId))
    if (response) {
      message = response.message
    }
  }


  const handleAdditiontoCart = async () => {
    let data = {};
    const existingCartItem = cartItemArray.find(item => {
      return item.book_id === newCartItem.book_id && item.price === newCartItem.price && item.added === true;
    });

    if (existingCartItem) {
      data = {
        quantity: existingCartItem.quantity + 1,
      };
    } else {
      data = {
        added: true,
      };
    }

    await dispatch(editCartItem(newCartItem, data));
  };

const handleClick = (buttonClickedValue) => {
  const payload = {
    book_id: book.id,
    button_clicked: buttonClickedValue
  };

  fetch('/api/cart', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.error(error);
    });
};

  function dateFix (string) {
    const array = string.split('-')
    const newArray = []
    newArray.push(array[1])
    newArray.push(array[2])
    newArray.push(array[0])
    const joinedArray = newArray.join('/')
    if (joinedArray[0] === '/' && joinedArray[1] === '/') {
      let slicedString = joinedArray.slice(2)
      return slicedString
    }
    return joinedArray
  }



if(!users.length){
  return null
}

  let sum = 0
  reviews.forEach(review => {
    sum += review.stars
  })
 let average = sum /reviews.length

const publicationDate = new Date(bookData[0].publication_date)
const today = new Date()





  return (
    <>
    <div className='gold-bar'> &nbsp; </div>
    <div className='greenbar-top'> &nbsp; </div>
    <section>
    <div className='book-detail-page-container'>
      <div className='book-image-details'>
    <img className = 'book-image-container' src={bookData[0].cover_art} onError={e => {e.target.src = 'https://librarygenesis.net/wp-content/uploads/2018/11/library-genesis.jpg'}} alt='bookcoverimage'></img>
    <div className='book-details-and-buttons'>
    <div className='book-details-and-buttons-top'>
    <h1 className= 'book-details-title'>{bookData[0].title}</h1>
    <div className= 'book-details-author'><span className='black-by'>by</span> { bookData[0].author}</div>
    <div className='star-ratings-info-container'>
    <div className= 'star-average'>
    <DynamicStar
    rating = {average}
    width={17}
    height={20}
    />
    </div>
    <div className='star-average-number'>{average ? average: null}</div>
    <div className='total-review-number'>{reviews.length ? `(${reviews.length})`: null}</div>
    </div>
    </div>
    <div className="book-details-all-prices">
    {sessionUser && sessionUser.id !== book.publisher_id &&
      <button className="book-details-paperback-price" onClick={() => handleClick('paperback')}>
  <div>Paperback</div>
  <div className="price-to-bold">
    {'$' + bookData[0]?.price_paperback.toFixed(2)}
  </div>
</button>}

      {!sessionUser &&
          <NavLink to={`/login`}>
          <button className="book-details-paperback-price">
             <div>
               Paperback
             </div>
             <div className="price-to-bold">
               ${bookData[0].price_paperback ? bookData[0].price_paperback.toFixed(2) : 0.0}
             </div>
           </button>
           </NavLink>
      }

      {sessionUser && sessionUser.id !== book.publisher_id &&
     <button className="book-details-hardcover-price" onClick={() => handleClick('hardcover')}>
     <div>Hardcover</div>
     <div className="price-to-bold">
       {'$' + bookData[0]?.price_hardcover.toFixed(2)}
     </div>
   </button>}
      {!sessionUser &&
         <NavLink to={`/login`}>
         <button className="book-details-hardcover-price">
            <div>
              Hardcover
            </div>
            <div className="price-to-bold">
              ${bookData[0].price_hardcover ? bookData[0].price_hardcover.toFixed(2) : 0.0}
            </div>
          </button>
          </NavLink>
      }
      {sessionUser && sessionUser.id !== book.publisher_id &&
     <button className="book-details-eBook-price" onClick={() => handleClick('eBook')}>
     <div>eBook</div>
     <div className="price-to-bold">
       {'$' + bookData[0]?.price_eBook.toFixed(2)}
     </div>
   </button>}

      {!sessionUser &&
         <NavLink to={`/login`}>
         <button className="book-details-eBook-price">
            <div>
              eBook
            </div>
            <div className="price-to-bold">
              ${bookData[0].price_eBook ? bookData[0].price_eBook.toFixed(2) : 0.0}
            </div>
          </button>
          </NavLink>
      }

    </div>
    <div className='book-edit-and-delete'>
          {userObj?.id === bookData[0].publisher_id &&
          <button
            className='delete-book'
            onClick={() => handleDeletion(bookData[0].id)}>DELETE BOOK</button>}
              {userObj?.id === bookData[0].publisher_id &&
                <OpenModalButton
                 modalComponent={<EditBookModal currentBookId={ `${bookData[0].id}` } />}
                 buttonText={'Edit Book'}
              />}
          </div>
          <div className='book-add-to-cart'>

          {sessionUser && userObj?.id !== bookData[0].publisher_id &&
          <button className='book-add-to-cart-button' onClick={() => handleAdditiontoCart(newCartItem).then(() => setIsCartOpen(true))}>
            <OpenModalButton
            buttonText={'ADD TO CART'}
            onButtonClick={() => setIsCartOpen(true)}
            modalComponent={<CartModal
              onClose={() => setIsCartOpen(false)}
            />}

          />
          </button>}

          {!sessionUser && userObj?.id !== bookData[0].publisher_id &&
          <NavLink to={`/login`}>
          <button className='book-add-to-cart-button'>ADD TO CART
          </button>
          </NavLink>}


          </div>
          </div>
          </div>
          <div className='overview-container'>
            <h2 className='overview-title'>Overview</h2>
            <div style={{whiteSpace: 'pre-wrap'}} className='overview-text'>{bookData[0].overview}</div>
          </div>
          <h2 className='product-details-title'>Product Details</h2>
          <div className='product-details-container'>
            <div className='publisher-details'><span className="publisher-key">Publisher:</span>{bookData[0].publisher}</div>
            <div className='publication-date-details'><span className="publication-date-key">Publication date:</span>{dateFix(bookData[0].publication_date)}</div>
            <div className='page-number-details'><span className="page-key">Pages:</span>{bookData[0].pages}</div>
          </div>
          <div className='editorial-review-container'>
          <h2 className='editorial-review-title'>Editorial Review</h2>
          <div className='editorial-review-text-container'>
          <div className='editorial-review-text'>{bookData[0].editorial_review}</div>
          </div>
          </div>
          <div className='customer-reviews-container'>
            <div className='title-with-lines'>
              <div className= 'line-left'> &nbsp; </div>
              <div className='customer-reviews-section-title-container'>
            <h2 className='customer-reviews-section-title'>Customer Reviews</h2>
            </div>
            <div className= 'line-right'> &nbsp; </div>
            </div>
            <div className='customer-review-modal-container'>

            {sessionUser && userObj?.id !== bookData[0]?.publisher_id && !(reviews.find(review => userObj?.id === review?.user_id)) && publicationDate < today &&
                <OpenModalButton
                id='write-review-button'
                modalComponent={<ReviewModal currentBookId={ `${bookData[0].id}` } />}
                buttonText={'Write A Review'}
             />}
            </div>
            {
              reviews.map(review => (
                <div className= 'customer-review-container'>
                <div className= 'customer-review-container-left'>
                <div className= 'customer-review-username'>{users.find(user=>user?.id===review?.user_id)?.username}</div>
                </div>
                <div className= 'customer-review-container-right'>
                <div className= 'customer-review-stars'>
                <DynamicStar
                rating={review?.stars}
                width={18}
                height={18}
                />
                </div>
                <div className= 'customer-review-title'>{review?.review_title}</div>
                <div className= 'customer-review-review-txt'>{review?.review_txt}</div>
                {review?.spoilers &&
                <div className= 'customer-review-review-spoilers'><span className='spoilers-key'>Review Contains Spoilers:</span> <span className='spoiler-ternary'>{review?.spoilers ==='Yes' ? <i className="fa-solid fa-check"></i> : <i class="fa-solid fa-x"></i>}</span>{review?.spoilers}</div>
                }
                {review?.recommended &&
                <div className= 'customer-review-review-recommended'><span className='recommended-key'>Recommends this product:</span> <span className='recommended-ternary'>{review?.recommended ==='Yes' ? <i className="fa-solid fa-check"></i> : <i class="fa-solid fa-x"></i>}</span>{review?.recommended}</div>
                }
                { <div className= 'customer-review-delete-button-container'>
                {sessionUser && userObj?.id === review?.user_id &&
                <button
                  className='customer-review-delete-button'
                  onClick={() => handleReviewDeletion(review.id)}>Delete Review</button>}
                </div>}
                </div>
                </div>

              ))
            }

          </div>
          </div>
    </section>
    </>



  );
}

export default BookDetails;
