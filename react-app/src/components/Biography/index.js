import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { getAllBooks } from '../../store/books'
import 'swiper/swiper-bundle.css';
import 'swiper/modules/navigation/navigation.scss';
import '../Fiction/index.css'
import Carousel from '../Carousel';




function Biography() {
    const dispatch = useDispatch();
    const booksObj = useSelector(state => state.books.allBooks);
    const books = Object.values(booksObj)
    const biographyBooks = [...books.filter(book => book.genre === 'Biography'), ...books.filter(book => book.genre === 'Biography')]

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
    <h1 className='catagories-genre-header'>Biography Books</h1>
    <h2 className='catagories-sentence-below-header'>Step into the lives of remarkable individuals with our captivating collection of biographies, uncovering inspiring true stories, extraordinary achievements, and the compelling journeys of individuals who have left an indelible mark on history.</h2>
    <div className='genre-page-container'>
    <Carousel books={biographyBooks} carouselId="biography-page" />
    </div>
    </>
  );
}

export default Biography;
