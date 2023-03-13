import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {useModal} from '../../context/Modal';
import {  updateABook } from "../../store/books"
import './editbookmodal.css'


function EditBookModal(currentBookId) {
    const sessionUser = useSelector(state => state.session.user);
    const bookId = currentBookId.currentBookId
    const dispatch = useDispatch();
    const history = useHistory();
    const booksObj = useSelector(state => state.books.singleBook.book)
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
    const [cover_art, setCoverArt] = useState(booksObj?.cover_art)
    const [pages, setPages] = useState(booksObj.pages)

    const [validationErrors, setValidationErrors] = useState([])
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [imageLoading, setImageLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const {closeModal} = useModal()


    useEffect(()=> {
      const errors = [];
      if (!price_paperback && !price_hardcover && !price_eBook) errors.push('Book must have at least one price')
      setValidationErrors(errors);
    }, [price_paperback, price_hardcover, price_eBook])


    const handleSubmit = async (e) => {
        e.preventDefault()
        setHasSubmitted(true);
        if (validationErrors.length) return alert(`Cannot Submit`);
        const formData = new FormData()
        formData.append('publisher_id', sessionUser.id)
        formData.append('title', title)
        formData.append('author', author)
        formData.append('price_paperback', price_paperback)
        formData.append('price_hardcover', price_hardcover)
        formData.append('price_eBook', price_eBook)
        formData.append('genre', genre)
        formData.append('overview', overview)
        formData.append('editorial_review', editorial_review)
        formData.append('publication_date', publication_date)
        formData.append('publisher', publisher)
        formData.append('cover_art', cover_art)
        formData.append('pages', pages)

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


        const editedBook = await dispatch(updateABook(formData, bookId))


        if(editedBook) {
          (closeModal)
          (history.push(`/books/${bookId}`))
        }else{
          setImageLoading(false);
          // a real app would probably use more advanced
          // error handling
          console.log("error");
        }
    }





      return (
        <div className='upload-form-container'>
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

            <label>
                Title
            <input
                type='text'
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                placeholder='Title'
                name='title'
                id= 'edit-form-book_title'
                required
              />
            </label>


            <label>
            Author
            <input
                type='text'
                onChange={(e) => setAuthor(e.target.value)}
                value={author}
                placeholder='Author'
                name='author'
                id= 'edit-form-book_author'
                required
              />
            </label>

            <label>
            Paperback Price
            <input
             type="number"
             step="0.01"
             min= '1'
             value={price_paperback}
             placeholder= '$'
             onChange={(e) => setPricePaperback(e.target.value)}
             required
            />
            </label>

            <label>
            Hardcover Price
            <input
             type="number"
             step="0.01"
             min= '1'
             value={price_hardcover}
             placeholder= '$'
             onChange={(e) => setPriceHardcover(e.target.value)}
             required
            />
            </label>

            <label>
            eBook Price
            <input
             type="number"
             step="0.01"
             min= '1'
             value={price_eBook}
             placeholder= '$'
             onChange={(e) => setPriceeBook(e.target.value)}
             required
            />
            </label>

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

            <label>
            Overview
            <textarea
             type="textarea"
             value={overview}
             placeholder= 'Overview'
             onChange={(e) => setOverview(e.target.value)}
             required
            />
            </label>

            <label>
            Editorial Review
            <textarea
             type="textarea"
             value={editorial_review}
             placeholder= 'Editorial Review'
             onChange={(e) => setEditorialReview(e.target.value)}
            />
            </label>


            <label>
            Publication Date
            <input
             type="date"
             value={publication_date}
             placeholder= 'Publication Date'
             onChange={(e) => setPublicationDate(e.target.value)}
             required
            />
            </label>


            <label>
            Publisher
            <input
             type="text"
             value={publisher}
             placeholder= 'Publisher'
             onChange={(e) => setPublisher(e.target.value)}
             required
            />
            </label>

            <div id='upload-form-coverArt'>
             <label id='upload-form-coverArt-label' for="upload-cover-art">Upload Cover Art</label>
            <input
             type="file"
             accept="image/png, image/jpeg, image/jpg"
             placeholder= 'Cover Art'
             onChange={(e) => setCoverArt(e.target.files[0])}
             required
             name='cover_art'
            />
             </div>

            <label>
            Pages
            <input
             type="number"
             min= '1'
             value={pages}
             placeholder= 'Pages'
             onChange={(e) => setPages(e.target.value)}
             required
            />
            </label>

              <button className="editBook-button" type='submit'>Update</button>

        </form>
        </div>
        </div>
      )
}
export default EditBookModal
