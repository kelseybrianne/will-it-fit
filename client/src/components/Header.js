
import { Link } from 'react-router-dom';

import React from 'react';
import './Header.css';
import LogInDialog from './LogIn';
import LogOut from './LogOut';

import Auth from '../utils/auth';
import { useQuery } from '@apollo/client';
import { GET_ME } from '../utils/queries';

const Header = () => {
  const { loading, data } = useQuery(GET_ME);

  const userData = data?.me || {};

  return (
    <header>
      <Link to="/">
        <p>nav</p>
      </Link>

      <Link to={`/closet/${userData.username}`}>
        <h1>Will It Fit?</h1>
      </Link>

      {Auth.loggedIn() ? <LogOut /> : <LogInDialog />}
    </header>
  );
};

export default Header;
