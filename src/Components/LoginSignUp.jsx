import React from 'react';
import './LoginSignup.scss';
import { useState } from 'react';

export const LoginSignUp = () => {
  const [action, setAction] = useState('Sign Up');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUpSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch('/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await response.json();
    console.log(data);
  };
  const handleLoginSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await response.json();

    if (response.ok) {
      // If the login was successful, do something here
      console.log(data);
    } else {
      // Handle login failure
      console.error(data);
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
            <input type='text' value={name} onChange={(e) => setName(e.target.value)}></input>
          </div>
        )}

        <div className='input'>
          <span>Email</span>
          <input type='email' value={email} onChange={(e) => setEmail(e.target.value)}></input>
        </div>
        <div className='input'>
          <span>Password</span>
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}></input>
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
