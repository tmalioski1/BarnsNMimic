import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { getAllBooks } from '../../store/books'
import 'swiper/swiper-bundle.css';
import 'swiper/modules/navigation/navigation.scss';
import '../Fiction/index.css'
import Carousel from '../Carousel';




function TrueCrime() {
    const dispatch = useDispatch();
    const booksObj = useSelector(state => state.books.allBooks);
    const books = Object.values(booksObj)
    const trueCrimeBooks = [...books.filter(book => book.genre === 'True Crime'), ...books.filter(book => book.genre === 'True Crime')];

    useEffect(() => {
        dispatch(getAllBooks())
      }, [dispatch])

      if (!books.length) {
        return null
      }

  return (
    <>
    <div className='gold-bar'> &nbsp; </div>
    <div className='greenbar-top'> &nbsp; </div>
    <div className='catagories-home-link-container'>
    <NavLink to={`/`} className='catagories-home-link'>Home</NavLink>
    </div>
    <h1 className='catagories-genre-header'>True Crime Books</h1>
    <h2 className='catagories-sentence-below-header'>Discover a compelling collection of true crime books, delving into real-life mysteries, gripping investigations, and captivating accounts of criminal cases that will leave you on the edge of your seat.</h2>
    <Carousel books={trueCrimeBooks} carouselId="truecrime-page" />
              </>
  );
}

export default TrueCrime;
