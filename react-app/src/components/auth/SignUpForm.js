import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, NavLink } from 'react-router-dom';
import { signUp } from '../../store/session';
import { getCart } from '../../store/carts';
import './signupform.css'

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(first_name, last_name, username, email, password));
      if (data) {
        setErrors(data)
      }
    } else {
      setErrors(['Passwords must match.'])
    }
  };

  const updateFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const updateLastName = (e) => {
    setLastName(e.target.value);
  };


  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };


  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <>
    <div className='gold-bar'> &nbsp; </div>
    <div className='greenbar-top'> &nbsp; </div>
    <div className='sign-up-form-container'>
    <h1 className='sign-up-form-header'>Create an Account</h1>
    <p className='sign-up-form-first-sentence'>Fill in the fields below to create a Barnes & Mimic.com account.</p>
    <p className='sign-up-form-second-sentence'>If you already have an account, please  <NavLink
      to={`/login`}>
     <a className= 'create-an-account-signin-link'>Sign In</a>
    </NavLink> </p>
    <form className='log-in-form-container' onSubmit={onSignUp}>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div id='first-name-signup'>
        <input
          type='text'
          name='First Name'
          required
          placeholder='First Name'
          onChange={updateFirstName}
          id='first-name-input-field-login'
          value={first_name}
        ></input>
      </div>
      <div id='last-name-signup'>
        <input
          type='text'
          name='Last Name'
          required
          placeholder='Last Name'
          onChange={updateLastName}
          id='last-name-input-field-login'
          value={last_name}
        ></input>
      </div>
      <div id='user-name-signup'>
        <input
          type='text'
          minlength='1'
          maxLength='20'
          name='username'
          required
          placeholder='User Name'
          onChange={updateUsername}
          value={username}
        ></input>
      </div>
      <div id='email-signup'>
        <input
          type='text'
          name='email'
          required
          placeholder='Email'
          onChange={updateEmail}
          value={email}
        ></input>
      </div>
      <div id='password-signup'>
        <input
          type='password'
          name='password'
          placeholder='Password'
          onChange={updatePassword}
          value={password}
          required={true}
        ></input>
      </div>
      <div id='repeat-password-signup'>
        <input
          type='password'
          name='repeat_password'
          placeholder='Repeat Password'
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
        ></input>
      </div>
      <div className='create-account-button-cancel-link'>
      <button id='create-account-submit-button' type='submit'>Create Account</button>
      <NavLink
      to={`/`}>
     <a className= 'create-an-account-cancel-link'>Cancel</a>
    </NavLink>
      </div>
    </form>
    </div>
    </>
  );
};

export default SignUpForm;
