import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { getAllBooks } from '../../store/books'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper-bundle.css';

import SwiperCore, { Navigation } from 'swiper';
// import 'swiper/swiper.min.css';
import 'swiper/modules/navigation/navigation.scss';
import './index.css'



SwiperCore.use([Navigation]);



function Fiction() {
    const dispatch = useDispatch();
    const booksObj = useSelector(state => state.books.allBooks);
    const books = Object.values(booksObj)
    const fictionBooks = books.filter(book => book.genre === 'Fiction')
    const swiperRef = useRef(null);

    useEffect(() => {
        dispatch(getAllBooks())
      }, [dispatch])

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
    <div className='catagories-home-link-container'>
    <NavLink to={`/`} className='catagories-home-link'>Home</NavLink>
    </div>
    <h1 className='catagories-genre-header'>Fiction Books</h1>
    <h2 className='catagories-sentence-below-header'>Browse a variety of fiction genres including general fiction, literature, romance and many more.

</h2>


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


              </>
  );
}

export default Fiction;
