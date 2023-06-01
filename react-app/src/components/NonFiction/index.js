import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { getAllBooks } from '../../store/books'
import 'swiper/swiper-bundle.css';
import SwiperCore, { Navigation } from 'swiper';
import 'swiper/modules/navigation/navigation.scss';
import '../Fiction/index.css'
import Carousel from '../Carousel';



SwiperCore.use([Navigation]);

function NonFiction() {
    const dispatch = useDispatch();
    const booksObj = useSelector(state => state.books.allBooks);
    const books = Object.values(booksObj)
    const nonFictionBooks = [...books.filter(book => book.genre === 'Non-Fiction'), ...books.filter(book => book.genre === 'Non-Fiction')];

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
    <h1 className='catagories-genre-header'>Nonfiction Books</h1>
    <h2 className='catagories-sentence-below-header'>Discover the best selection of nonfiction books from memoirs and biographies to history books, business books, and more.</h2>
    <div className='genre-page-container'>
<Carousel books={nonFictionBooks} carouselId="nonfiction-page" />
</div>


              </>
  );
}

export default NonFiction;
