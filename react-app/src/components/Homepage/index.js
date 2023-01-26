import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getAllBooks } from '../../store/books'
import { NavLink } from 'react-router-dom';

import './homepage.css'


const Homepage = () => {
    const dispatch = useDispatch();
    const booksObj = useSelector(state => state.books.allBooks);
    const books = Object.values(booksObj)

    useEffect(() => {
        dispatch(getAllBooks())
      }, [dispatch])




if (!books.length) {
  return null
}




return (
    <section className="HomePage Container">
        <div id='book-container'>
            {
             books.map(book => (
                <div className = 'book-container' key={book.id}>
                    <div>{book.author}</div>
                </div>
             ))

            }

        </div>
    </section>

  )

}


export default Homepage;
