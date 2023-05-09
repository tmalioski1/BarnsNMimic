import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Glide from '@glidejs/glide';

const GlideSlider = ({ books }) => {
  useEffect(() => {
    new Glide('.glide', {
      type: 'slider',
      startAt: 0,
      perView: 5,
      gap: 20,
      peek: {
        before: 50,
        after: 50
      },
      breakpoints: {
        1024: {
          perView: 4
        },
        800: {
          perView: 3
        },
        480: {
          perView: 1
        }
      }
    }).mount();
  }, []);

  return (
    <div className="glide">
      <div className="glide__track" data-glide-el="track">
        <ul className="glide__slides">
          {books.map(book => (
            <li className="glide__slide" key={book.id}>
              <NavLink to={`/books/${book.id}`}>
                <img
                  src={book.cover_art}
                  onError={e => {
                    e.target.src =
                      'https://librarygenesis.net/wp-content/uploads/2018/11/library-genesis.jpg';
                  }}
                  alt="cover-photo"
                />
                <div className="home-book-title">{book.title}</div>
                <div className="home-book-author">{book.author}</div>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      <div className="glide__arrows" data-glide-el="controls">
        <button
          className="glide__arrow glide__arrow--left"
          data-glide-dir="<"
          style={{ padding: '0', border: 'none', background: 'none', marginRight: '2%' }}
        >
          <svg
            viewBox="0 0 24 24"
            width="24"
            height="24"
            stroke="#000000"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-chevron-left"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <button
          className="glide__arrow glide__arrow--right"
          data-glide-dir=">"
          style={{ padding: '0', border: 'none', background: 'none', marginLeft: '2%' }}
        >
          <svg
            viewBox="0 0 24 24"
            width="24"
            height="24"
            stroke="#000000"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-chevron-right"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default GlideSlider;
