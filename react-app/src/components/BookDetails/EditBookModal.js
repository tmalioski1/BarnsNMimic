import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {useModal} from '../../context/Modal';
import {  updateABook } from "../../store/books"
import './editbookmodal.css'


function EditBookModal(currentBookId) {
    const bookId = currentBookId.currentBookId
    const dispatch = useDispatch();
    const history = useHistory();
    const booksObj = useSelector(state => state.books.singleBook.book)
    console.log('this is booksObj---', booksObj)
    const [publisher_id, setPublisherId] = useState(booksObj.publisher_id)
    const [title, setTitle] = useState(booksObj.title)
    const [author, setAuthor] = useState(booksObj.author)
    const [price_paperback, setPricePaperback] = useState(booksObj?.price_paperback)
    const [price_hardcover, setPriceHardcover] = useState(booksObj?.price_hardcover)
    const [price_eBook, setPriceeBook] = useState(booksObj?.price_eBook)
    const [genre, setGenre] = useState(booksObj.genre)
    const [overview, setOverview] = useState(booksObj.overview)
    const [editorial_review, setEditorialReview] = useState(booksObj.editorial_review)
    const [publication_date, setPublicationDate] = useState(booksObj.publication_date)
    const [publisher, setPublisher] = useState(booksObj.publisher)
    const [cover_art, setCoverArt] = useState(booksObj.cover_art)
    const [pages, setPages] = useState(booksObj.pages)

    const [validationErrors, setValidationErrors] = useState([])
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const {closeModal} = useModal()


    useEffect(()=> {
      const errors = [];
      if (!price_paperback && !price_hardcover && !price_eBook) errors.push('At least one book type must have a price')
      setValidationErrors(errors);
    }, [price_paperback, price_hardcover, price_eBook])


    const handleSubmit = async (e) => {
        e.preventDefault()
        setHasSubmitted(true);
        if (validationErrors.length) return alert(`Cannot Submit`);

        const paperback = ''
        const hardCover = ''
        const eBook = ''
        if (price_paperback === null) {
          setPricePaperback('')
        }
        if (price_hardcover === null) {
          setPriceHardcover('')
        }
        if (price_eBook === null) {
          setPriceeBook('')
        }

        const payload = {
          bookId,
          publisher_id,
          title,
          author,
          price_paperback,
          price_hardcover,
          price_eBook,
          genre,
          overview,
          editorial_review,
          publication_date,
          publisher,
          cover_art,
          pages

        }
        console.log('this is the payload with if statements------', payload)


        const editedBook = await dispatch(updateABook(payload, bookId))
        .catch(
          async (res) => {
            const data = await res.json()
            if(data && data.errors) setValidationErrors(data.errors)
          }
        )

        if(editedBook) {
          (closeModal)
          (history.push(`/books/${bookId}`))
        }
      }





      return (
        <>
          <div id='edit-header-div'>
            <h1 className='edit-header-upload'>Update Your Book Here</h1>
            </div>

        <div className="edit-book-form-container-check">
        {hasSubmitted && validationErrors.length > 0 &&(
            <div>
            The following errors were found:
            <ul>
              {validationErrors.map(error => (
                <div key={error}>{error}</div>
              ))}
            </ul>
     </div>
        )}

        <form id= 'edit-book-form' onSubmit={handleSubmit}>

            <div id='edit-book-form-title-container'>
            <label>
                Title
            <input
                type='text'
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                placeholder='Title'
                name='title'
                id= 'edit-form-book_title'
              />
            </label>
             </div>


            <div id='edit-book-form-author-container'>
            <label>
            Author
            <input
                type='text'
                onChange={(e) => setAuthor(e.target.value)}
                value={author}
                placeholder='Author'
                name='author'
                id= 'edit-form-book_author'
              />
            </label>
             </div>

            <div id='edit-book-form-pricePaperback-container'>
            <label>
            Paperback Price
            <input
             type="number"
             step="0.01"
             min= '1'
             value={price_paperback}
             placeholder= '$'
             onChange={(e) => setPricePaperback(e.target.value)}

            />
            </label>
             </div>

            <div id='edit-book-form-priceHardcover-container'>
            <label>
            Hardcover Price
            <input
             type="number"
             step="0.01"
             min= '1'
             value={price_hardcover}
             placeholder= '$'
             onChange={(e) => setPriceHardcover(e.target.value)}
            />
            </label>
             </div>

          <div id='edit-book-form-eBook-container'>
            <label>
            eBook Price
            <input
             type="number"
             step="0.01"
             min= '1'
             value={price_eBook}
             placeholder= '$'
             onChange={(e) => setPriceeBook(e.target.value)}
            />
            </label>
             </div>

            <select
              onChange={(e) => setGenre(e.target.value)}
              value={genre}
              name='genre'
              id='edit-form-genre'
              >
            <option value="Fiction">Fiction</option>
            <option value="Non-Fiction">Non-Fiction</option>
            <option value="Science Fiction">Science Fiction</option>
            <option value="True Crime">True Crime</option>
            <option value="Romance">Romance</option>
            <option value="Cooking">Cooking</option>
            <option value="Biography">Biography</option>
            <option value="Current Events">Current Events</option>
            </select>

            <div id='edit-book-form-overview-container'>
            <label>
            Overview
            <input
             type="textarea"
             value={overview}
             placeholder= 'Overview'
             onChange={(e) => setOverview(e.target.value)}
            />
            </label>
             </div>

          <div id='edit-book-form-editorial_review-container'>
            <label>
            Editorial Review
            <input
             type="text"
             value={editorial_review}
             placeholder= 'Editorial Review'
             onChange={(e) => setEditorialReview(e.target.value)}
            />
            </label>
             </div>


          <div id='edit-book-form-publication_date-container'>
            <label>
            Publication Date
            <input
             type="date"
             value={publication_date}
             placeholder= 'Publication Date'
             onChange={(e) => setPublicationDate(e.target.value)}
            />
            </label>
             </div>


          <div id='edit-book-form-publisher-container'>
            <label>
            Publisher
            <input
             type="text"
             value={publisher}
             placeholder= 'Publisher'
             onChange={(e) => setPublisher(e.target.value)}
            />
            </label>
             </div>

          <div id='edit-book-form-cover_art-container'>
            <label>
            Cover Art
            <input
             type="url"
             value={cover_art}
             placeholder= 'Cover Art'
             onChange={(e) => setCoverArt(e.target.value)}
            />
            </label>
             </div>

          <div id='edit-book-form-pages-container'>
            <label>
            Pages
            <input
             type="number"
             min= '1'
             value={pages}
             placeholder= 'Pages'
             onChange={(e) => setPages(e.target.value)}
            />
            </label>
             </div>

              <button className="editBook-button" type='submit'>Update</button>

        </form>
        </div>
        </>
      )
}
export default EditBookModal
