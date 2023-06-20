import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/session';
import { useHistory, useLocation } from 'react-router-dom';


const LogoutButton = () => {
  const dispatch = useDispatch()
  const history = useHistory();
  const location = useLocation();
  const sessionUser = useSelector(state => state.session.user);
  const isCheckoutPage = location.pathname === '/checkout';
  const isThankYouPage = location.pathname === '/thank-you';

  const onLogout = async (e) => {
    await dispatch(logout());

    if (sessionUser && isCheckoutPage || sessionUser && isThankYouPage) {
      history.push('/');
    }
  };

  return <button className='log-out-button' onClick={onLogout}>Sign Out</button>;
};

export default LogoutButton;
