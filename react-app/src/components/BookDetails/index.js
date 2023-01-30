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
    <img className = 'book-image-container' src={bookData[0].cover_art} alt='bookcoverimage'></img>
        <div>{dateFix(bookData[0].publication_date)}, ${bookData[0].price_paperback ? bookData[0]?.price_paperback.toFixed(2): null}, {bookData[0].title}</div>
    </div>

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

    </section>



  );
}

export default BookDetails;
