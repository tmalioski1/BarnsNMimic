const GET_ALL_REVIEWS = 'review/GET_ALL_REVIEWS'

const getAll = (reviews) => ({
    type: GET_ALL_REVIEWS,
    reviews
})


export const getAllReviews = (id) => async (dispatch) => {
    const response = await fetch(`/api/books/${id}/reviews`);

    if (response.ok) {
      const reviews = await response.json();

      dispatch(getAll(reviews));
    }
    return response
  };

  const initialState = { reviews: {} }

  const reviewsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_REVIEWS: {

          const newState = { ...state }
          action.reviews.reviews.forEach(review => {
            newState.reviews = review
          })

         return newState

        }

        default:
          return state

      }

}


export default reviewsReducer
