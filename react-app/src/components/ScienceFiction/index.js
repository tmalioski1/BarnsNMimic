import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { getAllBooks } from '../../store/books'
import 'swiper/swiper-bundle.css';
import 'swiper/modules/navigation/navigation.scss';
import '../Fiction/index.css'
import Carousel from '../Carousel';




function ScienceFiction() {
    const dispatch = useDispatch();
    const booksObj = useSelector(state => state.books.allBooks);
    const books = Object.values(booksObj)
    const scienceFictionBooks = [...books.filter(book => book.genre === 'Science Fiction'), ...books.filter(book => book.genre === 'Science Fiction')];


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
    <h1 className='catagories-genre-header'>Science Fiction Books</h1>
    <h2 className='catagories-sentence-below-header'>Explore a diverse selection of science fiction books, delving into futuristic worlds, mind-bending technologies, and thrilling adventures that push the boundaries of imagination.</h2>
    <div className='genre-page-container'>
    <Carousel books={scienceFictionBooks} carouselId="sciencefiction-page" />
    </div>


              </>
  );
}

export default ScienceFiction;
