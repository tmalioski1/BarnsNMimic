import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getAllBooks } from '../../store/books'
import { getCart } from '../../store/carts';
import './homepage.css'
import Carousel from "../Carousel/index"






const Homepage = () => {
  const dispatch = useDispatch();
  const booksObj = useSelector(state => state.books.allBooks);
  const user = useSelector((state) => state.session.user);
  const books = Object.values(booksObj)
  const fictionBooks = [...books.filter(book => book.genre === 'Fiction'), ...books.filter(book => book.genre === 'Fiction')];
  const nonFictionBooks = [...books.filter(book => book.genre === 'Non-Fiction'), ...books.filter(book => book.genre === 'Non-Fiction')];
  const scienceFictionBooks =[...books.filter(book => book.genre === 'Science Fiction'), ...books.filter(book => book.genre === 'Science Fiction')];
  const trueCrimeBooks = books.filter(book => book.genre === 'True Crime')
  const romanceBooks = books.filter(book => book.genre === 'Romance')
  const cookBooks = books.filter(book => book.genre === 'Cooking')
  const biographyBooks = books.filter(book => book.genre === 'Biography')
  const currentEventBooks = books.filter(book => book.genre === 'Current Events')

  console.log('fictionbookslength---', fictionBooks.length)
  console.log('nonfictionlength---', nonFictionBooks.length)
  console.log('sciencefictionlength---', scienceFictionBooks.length)


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
    <div className="genre-container">
    <h2 className="genre-word">Fiction</h2>
    <Carousel books={fictionBooks} carouselId='fiction'/>
  </div>
}


{books.filter(book => book.genre === 'Non-Fiction').length !== 0 &&
    <div className="genre-container">
    <h2 className="genre-word">Non-
    Fiction</h2>
    <Carousel books={nonFictionBooks} carouselId="nonfiction" />
  </div>

}

{books.filter(book => book.genre === 'Science Fiction').length !== 0 &&
        <div className='genre-container'>
          <h2 className='genre-word'>Science Fiction</h2>
          <Carousel books={scienceFictionBooks} carouselId="science-fiction"/>
          </div>

}

{books.filter(book => book.genre === 'True Crime').length !== 0 &&
        <div className='genre-container'>
          <h2 className='genre-word'>True Crime</h2>
          <Carousel books={trueCrimeBooks} carouselId="true-crime"/>
          </div>

}

{books.filter(book => book.genre === 'Romance').length !== 0 &&
        <div className='genre-container'>
          <h2 className='genre-word'>Romance</h2>
          <Carousel books={romanceBooks} carouselId="romance"/>
          </div>

}

{books.filter(book => book.genre === 'Current Events').length !== 0 &&
        <div className='genre-container'>
          <h2 className='genre-word'>Current Events</h2>
          <Carousel books={currentEventBooks} carouselId="current-events"/>
          </div>

}


{/* {books.filter(book => book.genre === 'Biography').length !== 0 &&
        <div className='genre-container'>
          <h2 className='genre-word'>Biography</h2>
          <Carousel books={biographyBooks} carouselId="biography"/>
          </div>

}


{books.filter(book => book.genre === 'Cooking').length !== 0 &&
        <div className='genre-container'>
          <h2 className='genre-word'>Cooking</h2>
          <Carousel books={cookBooks} carouselId="cookbooks"/>
          </div>

}



 */}


        </div>
    </section>
    </>
  )

}


export default Homepage;
