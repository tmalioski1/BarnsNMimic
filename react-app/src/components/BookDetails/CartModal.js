import { useSelector, useDispatch } from 'react-redux';
import './cartmodal.css'

function CartModal({currentBookId, isOpen, priceFormat}) {
    const bookObj = useSelector(state => state.books.singleBook);
    const bookData = Object.values(bookObj)
    const book = bookData[0]

    let price;
    if (priceFormat === 'price_paperback') {
        price = book.price_paperback;
    } else if (priceFormat === 'price_hardcover') {
        price = book.price_hardcover;
    } else if (priceFormat === 'price_eBook') {
        price = book.price_eBook;
    }

    return (
        <>
        <div>Item Successfully Added to Your Cart</div>
        <img src={book.cover_art}></img>
        <div>{price}</div>
        </>
    )

}


export default CartModal
