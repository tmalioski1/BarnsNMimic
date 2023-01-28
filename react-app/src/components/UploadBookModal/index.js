import React, {useState, useEffect} from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { createBook } from '../../store/books'
import { useSelector } from "react-redux";
import './uploadbook.css'


const UploadBookModal = () => {
  const sessionUser = useSelector(state => state.session.user);
  const history = useHistory()
  const dispatch = useDispatch()
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [type, setType] = useState('Paperback')
  const [price_paperback, setPricePaperback] = useState('')
  const [price_hardcover, setPriceHardCover] = useState('')
  const [price_eBook, setPriceeBook] = useState('')
  const [genre, setGenre] = useState('Fiction')
  const [overview, setOverview] = useState('')
  const [editorial_review, setEditorialReview] = useState('')
  const [publication_date, setPublicationDate] = useState('')
  const [publisher, setPublisher] = useState('')
  const [cover_art, setCoverArt] = useState('')
  const [pages, setPages] = useState('')
  const [validationErrors, setValidationErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const {closeModal} = useModal();

  useEffect(()=> {
    const errors = [];

    if (price_paperback <= 0) errors.push('Price must be greater than 0');
    if (price_hardcover <= 0) errors.push('Price must be greater than 0');
    if (price_eBook <= 0) errors.push('Price must be greater than 0');
    if (pages <= 0) errors.push('Pages must be greater than 0');
    setValidationErrors(errors);
  }, [price_paperback, price_hardcover, price_eBook, pages])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setHasSubmitted(true);
    if (validationErrors.length) return alert(`Cannot Submit`);

    const newBook = {
      'publisher_id': sessionUser.id,
      'title': title,
      'author': author,
      'type': type,
      'price_paperback': price_paperback,
      'price_hardcover': price_hardcover,
      'price_eBook': price_eBook,
      'genre': genre,
      'overview': overview,
      'editorial_review': editorial_review,
      'publication_date': publication_date,
      'publisher': publisher,
      'cover_art': cover_art,
      'pages': pages
    }

    let createdBook = await dispatch(createBook(newBook))


    if(createdBook) {
      (closeModal)
      (history.push(`/books/${createdBook.id}`))
    }
  }







    return (
      <>
      <div id='header-div'>
      <h1 className='header-upload'>Upload Book here</h1>
      </div>

      <div className="upload-form-container-check">
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
      <form id= 'upload-form' onSubmit={handleSubmit}  method="post" enctype="multipart/form-data">

          <div id='upload-form-title'>
            <label>
            Title
            <input
             type="text"
             value={title}
             placeholder= 'Title'
             onChange={(e) => setTitle(e.target.value)}
             required
            />
            </label>
             </div>

          <div id='upload-form-author'>
            <label>
            Author
            <input
             type="text"
             value={author}
             placeholder= 'Author'
             onChange={(e) => setAuthor(e.target.value)}
             required
            />
            </label>
             </div>


          <select
            onChange={(e) => setType(e.target.value)}
            value={type}
            name='type'
            id='upload-form-type'
            className='Select-Upload-Book-Input'
            >
              <option value="Paperback">Paperback</option>
              <option value="Hardcover">Hardcover</option>
              <option value="eBook">eBook</option>
          </select>

          <div id='upload-form-pricePaperback'>
            <label>
            Paperback Price
            <input
             type="number"
             value={price_paperback}
             placeholder= '$'
             onChange={(e) => setPricePaperback(e.target.value)}
             required
            />
            </label>
             </div>

          <div id='upload-form-priceHardcover'>
            <label>
            Hardcover Price
            <input
             type="number"
             value={price_hardcover}
             placeholder= '$'
             onChange={(e) => setPriceHardCover(e.target.value)}
             required
            />
            </label>
             </div>

          <div id='upload-form-eBook'>
            <label>
            eBook Price
            <input
             type="number"
             value={price_eBook}
             placeholder= '$'
             onChange={(e) => setPriceeBook(e.target.value)}
             required
            />
            </label>
             </div>

          <select
          onChange={(e) => setGenre(e.target.value)}
          value={genre}
          name='genre'
          id='upload-form-genre'
          className='Select-Upload-Book-Input'
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

          <div id='upload-form-overview'>
            <label>
            Overview
            <input
             type="text"
             value={overview}
             placeholder= 'Overview'
             onChange={(e) => setOverview(e.target.value)}
             required
            />
            </label>
             </div>

          <div id='upload-form-editorialReview'>
            <label>
            Editorial Review
            <input
             type="text"
             value={editorial_review}
             placeholder= 'Editorial Review'
             onChange={(e) => setEditorialReview(e.target.value)}
             required
            />
            </label>
             </div>


          <div id='upload-form-publicationDate'>
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
             </div>


          <div id='upload-form-publisher'>
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
             </div>

          <div id='upload-form-coverArt'>
            <label>
            Cover Art
            <input
             type="url"
             value={cover_art}
             placeholder= 'Cover Art'
             onChange={(e) => setCoverArt(e.target.value)}
             required
            />
            </label>
             </div>

          <div id='upload-form-pages'>
            <label>
            Pages
            <input
             type="number"
             value={pages}
             placeholder= 'Pages'
             onChange={(e) => setPages(e.target.value)}
             required
            />
            </label>
             </div>



          <button className='book-submit-button' type="submit">Upload</button>
      </form>


  </div>

  </>
    )
  }

    export default UploadBookModal;
