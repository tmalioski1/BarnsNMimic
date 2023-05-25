import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { getAllBooks } from '../../store/books'




function Romance() {
    const dispatch = useDispatch();
    const booksObj = useSelector(state => state.books.allBooks);
    const books = Object.values(booksObj)
    const romanceBooks = books.filter(book => book.genre === 'Romance')

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
    <div className='catagories-page-container'>
                   {
                  romanceBooks.map(book => (
                      <div className='slider-eachbook'>
                        <NavLink
                          to={`/books/${book.id}`}
                          key={book.id}
                          style={{ textDecoration: 'none' }}>
                           <div className='homepage-book-container-info'>
                          <img className='will-change-to-img' src={book.cover_art} onError={e => {e.target.src = 'https://librarygenesis.net/wp-content/uploads/2018/11/library-genesis.jpg'}} alt='cover-photo'/>
                          <div className='home-book-title'>{book.title}</div>
                          <div className='home-book-author'>{book.author}</div>
                          </div>
                        </NavLink>
                      </div>
                  ))
                }
              </div>


              </>
  );
}

export default Romance;
