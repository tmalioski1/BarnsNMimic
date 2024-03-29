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
import ThankYou from "./components/ThankYou";
import Fiction from "./components/Fiction";
import NonFiction from "./components/NonFiction";
import ScienceFiction from "./components/ScienceFiction";
import TrueCrime from "./components/TrueCrime";
import Romance from "./components/Romance";
import Cooking from "./components/Cooking";
import Biography from "./components/Biography";
import CurrentEvents from "./components/CurrentEvents";
import { authenticate } from './store/session';

function App() {

  const [loaded, setLoaded] = useState(false);
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
        <Route path='/thank-you' exact={true}  >
        <ThankYou/>
        </Route>
        <Route path='/checkout' exact={true}  >
        <Checkout/>
        </Route>
        <Route path='/books/fiction' exact = {true}>
        <Fiction/>
        </Route>
        <Route path='/books/non-fiction' exact = {true}>
        <NonFiction/>
        </Route>
        <Route path='/books/science-fiction' exact = {true}>
        <ScienceFiction/>
        </Route>
        <Route path='/books/true-crime' exact = {true}>
        <TrueCrime/>
        </Route>
        <Route path='/books/romance' exact = {true}>
        <Romance/>
        </Route>
        <Route path='/books/cooking' exact = {true}>
        <Cooking/>
        </Route>
        <Route path='/books/biography' exact = {true}>
        <Biography/>
        </Route>
        <Route path='/books/current-events' exact = {true}>
        <CurrentEvents/>
        </Route>
        <Route path='/books/:id' exact = {true}>
        <BookDetails/>
        </Route>
        <Route path='/' exact={true} >
        <Homepage />
        </Route>
      </Switch>
      </>
  );
}

export default App;
