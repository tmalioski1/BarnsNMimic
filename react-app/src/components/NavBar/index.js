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
        <div className='greenbar-top'> &nbsp; </div>
        <div className='header-upper'>
        <div className='header-upper-left'>
        <div className='mylinks-container'>
              <p>TYLER MALINOSKI</p>
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
            <i class="fa-solid fa-magnifying-glass"></i>
            </div>
          </div>
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
              <p>TYLER MALINOSKI</p>
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
