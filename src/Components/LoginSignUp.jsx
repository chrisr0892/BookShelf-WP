import React from 'react';
import './LoginSignup.scss';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../UserContext.js';
import { useContext } from 'react';

export const LoginSignUp = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [action, setAction] = useState('Sign Up');

  const handleSignUpSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch('/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    const data = await response.json();
    if (data.message === 'User created') {
      // If the sign-up was successful, redirect to the profile page
      navigate('/profile');
    }
  };
  const handleLoginSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    const data = await response.json();

    if (data.message === 'User found') {
      // If the login was successful, redirect to the profile page
      navigate('/profile');
    } else {
      // If the user was not found, redirect to the root page
      navigate('/login');
    }
  };

  return (
    <form
      className='container'
      onSubmit={action === 'Login' ? handleLoginSubmit : handleSignUpSubmit}>
      <div className='header'>
        <div className='text'>{action}</div>
        <div className='underline'></div>
      </div>
      <div className='inputs'>
        {action === 'Login' ? (
          <div></div>
        ) : (
          <div className='input'>
            <span>Name</span>
            <input
              type='text'
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}></input>
          </div>
        )}

        <div className='input'>
          <span>Email</span>
          <input
            type='email'
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}></input>
        </div>
        <div className='input'>
          <span>Password</span>
          <input
            type='password'
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}></input>
        </div>
        <div className='submit-container'>
          <button type='submit' className={action === 'Login' ? 'submit gray' : 'submit'}>
            Sign Up
          </button>
          <button
            type='submit'
            className={action === 'Sign Up' ? 'submit gray' : 'submit'}
            onClick={() => {
              setAction('Login');
            }}>
            Login
          </button>
        </div>
      </div>
    </form>
  );
};
