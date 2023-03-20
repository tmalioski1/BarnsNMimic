import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCart } from "../../store/carts";
import { removeCartItem } from "../../store/cart_items";
import SelectField from "../SelectField/SelectField";
import './checkout.css'

const Checkout = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  const usDollar = Intl.NumberFormat("en-US");
  let totalPrice = 0;


  if (!cart || !cart.cartItems) return null;

    return (
     <h1>My Shopping Cart</h1>
    );
  }

  export default Checkout;
