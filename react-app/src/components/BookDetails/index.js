import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useParams, NavLink, useHistory } from 'react-router-dom';
import { DynamicStar } from 'react-dynamic-star';
import { getOneBook, deleteABook } from '../../store/books';
import { getAllReviews, deleteAReview } from '../../store/reviews';
import OpenModalButton from '../OpenModalButton';
import EditBookModal from './EditBookModal'
import ReviewModal from './ReviewModal'
import './bookdetails.css';


const BookDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const sessionUser = useSelector(state => state.session.user);
  const bookObj = useSelector(state => state.books.singleBook);
  const bookData = Object.values(bookObj)
  const reviewsObj = useSelector(state => state.reviews.reviews)
  const reviews = Object.values(reviewsObj)
  const userObj = useSelector(state => state.session?.user)
  const history = useHistory()

  const [users, setUsers] = useState([]);


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
    return  null
  }

  let sum = 0
  reviews.forEach(review => {
    sum += review.stars
  })
 let average = sum /reviews.length

const publicationDate = new Date(bookData[0].publication_date)
const today = new Date()

console.log(today > publicationDate)


  return (
    <section>
    <div className= 'top-placeholder'>c</div>
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
    <div className= 'book-details-all-prices'>
      <div className='book-details-paperback-price'>
       <div>
       Paperback
       </div>
       <div className='price-to-bold'>
      {bookData[0].price_paperback ? '$' +bookData[0]?.price_paperback.toFixed(2): 0.0}
      </div>
      </div>
      <div className='book-details-hardcover-price'>
       <div>
       Hardcover
       </div>
       <div className='price-to-bold'>
      {bookData[0].price_hardcover ? '$' +bookData[0]?.price_hardcover.toFixed(2): 0.0}
      </div>
      </div>

      <div className='book-details-eBook-price'>
        <div>
       eBook
       </div>
       <div className='price-to-bold'>
      {bookData[0].price_eBook ? '$' +bookData[0]?.price_eBook.toFixed(2): 0.0}
      </div>
      </div>
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
          </div>
          </div>
          <div className='overview-container'>
            <h2 className='overview-title'>Overview</h2>
            <div className='overview-text'>{bookData[0].overview}</div>
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



  );
}

export default BookDetails;
