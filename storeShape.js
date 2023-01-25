store = {
    session: {
        user: {
            userData
        }
    },
    
    books: {

      allBooks: {
        [bookId]: {
          bookData,
        },

      },
      singleBook: {
        bookData,
      },
    },

    reviews: {
      book: {
        [reviewId]: {
          reviewData,
        },
    }
    }
}
