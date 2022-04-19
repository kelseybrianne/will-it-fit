
import { Link } from 'react-router-dom';

import React from 'react';
import './Header.css';
import LogInDialog from './LogIn';
import ProfileMenu from './ProfileMenu';

import Auth from '../utils/auth';

const Header = () => {
  return (
    <header>
      <Link to="/">
        <p>nav</p>
      </Link>

      <Link to="/">
        <h1>Will It Fit?</h1>
      </Link>

      {Auth.loggedIn() ? <ProfileMenu /> : <LogInDialog />}
    </header>
  );
};

export default Header;
