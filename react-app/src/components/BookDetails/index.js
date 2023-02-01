import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useParams, NavLink, useHistory } from 'react-router-dom';
import { DynamicStar } from 'react-dynamic-star';
import { getOneBook, deleteABook } from '../../store/books';
import { getAllReviews } from '../../store/reviews';
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
 console.log('this is the sum---', sum)
 let average = sum /reviews.length

 console.log('this is the reviews length--', reviews.length)

 console.log('this is the average--', average)


  return (
    <section>
    <div className= 'top-placeholder'>c</div>
    <div className='book-detail-page-container'>
      <div className='book-image-details'>
    <img className = 'book-image-container' src={bookData[0].cover_art} alt='bookcoverimage'></img>
    <div className='book-details-and-buttons'>
    <div className='book-details-and-buttons-top'>
    <div className= 'book-details-title'>{bookData[0].title}</div>
    <div className= 'book-details-author'><span className='black-by'>by</span> { bookData[0].author}</div>
    <div className= 'star-average'>
    <DynamicStar
    rating = {average}
    />
    </div>
    </div>
    <div>{bookData[0].price_paperback ? '$' +bookData[0]?.price_paperback.toFixed(2)+',': 0.0} {bookData[0].price_hardcover ? '$' +bookData[0]?.price_hardcover.toFixed(2)+',': 0.0} {bookData[0].price_eBook ? '$' +bookData[0]?.price_eBook.toFixed(2)+',': 0.0}</div>
    <div className='book-edit-and-delete'>
          {userObj?.id === bookData[0].publisher_id &&
          <button
            className='delete-and-edit'
            onClick={() => handleDeletion(bookData[0].id)}>Delete</button>}
              {userObj?.id === bookData[0].publisher_id &&
                <OpenModalButton
                 modalComponent={<EditBookModal currentBookId={ `${bookData[0].id}` } />}
                 buttonText={'Edit'}
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
            <h2 className='customer-reviews-section-title'>Customer Reviews</h2>
            <div className='customer-review-modal-container'>

            {sessionUser && userObj?.id !== bookData[0]?.publisher_id && !(reviews.find(review => userObj?.id === review?.user_id)) &&
                <OpenModalButton
                modalComponent={<ReviewModal currentBookId={ `${bookData[0].id}` } />}
                buttonText={'Write a Review'}
             />}
            </div>
            {
              reviews.map(review => (
                <>
                <div className= 'customer-review-username'>{users.find(user=>user?.id===review?.user_id)?.username}</div>
                <div className= 'customer-review-title'>{review?.review_title}</div>
                <div className= 'customer-review-stars'> <DynamicStar rating={review?.stars}/></div>
                </>
              ))
            }

          </div>
          </div>
    </section>



  );
}

export default BookDetails;
