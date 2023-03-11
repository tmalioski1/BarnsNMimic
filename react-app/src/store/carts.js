const ADD_ITEM = 'cart/ADD_ITEM';



const addItem = (book) => ({
    type: ADD_ITEM,
    book
});






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
