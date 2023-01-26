import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useParams, NavLink, useHistory } from 'react-router-dom';
import { getOneBook} from '../../store/books';
import './bookdetails.css';


const BookDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const bookObj = useSelector(state => state.books.singleBook);
  const bookData = Object.values(bookObj)



  useEffect(() => {
    dispatch(getOneBook(id))
  }, [id, dispatch])

  if (!bookData.length){
    return null
  }


  return (
    <section>
    <div className='book-detail-page-container'>
        <div>{bookData[0].title}</div>

    </div>
    </section>



  );
}

export default BookDetails;
