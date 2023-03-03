
const GET_ALL_BOOKS = 'book/GET_ALL_BOOKS'
const GET_ONE_BOOK = 'book/GET_ONE_BOOK'
const POST_BOOK = 'book/POST_BOOK'
const UPDATE_BOOK = 'book/UPDATE_BOOK'
const UPDATE_PRICE = 'book/UPDATE_PRICE'
const DELETE_BOOK = 'book/DELETE_BOOK'

const getAll = (books) => ({
    type: GET_ALL_BOOKS,
    books
})
const getOne = (book) => ({
    type:GET_ONE_BOOK,
    book
})

const postBook = (book) => ({
  type: POST_BOOK,
  book
})

const updateBook = (book) => ({
  type: UPDATE_BOOK,
  book
})

const updatePrice = (book) => ({
  type: UPDATE_PRICE,
  book
})

const deleteBook = (bookId) => ({
  type: DELETE_BOOK,
  bookId
})

export const getOneBook = (id) => async(dispatch) => {
    const response = await fetch(`/api/books/${id}`)
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

  export const createBook = (newBook) => async (dispatch) => {
    const response = await fetch('/api/books/', {
      method: 'POST',
      body: newBook

    })
    if (response.ok) {
      const createdNewBook = await response.json();
      dispatch(postBook(createdNewBook));
      return createdNewBook;
    }

  }

  export const updateABook = (payload, bookId) => async dispatch => {
    const response = await fetch(`/api/books/${bookId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    console.log('this is the response----', response)
    if(response.ok) {
      const editedBook = await response.json()
      dispatch(updateBook(editedBook))
    return editedBook
    }
  }

  export const updateBookPrice = (book) => async dispatch => {
    console.log('this is the book selected format---', book.selected_format)
    const response = await fetch(`/api/books/selected_price/${book.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(book)
    })
    console.log('this is the response----', response)
    if(response.ok) {
      const updatedBook = await response.json()
      dispatch(updatePrice(updatedBook))
    return updatedBook
    }
  }

  export const deleteABook = (bookId) => async(dispatch) => {
    const response = await fetch(`/api/books/${bookId}`, {
     method: 'DELETE',
    })
    if (response.ok) {
      const deletionResponse = await response.json();
      dispatch(deleteBook(bookId));
      return deletionResponse
    }
 }



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

        case POST_BOOK: {
          const newState = { ...state, allBooks: { ...state.allBooks}}
          newState.allBooks[action.book.id] = action.book;
          return newState
        }

        case UPDATE_BOOK: {
          const newState = {...state}
          newState.allBooks[action.book.id] = action.book;
          newState.singleBook.book = action.book;
          return newState
        }

        case UPDATE_PRICE: {
          const newState = {...state}
          newState.allBooks[action.book.id] = action.book;
          newState.singleBook.book = action.book;
          return newState
        }

        case DELETE_BOOK: {
          const newState = {...state, allBooks: { ...state.allBooks}}
          delete newState.allBooks[action.id]
          return newState
        }

        default:
          return state

      }

}


export default booksReducer
