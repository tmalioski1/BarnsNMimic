import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState, useRef } from 'react';
import { getAllBooks } from '../../store/books'
import { getCart } from '../../store/carts';
import { NavLink } from 'react-router-dom';
import Glide, { Controls } from '@glidejs/glide/dist/glide.modular.esm'

import '@glidejs/glide/dist/css/glide.core.min.css';
import '@glidejs/glide/dist/css/glide.theme.min.css';
import './homepage.css'

// import React, { useEffect, useRef } from 'react';
// import Glide from '@glidejs/glide';


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
    const sliderRef = useRef()
    useEffect(() => {
        dispatch(getAllBooks())
        if (user) dispatch(getCart())
      }, [dispatch, user])

    useEffect(() => {

    new Glide(sliderRef.current, {
      type: 'carasoul',
      startAt: 0,
      perView: 6,

    }).mount({Controls})
    }, [])




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
          <div class='slider-container'>

  <div class='glide' ref={sliderRef}>
    <div class='glide__track' data-glide-el='track'>
      <ul class='glide__slides'>
        {fictionBooks.map(book => (
          <li class='glide__slide'>
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
          </li>
        ))}
      </ul>
    </div>
    <div class='glide__arrows' data-glide-el='controls'>
      <button class='glide__arrow glide__arrow--left' data-glide-dir='<'>&lt;</button>
      <button class='glide__arrow glide__arrow--right' data-glide-dir='>'>&gt;</button>
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
