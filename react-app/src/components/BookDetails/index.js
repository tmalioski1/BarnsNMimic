import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useParams, NavLink, useHistory } from 'react-router-dom';
import { getOneBook, deleteABook } from '../../store/books';
import OpenModalButton from '../OpenModalButton';
import EditBookModal from './EditBookModal'
import './bookdetails.css';


const BookDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const bookObj = useSelector(state => state.books.singleBook);
  const bookData = Object.values(bookObj)
  const userObj = useSelector(state => state.session?.user)
  const history = useHistory()

  useEffect(() => {
    dispatch(getOneBook(id))
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



  return (
    <section>
    <div className='book-detail-page-container'>
      <div className='book-image-details'>
    <img className = 'book-image-container' src={bookData[0].cover_art} alt='bookcoverimage'></img>
    <div className='book-details-and-buttons'>
    <div className='book-details-and-buttons-top'>
    <div className= 'book-details-title'>{bookData[0].title}</div>
    <div className= 'book-details-author'><span className='black-by'>by</span> { bookData[0].author}</div>
    </div>
    <div>{bookData[0].price_paperback ? '$' +bookData[0]?.price_paperback.toFixed(2)+',': ''} {bookData[0].price_hardcover ? '$' +bookData[0]?.price_hardcover.toFixed(2)+',': ''} {bookData[0].price_eBook ? '$' +bookData[0]?.price_eBook.toFixed(2)+',': ''}</div>
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
          </div>
    </section>



  );
}

export default BookDetails;
