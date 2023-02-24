const GET_CART = 'cart/GET_CART';
const ADD_ITEM = 'cart/ADD_ITEM';
const MINUS_ONE = 'cart/MINUS_ONE';
const REMOVE_ITEM = 'cart/REMOVE_ITEM';
const CHECKOUT_CART = 'cart/CHECKOUT_CART';


const getCart = (cartItems) => ({
    type: GET_CART,
    cartItems
})

const addItem = (book) => ({
    type: ADD_ITEM,
    book
});

const minusOne = (book) => ({
    type: MINUS_ONE,
    book
});

const removeItem = (book) => ({
    type: REMOVE_ITEM,
    book
});

const checkoutCart = (cart) => ({
    type: CHECKOUT_CART,
    cart
});


export const getCartItems = () => async (dispatch) => {
    const response = await fetch('/api/cart');
    if (response.ok) {
        const cart = await response.json()
        dispatch(getCart(cart));
    };
};


export const addItemToCart = (book) => async (dispatch) => {
    console.log('this is the book.id---', book.id)
    const response = await fetch(`/api/cart/newItem/${book.id}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({book})
    });
    if (response.ok) {
        const newBook = await response.json();
        dispatch(addItem(newBook));
        return newBook;
    };
};

export const addOneToCart = (book) => async (dispatch) => {

    const response = await fetch(`/api/cart/addItem/${book.id}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({book})
    });
    if (response.ok) {
        const newBook = await response.json();
        dispatch(addItem(newBook));
        return null;
    };
};


export const minusOneToCart = (book) => async (dispatch) => {

    const response = await fetch(`/api/cart/minus/${book.id}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({book})
    });
    if (response.ok) {
        const removedBook = await response.json();
        dispatch(minusOne(removedBook));
        return null;
    };
};


export const removeFromCart = (book) => async (dispatch) => {

    const response = await fetch(`/api/cart/${book.id}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'}
    });
    if (response.ok) {
        const removedBook = await response.json();
        dispatch(removeItem(removedBook));
        return null;
    };
};


export const checkoutACart = (cart) => async (dispatch) => {
    const response = await fetch(`/api/cart/checkout/${cart}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'}
    });
    if (response.ok) {
        const cart = await response.json();
        dispatch(checkoutCart(cart));
        return null;
    };
};


const initialState = {}

const cartReducer = (state = initialState, action) => {
    let newState = {...state}
    switch (action.type) {
        case GET_CART:
            newState = {}
            const cartList = [...action.cartItems.cartItems];
            cartList.forEach(item => {
                newState[item.id] = item
            })
            return newState
        case ADD_ITEM:
            newState[action.book.id] = action.book
            console.log('this is the action.book---', action.book)
            console.log('this is the newState', newState)
            return newState
        case MINUS_ONE:
            newState[action.book.id] = action.book
            if(!action.book.quantity){
                delete newState[action.book.id]
            }

            return newState
        case REMOVE_ITEM:
            delete newState[action.book.id]
            return newState
        case CHECKOUT_CART:
            newState = {}
            delete newState[action.cart.id]
            return newState
        default:
            return state;
    }
}

export default cartReducer
