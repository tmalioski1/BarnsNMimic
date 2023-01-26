import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useParams, NavLink, useHistory } from 'react-router-dom';
import { getOneBook} from '../../store/books';
import './bookdetails.css';


const BookDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const bookObj = useSelector(state => state.books.singleBook);
  console.log('this is the title', bookObj.title)
  const bookData = Object.values(bookObj)
  console.log('this is the bookObj---', bookObj)
  console.log('this is the bookData---', bookData[0])




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
