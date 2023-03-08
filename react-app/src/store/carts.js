const GET_CART = 'cart/GET_CART';
const ADD_ITEM = 'cart/ADD_ITEM';



const getCart = (cartItems) => ({
    type: GET_CART,
    cartItems
})

const addItem = (book) => ({
    type: ADD_ITEM,
    book
});



export const getCartItems = () => async (dispatch) => {
    const response = await fetch('/api/cart');
    if (response.ok) {
        const cart = await response.json()
        dispatch(getCart(cart));
    };
};


export const addItemToCart = (book) => async (dispatch) => {
    const response = await fetch(`/api/cart/newItem/${book.id}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({book})
    });
    console.log('this is the response---', response)
    if (response.ok) {
        const newCartItem = await response.json();
        dispatch(addItem(newCartItem));
        return newCartItem;
    };
};










const cartReducer = (state = {}, action) => {
    let newState = {...state}
    switch (action.type) {
        case GET_CART:
            newState = {}
            const cartList = [...action.cartItems.cartItems];
            cartList.forEach(cartItem => {
                newState[cartItem.id] = cartItem
            })
            return newState

        case ADD_ITEM:
            newState[action.cartItem.id] = action.book
            console.log('this is the action.cartItem---', action.cartItem)
            console.log('this is the newState', newState)
            return newState


        default:
            return state;
    }
}

export default cartReducer
