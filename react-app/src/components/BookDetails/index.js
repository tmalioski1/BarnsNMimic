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
  function dateFix (string) {
    const array = string.split('-')
    const newArray = []
    newArray.push(array[1])
    newArray.push(array[2])
    newArray.push(array[0])
    const joinedArray = newArray.join('/')
    return joinedArray
  }



  return (
    <section>
    <div className='book-detail-page-container'>
        <div>{dateFix(bookData[0].publication_date)}</div>

    </div>
    </section>



  );
}

export default BookDetails;
