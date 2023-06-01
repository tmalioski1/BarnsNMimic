import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { getAllBooks } from '../../store/books'
import 'swiper/swiper-bundle.css';
import 'swiper/modules/navigation/navigation.scss';
import '../Fiction/index.css'
import Carousel from '../Carousel';



function Romance() {
    const dispatch = useDispatch();
    const booksObj = useSelector(state => state.books.allBooks);
    const books = Object.values(booksObj)
    const romanceBooks = [...books.filter(book => book.genre === 'Romance'), ...books.filter(book => book.genre === 'Romance')]

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
    <h1 className='catagories-genre-header'>Romance Books</h1>
    <h2 className='catagories-sentence-below-header'>Immerse yourself in a captivating collection of romance novels, where love blossoms, hearts flutter, and unforgettable connections are forged amidst enchanting settings, passionate embraces, and heartwarming journeys of the heart.</h2>
    <div className='genre-page-container'>
    <Carousel books={romanceBooks} carouselId="romance-page" />
    </div>
    </>
  );
}

export default Romance;
