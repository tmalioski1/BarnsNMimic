import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import BookDetails from "./components/BookDetails";
import Homepage from "./components/Homepage";
import Checkout from "./components/Checkout";
import { authenticate } from './store/session';

function App() {
  const bookObj = useSelector(state => state.books.singleBook);
  const bookData = Object.values(bookObj)
  const book = bookData[0]
  const [loaded, setLoaded] = useState(false);
  const [itemPrice, setItemPrice] = useState(book?.price_paperback || 0)
  const dispatch = useDispatch();


  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
     <>
      <NavBar loaded={loaded} />
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <Route path='/checkout' exact={true}  >
        <Checkout itemPrice={itemPrice} setItemPrice={setItemPrice}/>
        </Route>
        <Route path='/books/:id' exact = {true}>
        <BookDetails itemPrice={itemPrice} setItemPrice={setItemPrice}/>
        </Route>
        <Route path='/' exact={true} >
        <Homepage />
        </Route>
      </Switch>
      </>
  );
}

export default App;
