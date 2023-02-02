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
     <div className ='review-form-header-container'>
     <h1 className='review-form-header'>My Review for {book.title}</h1>
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
        <DynamicStar
        rating={newStars}
        fullStarColor={'black'}
        width={18}
        height={30}
        outlined={true}
     />
    <input
     type='number'
     min='1'
     max='5'
     value={newStars}
     onChange={(e) => setStars(e.target.value)}
     required
    />
    </label>
    </div>


    <div className='review-form-title'>
    <label>
     Review Title
    <input
    type="text"
    value={newReviewTitle}
    placeholder= 'Example: Great Read, Highly Recommended!(Maximum of 50 characters)'
    onChange={(e) => setReviewTitle(e.target.value)}
    required
    />
    </label>
    </div>


    <div className='review-form-review-txt'>
    <label>
     Review
    <textarea
    type="textarea"
    value={newReviewTxt}
    placeholder= 'Tell Others What You Thought!'
    onChange={(e) => setReviewTxt(e.target.value)}
    required
    />
    </label>
    </div>

    <div className='review-form-recommended-buttons'>
    <label>
    Would you recommend this product to a friend?
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
    Does your review contain spoilers?
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

    </form>
    </div>
)
}


export default ReviewModal
