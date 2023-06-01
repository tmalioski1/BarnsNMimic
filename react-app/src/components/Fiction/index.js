import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { getAllBooks } from '../../store/books'
import 'swiper/swiper-bundle.css';
import SwiperCore, { Navigation } from 'swiper';
import 'swiper/modules/navigation/navigation.scss';
import './index.css'
import Carousel from '../Carousel';



SwiperCore.use([Navigation]);



function Fiction() {
    const dispatch = useDispatch();
    const booksObj = useSelector(state => state.books.allBooks);
    const books = Object.values(booksObj)
    const fictionBooks = [...books.filter(book => book.genre === 'Fiction'), ...books.filter(book => book.genre === 'Fiction')];

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
    <h1 className='catagories-genre-header'>Fiction Books</h1>
    <h2 className='catagories-sentence-below-header'>Browse a variety of fiction genres including general fiction, literature, romance and many more.</h2>
    <div className='genre-page-container'>
<Carousel books={fictionBooks} carouselId="fiction-page" id='fiction-page-attempt' />
</div>
</>
  );
}

export default Fiction;
