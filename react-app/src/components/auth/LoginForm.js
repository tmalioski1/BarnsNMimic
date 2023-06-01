import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import './loginform.css'



const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory()

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const demoLogin = () => {
    setEmail('demo@aa.io')
    setPassword('password')
    return dispatch(login(email, password));
  }


  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <>
      <div className='gold-bar'> &nbsp; </div>
    <div className='greenbar-top'> &nbsp; </div>
    <div className='log-in-page-container'>
    <h1 className='sign-in-form-header'>Sign in or Create an Account</h1>
    <form className='log-in-form-container' onSubmit={onLogin}>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div className='email-container'>
        <input
          name='email'
          type='text'
          placeholder='Email Address'
          value={email}
          onChange={updateEmail}
        />
      </div>
      <div className='password-container'>
        <input
          name='password'
          type='password'
          placeholder='Password'
          value={password}
          onChange={updatePassword}
        />
        </div>
        <button id='user-login' type='submit'>Login</button>
        <button id='demo-user-login' onClick={demoLogin} type='submit'>Demo User</button>
        <button id='create-an-account-link' onClick={() => history.push(`/sign-up`)} type='submit'>Create An Account</button>
    </form>
    </div>
    </>
  );

};

export default LoginForm;
