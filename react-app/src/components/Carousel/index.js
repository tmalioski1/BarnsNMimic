import {  useRef } from 'react';

import { NavLink } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper-bundle.css';
import SwiperCore, { Navigation } from 'swiper';
import 'swiper/modules/navigation/navigation.scss';


SwiperCore.use([Navigation]);


export default function Carousel({books, carouselId}) {

const swiperRef = useRef(null);

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
      <div className="carousel-component">
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
            prevEl: `#swiper-button-prev-${carouselId}`,
            nextEl: `#swiper-button-next-${carouselId}`,
          }}
        >
        <div className="carousel-slides">
        {
                  books.map(book => (
                      <SwiperSlide>
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
                        </SwiperSlide>
                  ))
                }
          </div>
        </Swiper>

            <div className='swiper-navigation'    style={{
          "--swiper-navigation-size": "20px",
          "font-weight": "bold"
        }}>
          <button
          id={`swiper-button-prev-${carouselId}`}
          className="swiper-button-prev"
          onClick={handleSlidePrev}
        ></button>
        <button
          id={`swiper-button-next-${carouselId}`}
          className="swiper-button-next"
          onClick={handleSlideNext}
        ></button>
              </div>
              </div>
    )
}
