
import { NavLink } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper-bundle.css';
import SwiperCore, { Navigation } from 'swiper';
import 'swiper/modules/navigation/navigation.scss';
import './index.css'


SwiperCore.use([Navigation]);


export default function Carousel({books, carouselId}) {

    return (
      <>

<style>
      {`
        .swiper-container {
          --swiper-navigation-size: 22px;
        }
      `}
    </style>

         <Swiper
          slidesPerView={7}
          spaceBetween={25}
          key={`${carouselId}`}
          loop={true}
          slidesPerGroup={3}
          className='swiper-container'
          navigation={true}
        >
        <div className='books-carousel'>
        {
                  books.map(book => (
                      <SwiperSlide key={book.id}>
                        <NavLink
                          to={`/books/${book.id}`}
                          style={{ textDecoration: 'none' }}>
                          <img className='will-change-to-img' src={book.cover_art} onError={e => {e.target.src = 'https://librarygenesis.net/wp-content/uploads/2018/11/library-genesis.jpg'}} alt='cover-photo'/>
                        </NavLink>
                        </SwiperSlide>
                  ))
                }
                </div>
        </Swiper>
              </>
    )
}
