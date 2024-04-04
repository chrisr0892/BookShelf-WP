import React, { useContext, useEffect, useState } from 'react';
import UserContext from '../UserContext';
import './Profile.scss';

const Profile = () => {
  const { user } = useContext(UserContext);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await fetch(`/users/${user._id}`);
      const data = await response.json();
      setUserData(data);
      console.log(data);
    };

    if (user) {
      fetchUserData();
    }
  }, [user]);

  const deleteHandler = async (event) => {
    event.preventDefault();
    const response = await fetch('/patch', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Welcome, {user.name}!</h1>
      <div>
        <h4>Account Information</h4>
        <p>Email: {user.email}</p>
        <p>Password: {user.password}</p>
        <p>User ID: {user._id}</p>
      </div>
      <div className='button-container'>
        <button>Change Password</button>
        <button onClick={deleteHandler}>Delete Account</button>
      </div>
      {/* Display other user data here */}
    </div>
  );
};

export default Profile;
