import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getAllBooks } from '../../store/books'
import { NavLink } from 'react-router-dom';

import './homepage.css'


const Homepage = () => {
    const dispatch = useDispatch();
    const booksObj = useSelector(state => state.books.allBooks);
    const books = Object.values(booksObj)


    const fictionBooks = books.filter(book => book.genre === 'Fiction')
    const nonFictionBooks = books.filter(book => book.genre === 'Non-Fiction')
    const scienceFictionBooks = books.filter(book => book.genre === 'Science Fiction')

    useEffect(() => {
        dispatch(getAllBooks())
      }, [dispatch])




if (!books.length) {
  return null
}




return (
  <>
  <div className='gold-bar'>c</div>
  <div className='greenbar-top'>c</div>
    <section className="homePage-container">
        <div id='main-books-container'>
        <div className='genre-container'>
        <div>
            <h2 className='genre-word'>Fiction</h2>
          </div>
          <div className='book-gallary-container'>
            <div className='book-gallary'>
              <div className='slider-panel'>
                {
                  fictionBooks.map(book => (
                    <div className='each-book-container'>
                      <div className='slider-eachbook'>
                        <NavLink
                          to={`/books/${book.id}`}
                          key={book.id}
                          style={{ textDecoration: 'none' }}>
                           <div className='homepage-book-container-info'>
                          <img className='will-change-to-img' src={book.cover_art} alt='cover-photo'/>
                          <div className='home-book-title'>{book.title}</div>
                          <div className='home-book-author'>{book.author}</div>
                          </div>
                        </NavLink>
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
        </div>
        </div>
        <div className='genre-container'>
        <div>
            <h2 className='genre-word'>Non-Fiction</h2>
          </div>
          <div className='book-gallary-container'>
            <div className='book-gallary'>
              <div className='slider-panel'>
                {
                  nonFictionBooks.map(book => (
                    <div className='each-book-container'>
                      <div className='slider-eachbook'>
                        <NavLink
                          to={`/books/${book.id}`}
                          key={book.id}
                          style={{ textDecoration: 'none' }}>
                          <div className='homepage-book-container-info'>
                          <img className='will-change-to-img' src={book.cover_art} alt='cover-photo'/>
                          <div className='home-book-title'>{book.title}</div>
                          <div className='home-book-author'>{book.author}</div>
                          </div>
                        </NavLink>
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
        </div>
        </div>

        <div className='genre-container'>
        <div>
            <h2 className='genre-word'>Science Fiction</h2>
          </div>
          <div className='book-gallary-container'>
            <div className='book-gallary'>
              <div className='slider-panel'>
                {
                  scienceFictionBooks.map(book => (
                    <div className='each-book-container'>
                      <div className='slider-eachbook'>
                        <NavLink
                          to={`/books/${book.id}`}
                          key={book.id}
                          style={{ textDecoration: 'none' }}>
                           <div className='homepage-book-container-info'>
                          <img className='will-change-to-img' src={book.cover_art} alt='cover-photo'/>
                          <div className='home-book-title'>{book.title}</div>
                          <div className='home-book-author'>{book.author}</div>
                          </div>
                        </NavLink>
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
        </div>
        </div>

        </div>
    </section>
    </>
  )

}


export default Homepage;
