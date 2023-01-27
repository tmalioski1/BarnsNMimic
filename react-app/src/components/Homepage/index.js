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
        <div id='main-books-container'>
            {
             books.map(book => (
                <div className ='single-book-container' key={book.id}>
                    <NavLink
                      to={`/books/${book.id}`} style={{textDecoration: 'none'}}>
                        <div>{book.title}</div>
                        </NavLink>
                </div>
             ))

            }

        </div>
    </section>

  )

}


export default Homepage;
