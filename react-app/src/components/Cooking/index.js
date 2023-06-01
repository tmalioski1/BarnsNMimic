import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { getAllBooks } from '../../store/books'
import 'swiper/swiper-bundle.css';
import 'swiper/modules/navigation/navigation.scss';
import '../Fiction/index.css'
import Carousel from '../Carousel';

function Cooking() {
    const dispatch = useDispatch();
    const booksObj = useSelector(state => state.books.allBooks);
    const books = Object.values(booksObj)
    const cookBooks = [...books.filter(book => book.genre === 'Cooking'), ...books.filter(book => book.genre === 'Cooking')]

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
    <h1 className='catagories-genre-header'>Cooking Books</h1>
    <h2 className='catagories-sentence-below-header'>Embark on a flavorful journey with our diverse collection of cooking books, unlocking the secrets of culinary arts, tantalizing recipes, and culinary adventures that will inspire your inner chef and elevate your gastronomic skills.</h2>
    <div className='genre-page-container'>
    <Carousel books={cookBooks} carouselId="cookbooks-page" />
    </div>
   </>
  );
}

export default Cooking;
