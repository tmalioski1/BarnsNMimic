
const GET_ALL_BOOKS = 'song/GET_ALL_BOOKS'
const GET_ONE_BOOK = 'song/GET_ONE_BOOK'
// const POST_BOOK = 'song/POST_BOOK'
// const UPDATE_BOOK = 'song/UPDATE_BOOK'
// const DELETE_BOOK = 'song/DELETE_BOOK'

const getAll = (books) => ({
    type: GET_ALL_BOOKS,
    books
})
const getOne = (book) => ({
    type:GET_ONE_BOOK,
    book
})

// const postSong = (song) => ({
//   type: POST_BOOK,
//   song
// })

// const updateSong = (song) => ({
//   type: UPDATE_BOOK,
//   song
// })

// const deleteSong = (songId) => ({
//   type: DELETE_BOOK,
//   songId
// })

export const getOneBook = (id) => async(dispatch) => {
    const response = await fetch(`/api/books/${id}`)
    console.log('this is the response', response)
    if(response.ok){
        const book = await response.json()
        dispatch(getOne(book))
        return book
    }
    return response
}

export const getAllBooks = () => async (dispatch) => {
    const response = await fetch(`/api/books`);
    if (response.ok) {
      const books = await response.json();
      dispatch(getAll(books));
    }
    return response
  };

//   export const createSong = (newSong) => async (dispatch) => {
//     console.log('thunk' , newSong)
//     const response = await fetch('/api/songs/', {
//       method: 'POST',
//       body: newSong
//     })
//     console.log('err?', response)

//     if (response.ok) {
//       const createdNewSong = await response.json();
//       dispatch(postSong(createdNewSong));
//       return createdNewSong;
//     }

//   }

//   export const updateASong = (payload, songId) => async dispatch => {
//     const response = await fetch(`/api/songs/${songId}`, {
//       method: 'PUT',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(payload)
//     })
//     if(response.ok) {
//       const editedSong = await response.json()
//       dispatch(updateSong(editedSong))
//     return editedSong
//     }
//   }

//   export const deleteASong = (songId) => async(dispatch) => {
//     const response = await fetch(`/api/songs/${songId}`, {
//      method: 'DELETE',
//     })
//     if (response.ok) {
//       const deletionResponse = await response.json();
//       dispatch(deleteSong(songId));
//       return deletionResponse
//     }
//  }



const initialState = { allBooks: {}, singleBook: {} }

const booksReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_BOOKS: {
          const newState = { allBooks: {}, singleBook: {} }
          action.books.books.forEach(book => {
            newState.allBooks[book.id] = book
          });

          return newState;
        }
        case GET_ONE_BOOK:{
            const newState = { allBooks: {...state.allBooks}, singleBook: {} }
            const specificBook = action.book
            newState.singleBook = specificBook
            return newState
        }

        // case POST_BOOK: {
        //   const newState = { ...state, allSongs: { ...state.allSongs}}
        //   newState.allSongs[action.song.id] = action.song;
        //   return newState
        // }

        // case UPDATE_BOOK: {
        //   const newState = { ...state, allSongs: { ...state.allSongs}}
        //   newState.allSongs[action.song.id] = action.song;
        //   return newState
        // }

        // case DELETE_BOOK: {
        //   const newState = {...state}
        //   const newAllSongsObject = {...state.allSongs}
        //   const newSingleSongObject = {}
        //   delete newAllSongsObject[action.songId]
        //   newState.singleSong = newSingleSongObject
        //   newState.allSongs = newAllSongsObject
        //   return newState
        // }

        default:
          return state

      }

}


export default booksReducer
