import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { LoginSignUp } from './Components/LoginSignUp.jsx';
import Profile from './Components/Profile.jsx';
import UserContext from './UserContext.js';
import { useState } from 'react';

export const App = () => {
  const [user, setUser] = useState({ name: '', email: '', password: '' });
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Router>
        <Routes>
          <Route path='/login' element={<LoginSignUp />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='*' element={<LoginSignUp />} />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
};
