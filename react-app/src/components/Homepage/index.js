import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState, useRef } from 'react';
import { getAllBooks } from '../../store/books'
import { getCart } from '../../store/carts';
import { NavLink } from 'react-router-dom';

import './homepage.css'




const Homepage = () => {
    const dispatch = useDispatch();
    const booksObj = useSelector(state => state.books.allBooks);
    const user = useSelector((state) => state.session.user);
    const books = Object.values(booksObj)
    const fictionBooks = books.filter(book => book.genre === 'Fiction')
    const nonFictionBooks = books.filter(book => book.genre === 'Non-Fiction')
    const scienceFictionBooks = books.filter(book => book.genre === 'Science Fiction')
    const trueCrimeBooks = books.filter(book => book.genre === 'True Crime')
    const romanceBooks = books.filter(book => book.genre === 'Romance')
    const cookBooks = books.filter(book => book.genre === 'Cooking')
    const biographyBooks = books.filter(book => book.genre === 'Biography')
    const currentEventBooks = books.filter(book => book.genre === 'Current Events')
    const sliderRef = useRef(null);

    useEffect(() => {
        dispatch(getAllBooks())
        if (user) dispatch(getCart())
      }, [dispatch, user])




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
          <div className='slider-container' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '95%', margin: '0 auto' }}>
  <button style={{ padding: '0', border: 'none', background: 'none', marginRight: '2%' }} onClick={() => { document.querySelector('.slider-books-container').scrollBy({ left: -385, behavior: 'smooth' }) }}>
    <svg viewBox="0 0 24 24" width="24" height="24" stroke="#000000" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-left">
      <path d="M15 18l-6-6 6-6"/>
    </svg>
  </button>
  <div className='slider-books-container' style={{ display: 'flex', flexDirection: 'row', overflowX: 'scroll', scrollBehavior: 'smooth', maxWidth: '100%', margin: '0 auto', scrollSnapType: 'x mandatory', scrollPadding: '0 20vw' }}>
    {
      fictionBooks.map(book => (
          <div className='slider-eachbook' style={{ flex: '0 0 auto', justifyContent: 'center', alignItems: 'center', marginRight: '2%', width: '15%', height: '400px'}}>
            <NavLink
              to={`/books/${book.id}`}
              key={book.id}
              style={{ textDecoration: 'none', display: 'block', maxWidth: '300px', overflow: 'hidden', wordBreak: 'break-word' }}>
               <div className='homepage-book-container-info' style={{height: '100%'}}>
              <img className='will-change-to-img' src={book.cover_art} onError={e => {e.target.src = 'https://librarygenesis.net/wp-content/uploads/2018/11/library-genesis.jpg'}} alt='cover-photo'/>
              <div className='home-book-title'>{book.title}</div>
              <div className='home-book-author'>{book.author}</div>
              </div>
            </NavLink>
          </div>
      ))
    }
  </div>
  <button style={{ padding: '0', border: 'none', background: 'none', marginLeft: '2%' }} onClick={() => { document.querySelector('.slider-books-container').scrollBy({ left: 385, behavior: 'smooth' }) }}>
    <svg viewBox="0 0 24 24" width="24" height="24" stroke="#000000" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-right">
      <path d="M9 18l6-6-6-6"/>
    </svg>
    </button>
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
