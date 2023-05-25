import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { getAllBooks } from '../../store/books'
import 'swiper/swiper-bundle.css';
import 'swiper/modules/navigation/navigation.scss';
import '../Fiction/index.css'
import Carousel from '../Carousel';



function CurrentEvents() {
    const dispatch = useDispatch();
    const booksObj = useSelector(state => state.books.allBooks);
    const books = Object.values(booksObj)
    const currentEventBooks = [...books.filter(book => book.genre === 'Current Events'), ...books.filter(book => book.genre === 'Current Events')]

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
    <h1 className='catagories-genre-header'>Current Events Books</h1>
    <h2 className='catagories-sentence-below-header'>Stay informed and engaged with our collection of current events, offering insightful perspectives, up-to-date analysis, and thought-provoking coverage of the latest happenings shaping our world today.</h2>
    <Carousel books={currentEventBooks} carouselId="currentevents-page" />
              </>
  );
}

export default CurrentEvents;
