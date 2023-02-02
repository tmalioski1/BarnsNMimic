const GET_ALL_REVIEWS = 'review/GET_ALL_REVIEWS'
const POST_REVIEW = 'review/POST_REVIEW'
const DELETE_REVIEW = 'review/DELETE_REVIEW'




const getAll = (reviews) => ({
    type: GET_ALL_REVIEWS,
    reviews
})


const postReview = (review) => ({
  type: POST_REVIEW,
  review
})


const deleteReview = (reviewId) => ({
  type: DELETE_REVIEW,
  reviewId
})


export const getAllReviews = (id) => async (dispatch) => {
    const response = await fetch(`/api/books/${id}/reviews`);

    if (response.ok) {
      const reviews = await response.json();

      dispatch(getAll(reviews));
    }
    return response
  };


  export const postAReview = (id, payload) => async(dispatch) => {
    const response = await fetch(`/api/books/${id}/reviews/new`, {

        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
    })

    if (response.ok){
      const newReview = await response.json()
      dispatch(postReview(newReview))
      return newReview
    }

  }


  export const deleteAReview = (reviewId) => async(dispatch) => {
    const response = await fetch(`/api/books/reviews/${reviewId}`, {
      method: 'DELETE'
    })
    console.log('response', response)
    if (response.ok){
      const deletionResponse = await response.json()

      dispatch(deleteReview(reviewId))
      return deletionResponse
    }
  }

  const initialState = { reviews: {} }

  const reviewsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_REVIEWS: {

          const newState = { ...state }
          const newObject = {}
          action.reviews.reviews.forEach(review => {
            newObject[review.id] = review
          })
         newState.reviews = newObject
         return newState
        }

        case POST_REVIEW: {
          const newState = {...state}
          const newObject = {...state.reviews}
          newObject[action.review.id] = action.review
          newState.reviews = newObject
          return newState
        }

        case DELETE_REVIEW:{
          const newState = {...state}
          const newObject = {...state.reviews}
          delete newObject[action.reviewId]
          newState.reviews = newObject
          return newState
        }




        default:
          return state

      }

}


export default reviewsReducer
