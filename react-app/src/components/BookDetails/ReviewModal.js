import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {useModal} from '../../context/Modal';
import { DynamicStar } from 'react-dynamic-star';
import { postAReview } from "../../store/reviews"
import './reviewmodal.css'


function ReviewModal(currentBookId) {
    const bookId = currentBookId.currentBookId
    const dispatch = useDispatch();
    const userObj = useSelector(state => state.session?.user)
    const bookObj = useSelector(state => state.books.singleBook);
    const bookData = Object.values(bookObj)
    const book = bookData[0]
    const reviewsObj = useSelector(state => state.reviews.reviews)
    const reviews = Object.values(reviewsObj)
    const history = useHistory()
    const {closeModal} = useModal()
    const [newStars, setStars] = useState('')
    const [newReviewTitle, setReviewTitle] = useState('')
    const [newReviewTxt, setReviewTxt] = useState('')
    const [newRecommended, setRecommended] = useState('')
    const [newSpoilers, setSpoilers] = useState('')
    const [validationErrors, setValidationErrors] = useState([])
    const [hasSubmitted, setHasSubmitted] = useState(false);

    useEffect(()=> {
        const errors = [];
        if (newReviewTitle.length > 50) errors.push('Exceeded maximum character limit')
        setValidationErrors(errors)
      }, [newReviewTitle])


    const handleSubmit = async (e) => {
        e.preventDefault()
        setHasSubmitted(true);
        if (validationErrors.length) return alert(`Cannot Submit`);
        const payload = {
            'user_id': userObj.id,
            'book_id': bookId,
            'stars': newStars,
            'review_title': newReviewTitle,
            'review_txt': newReviewTxt,
            'recommended': newRecommended,
            'spoilers': newSpoilers
        }
            const postedReview = await dispatch(postAReview(bookId, payload))

            if(postedReview) {
              (closeModal)
              (history.push(`/books/${bookId}`))
            }

    }



return (
    <div className='review-form-container'>
      <div className='review-form-left-side'>
         <div className='review-form-cover_art'>
          <img src={bookData[0].cover_art}/>
          </div>
          <div className='review-form-left-side-info'>{bookData[0].publisher} - {bookData[0].title}</div>
      </div>
      <div className='review-form-right-side'>
     <div className ='review-form-header-container'>
      <div className ='review-form-header-text-container'>
     <span className='review-form-header'>My Review for {book.title}</span>
     </div>
     <div className='review-form-required-field-note-container'>
     <span className='review-form-required-field-note'>Required fields are marked with *</span>
     </div>
     </div>

     {hasSubmitted && validationErrors.length > 0 && (
        <div>
          The following errors were found:
          <ul>
            {validationErrors.map(error => (
              <li key={error}>{error}</li>
            ))}
          </ul>
   </div>
)}
    <form id ='post-review-form' onSubmit={handleSubmit}>
     <div className='review-form-stars'>
    <label>
      <div className='label-and-stars'>
      <span className='overall-star-rating'>Overall rating*</span>
        <DynamicStar
        rating={newStars}
        fullStarColor={'grey'}
        width={40}
        height={40}
        outlined={true}
     />
     </div>
     <div className='dropdown-with-text'>
     <span className='choose-to-rate-text'>Select to Rate!</span>
    <input
     className='choose-to-rate-dropdown'
     type='number'
     min='1'
     max='5'
     value={newStars}
     onChange={(e) => setStars(e.target.value)}
     required
    />
    </div>
    </label>
    </div>

    <div className='review-form-beneath-stars'>
    <div className='review-form-title'>
    <label>
     Review Title*
    <input
    type="text"
    maxLength={50}
    value={newReviewTitle}
    placeholder= 'Example: Great Read, Highly Recommended!(Maximum of 50 characters)'
    onChange={(e) => setReviewTitle(e.target.value)}
    required
    />
    <span className={newReviewTitle.length === 50 ? 'title-length-counter-red' : 'title-length-counter-normal'}>{50-newReviewTitle.length} characters remaining</span>
    </label>
    </div>


    <div className='review-form-review-txt'>
    <div className='review-form-review-txt-title'>
     Review*
     </div>
    <textarea
    type="textarea"
    value={newReviewTxt}
    placeholder= 'Tell Others What You Thought!'
    onChange={(e) => setReviewTxt(e.target.value)}
    required
    />
    </div>

    <div className='review-form-recommended-buttons'>
    <label>
    <span className='recommended-question'>
    Would you recommend this product to a friend?
    </span>
    <button
     value={newRecommended}
     onClick={(e) => {
        e.preventDefault()
        setRecommended('Yes')}}
    >
    Yes
    </button>
    <button
     value={newRecommended}
     onClick={(e) => {
        e.preventDefault()
        setRecommended('No')}}
    >
    No
    </button>
    </label>
    </div>

    <div className='review-form-spoilers-buttons'>
    <label>
      <span className='spoilers-question'>
    Does your review contain spoilers?
    </span>
    <button
     value={newRecommended}
     onClick={(e) => {
        e.preventDefault()
        setSpoilers('Yes')}}
    >
    Yes
    </button>
    <button
     value={newRecommended}
     onClick={(e) => {
        e.preventDefault()
        setSpoilers('No')}}
    >
    No
    </button>
    </label>
    </div>

    <button className='review-submit-button' type="submit">Post Review</button>
    </div>
    </form>
    </div>
    </div>
)
}


export default ReviewModal
