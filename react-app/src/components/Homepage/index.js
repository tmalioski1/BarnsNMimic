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
    const trueCrimeBooks = books.filter(book => book.genre === 'True Crime')
    const romanceBooks = books.filter(book => book.genre === 'Romance')
    const cookBooks = books.filter(book => book.genre === 'Cooking')
    const biographyBooks = books.filter(book => book.genre === 'Biography')
    const currentEventBooks = books.filter(book => book.genre === 'Current Events')

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
    <section className="homePage-container">
        <div id='main-books-container'>

        {books.filter(book => book.genre === 'Fiction').length !== 0 &&
        <div className='genre-container'>
        <div>
            <h2 className='genre-word'>Fiction</h2>
          </div>
          <div className='book-gallary-container'>
            <div className='book-gallary'>
              <div className='slider-panel'>
                {
                  fictionBooks.map(book => (
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
            </div>
        </div>
        </div>
}

    {books.filter(book => book.genre === 'Non-Fiction').length !== 0 &&
        <div className='genre-container'>
        <div>
            <h2 className='genre-word'>Non-Fiction</h2>
          </div>
          <div className='book-gallary-container'>
            <div className='book-gallary'>
              <div className='slider-panel'>
                {
                  nonFictionBooks.map(book => (
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
            </div>
        </div>
        </div>
}

      {books.filter(book => book.genre === 'Science Fiction').length !== 0 &&
        <div className='genre-container'>
        <div>
            <h2 className='genre-word'>Science Fiction</h2>
          </div>
          <div className='book-gallary-container'>
            <div className='book-gallary'>
              <div className='slider-panel'>
                {
                  scienceFictionBooks.map(book => (
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
            </div>
        </div>
        </div>
}

      {books.filter(book => book.genre === 'True Crime').length !== 0 &&
        <div className='genre-container'>
        <div>
            <h2 className='genre-word'>True Crime</h2>
          </div>
          <div className='book-gallary-container'>
            <div className='book-gallary'>
              <div className='slider-panel'>
                {
                  trueCrimeBooks.map(book => (
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
            </div>
        </div>
        </div>
}


        {books.filter(book => book.genre === 'Romance').length !== 0 &&
        <div className='genre-container'>
        <div>
            <h2 className='genre-word'>Romance</h2>
          </div>
          <div className='book-gallary-container'>
            <div className='book-gallary'>
              <div className='slider-panel'>
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
            </div>
        </div>
        </div>
      }

      {books.filter(book => book.genre === 'Cooking').length !== 0 &&
        <div className='genre-container'>
        <div>
            <h2 className='genre-word'>Cooking</h2>
          </div>
          <div className='book-gallary-container'>
            <div className='book-gallary'>
              <div className='slider-panel'>
                {
                  cookBooks.map(book => (
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
            </div>
        </div>
        </div>
}


      {books.filter(book => book.genre === 'Biography').length !== 0 &&
        <div className='genre-container'>
        <div>
            <h2 className='genre-word'>Biography</h2>
          </div>
          <div className='book-gallary-container'>
            <div className='book-gallary'>
              <div className='slider-panel'>
                {
                  biographyBooks.map(book => (
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
            </div>
        </div>
        </div>
}


    {books.filter(book => book.genre === 'Current Events').length !== 0 &&
        <div className='genre-container'>
        <div>
            <h2 className='genre-word'>Current Events</h2>
          </div>
          <div className='book-gallary-container'>
            <div className='book-gallary'>
              <div className='slider-panel'>
                {
                  currentEventBooks.map(book => (
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
            </div>
        </div>
        </div>
}
        </div>
    </section>
    </>
  )

}


export default Homepage;
