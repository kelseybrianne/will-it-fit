
import { Link } from 'react-router-dom';

import React from 'react';
import './Header.css';
import LogInDialog from './LogIn';
import ProfileMenu from './ProfileMenu';

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

      <Link to={"/"}>
        <h1>Will It Fit?</h1>
      </Link>

      {Auth.loggedIn() ? <ProfileMenu /> : <LogInDialog />}
    </header>
  );
};

export default Header;
