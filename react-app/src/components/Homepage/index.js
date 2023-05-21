import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState, useRef } from 'react';
import { getAllBooks } from '../../store/books'
import { getCart } from '../../store/carts';
import { NavLink } from 'react-router-dom';
import './homepage.css'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper-bundle.css';

import SwiperCore, { Navigation } from 'swiper';
// import 'swiper/swiper.min.css';
import 'swiper/modules/navigation/navigation.scss';



SwiperCore.use([Navigation]);



const Homepage = () => {
  const dispatch = useDispatch();
  const booksObj = useSelector(state => state.books.allBooks);
  const user = useSelector((state) => state.session.user);
  const books = Object.values(booksObj)
  const fictionBooks = [...books.filter(book => book.genre === 'Fiction'), ...books.filter(book => book.genre === 'Fiction')];
  const nonFictionBooks = [...books.filter(book => book.genre === 'Non-Fiction'), ...books.filter(book => book.genre === 'Non-Fiction')];
  const scienceFictionBooks = books.filter(book => book.genre === 'Science Fiction')
  const trueCrimeBooks = books.filter(book => book.genre === 'True Crime')
  const romanceBooks = books.filter(book => book.genre === 'Romance')
  const cookBooks = books.filter(book => book.genre === 'Cooking')
  const biographyBooks = books.filter(book => book.genre === 'Biography')
  const currentEventBooks = books.filter(book => book.genre === 'Current Events')
  const swiperRef = useRef(null);


  useEffect(() => {
      dispatch(getAllBooks())
      if (user) dispatch(getCart())
    }, [dispatch, user])



if (!books.length) {
return null
}

const handleSlidePrev = () => {
if (swiperRef.current && swiperRef.current.swiper) {
  swiperRef.current.swiper.slidePrev();
}
};

const handleSlideNext = () => {
if (swiperRef.current && swiperRef.current.swiper) {
  swiperRef.current.swiper.slideNext();
}
};



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
      <Swiper
          slidesPerView={7}
          spaceBetween={25}
          loop={true}
          slidesPerGroup={3}
          className='swiper-container'
          onSwiper={swiper => {
            swiperRef.current = swiper;
          }}

          navigation={{
            prevEl: '.swiper-button-prev',
            nextEl: '.swiper-button-next'
          }}
        >
        {fictionBooks.map(book => (
          <SwiperSlide key={book.id}>
              <NavLink to={`/books/${book.id}`} className="swiper-slide-link">
                <div className='homepage-book-container-info'>
                  <img className='will-change-to-img' src={book.cover_art} onError={e => { e.target.src = 'https://librarygenesis.net/wp-content/uploads/2018/11/library-genesis.jpg' }} alt='cover-photo' />
                  <div className='home-book-title'>{book.title}</div>
                  <div className='home-book-author'>{book.author}</div>
                </div>
              </NavLink>
          </SwiperSlide>
        ))}
      </Swiper>
        <div className='swiper-navigation'    style={{
          "--swiper-navigation-size": "20px",
          "font-weight": "bold"
        }}>
                <button className='swiper-button-prev' onClick={handleSlidePrev}>
                </button>
                <button className='swiper-button-next' onClick={handleSlideNext}>
                </button>
              </div>

</div>
}


{books.filter(book => book.genre === 'Non-Fiction').length !== 0 &&
        <div className='genre-container'>
        <div>
            <h2 className='genre-word'>Non-Fiction</h2>
          </div>
          <Swiper
          slidesPerView={7}
          spaceBetween={25}
          loop={true}
          slidesPerGroup={3}
          className='swiper-container'
          onSwiper={swiper => {
            swiperRef.current = swiper;
          }}

          navigation={{
            prevEl: '.swiper-button-prev',
            nextEl: '.swiper-button-next'
          }}
        >
        {nonFictionBooks.map(book => (
          <SwiperSlide key={book.id}>
              <NavLink to={`/books/${book.id}`} className="swiper-slide-link">
                <div className='homepage-book-container-info'>
                  <img className='will-change-to-img' src={book.cover_art} onError={e => { e.target.src = 'https://librarygenesis.net/wp-content/uploads/2018/11/library-genesis.jpg' }} alt='cover-photo' />
                  <div className='home-book-title'>{book.title}</div>
                  <div className='home-book-author'>{book.author}</div>
                </div>
              </NavLink>
          </SwiperSlide>
        ))}
      </Swiper>
        <div className='swiper-navigation'    style={{
          "--swiper-navigation-size": "20px",
          "font-weight": "bold"
        }}>
                <button className='swiper-button-prev' onClick={handleSlidePrev}>
                </button>
                <button className='swiper-button-next' onClick={handleSlideNext}>
                </button>
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
