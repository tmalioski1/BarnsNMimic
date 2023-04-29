import React, { useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux'
import OpenModalButton from '../OpenModalButton'
import LogoutButton from '../auth/LogoutButton';
import UploadNewBook from '../UploadBookModal'
import { getCart } from "../../store/carts";

import './navbar.css'

const NavBar = ({loaded}) => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const cartItems= useSelector((state) => state?.cart?.cartItems);
  let cartItemsArray = [];
  if (cartItems && Object.keys(cartItems).length > 0) {
    cartItemsArray = Object.values(cartItems);
  }
  const history = useHistory();

  const cartItemCount = (array) => {
    let sum = 0
    array.forEach(object => {
      sum += object.quantity
    })
    return sum
  }

  useEffect(() => {
    if (sessionUser) dispatch(getCart());
  }, [dispatch, sessionUser]);

  let sessionLinks;

  if(sessionUser) {
    sessionLinks = (
     <>
      <nav className='nav'>
        <div className='greenbar-top'> &nbsp; </div>
        <div className='header-upper'>
        <div className='header-upper-left'>
        <div className='mylinks-container'>
        <a href="https://tmalioski1.github.io/" style={{ textDecoration: 'none' }}>TYLER MALINOSKI</a>

                <ul className='linkedin-ul'>
                <a href='https://www.linkedin.com/in/tyler-malinoski/' target="_blank"><i class="fa-brands fa-linkedin"></i></a>
                </ul>
                <ul className='github-ul'>
                <a href='https://github.com/tmalioski1' target="_blank"><i class="fa-brands fa-github"></i></a>
                </ul>
        </div>
        </div>
        <div className='header-upper-right'>
            <div id='upload-book-modal-button-container'>
            <OpenModalButton
            id='upload-book-modal-button'
            buttonText='Upload'
            modalComponent={<UploadNewBook />}
            />
            </div>
            <div className= 'line'>|</div>
            <div className='log-out'>
            <LogoutButton />
            </div>
        </div>
        </div>
      <div className='header'>
      <NavLink className={'homeLink'} to='/' exact={true} activeClassName='active' >
          <div className='homelink-container'>
            <div className='homeWord'>
              <p className='word'>BARNES <span className='gold-and'>&</span> MIMIC</p>
            </div>
          </div>
        </NavLink>
        <div className='header-center'>
          <div className= 'grey-input'>
            <div className='grey-container'> &nbsp; </div>
            <div className='search-input-container'>
            <input
            type='text'
            disabled
            placeholder='Search coming soon'
            className='search-input'>
            </input>
            </div>
            </div>
            <div className='search-icon'>
            <i className="fa-solid fa-magnifying-glass"></i>
            </div>
          </div>
          <div className='header-right'>
          <div className='shopping-cart-icon'>
            <i className="fa-solid fa-cart-shopping" onClick={() => history.push(`/checkout`)}></i>
            </div>
            {sessionUser && cartItemCount && cartItemCount(cartItemsArray) !== 0 ? <span className="cart-item-count-splash">{cartItemCount(cartItemsArray)}</span> : ""}
          </div>
        </div>
        <div className="catagories-container">
        <NavLink to='/books/fiction' exact={true} activeClassName='active'>
         Fiction
        </NavLink>

        </div>
      </nav>
     </>
    )
   } else {
    sessionLinks = (
      <>
      <nav className='nav'>
        <div className='greenbar-top'> &nbsp; </div>
        <div className='header-upper'>
        <div className='header-upper-left'>
        <div className='mylinks-container'>
        <a href="https://tmalioski1.github.io/" style={{ textDecoration: 'none' }}>TYLER MALINOSKI</a>

                <ul className='linkedin-ul'>
                <a href='https://www.linkedin.com/in/tyler-malinoski/' target="_blank"><i class="fa-brands fa-linkedin"></i></a>
                </ul>
                <ul className='github-ul'>
                <a href='https://github.com/tmalioski1' target="_blank"><i class="fa-brands fa-github"></i></a>
                </ul>
        </div>
        </div>
        <div className='header-upper-right'>
            <div className='login-nav'>
              <NavLink className='login-nav' to='/login' exact={true} activeClassName='active'>
                Login
              </NavLink>
            </div>
            <div className= 'line'>|</div>
            <div className='sign-up-nav-container'>
              <NavLink className='sign-up-nav' to='/sign-up' exact={true} activeClassName='active'>
                Sign Up
              </NavLink>
            </div>
          </div>
          </div>
        <div className='header'>
          <NavLink className={'homeLink'} to='/' exact={true} activeClassName='active'>
            <div className='homelink-container'>
              <div className='homeWord'>
              <p className='word'>BARNES <span className='gold-and'>&</span> MIMIC</p>
              </div>
            </div>
          </NavLink>
          <div className='header-center'>
          <div className= 'grey-input'>
            <div className='grey-container'> &nbsp; </div>
            <div className='search-input-container'>
            <input
            type='text'
            disabled
            placeholder='Search coming soon'
            className='search-input'>
            </input>
            </div>
            </div>
            <div className='search-icon'>
            <i class="fa-solid fa-magnifying-glass"></i>
            </div>
          </div>
        </div>
        <div className="catagories-container">

        </div>
      </nav>
      </>
    )
   }

   return (
    <div>
      {loaded && sessionLinks}
    </div>
  );
}

export default NavBar;
