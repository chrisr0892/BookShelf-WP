import React from 'react';
import UserContext from '../UserContext.js';
import { useContext } from 'react';

const Profile = () => {
  const { user } = useContext(UserContext);
  return <h1>Welcome, {user ? user.name : 'Guest'}!</h1>;
};

export default Profile;
