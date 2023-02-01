import React from 'react';
import { NavLink } from 'react-router-dom';
import {useSelector} from 'react-redux'
import OpenModalButton from '../OpenModalButton'
import LogoutButton from '../auth/LogoutButton';
import UploadNewBook from '../UploadBookModal'

import './navbar.css'

const NavBar = ({loaded}) => {
  const sessionUser = useSelector(state => state.session.user);
  let sessionLinks;

  if(sessionUser) {
    sessionLinks = (
     <>
      <nav className='nav'>
        <div className='greenbar-top'>c</div>
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
            <div className='grey-container'>t</div>
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
        <div className='gold-bar'>c</div>
        <div className='greenbar-top'>c</div>
      </nav>
     </>
    )
   } else {
    sessionLinks = (
      <>
      <nav className='nav'>
        <div className='greenbar-top'>c</div>
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
            <div className='grey-container'>t</div>
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
        <div className='gold-bar'>c</div>
        <div className='greenbar-top'>c</div>
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
