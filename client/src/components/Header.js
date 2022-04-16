
import { Link } from 'react-router-dom';

import React from 'react';
import './Header.css';

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

      {Auth.loggedIn() ? (
        <Link to="/logout">log out</Link>
      ) : (
        <Link to="/login">log in</Link>
      )}
    </header>
  );
};

export default Header;
