
import { Link, useLocation } from 'react-router-dom';
import React from 'react';
import './Header.css';

const Header = () => {

  const location = useLocation(); 
  const pathname = location.pathname;

  return (
    <header>
      <Link to="/">
        <p>nav</p>
      </Link>
      
      {pathname === '/closet' ? (
        ''
      ) : (
        <Link to="/"><h1>Will It Fit</h1></Link>
      )}
      <Link to="/closet">
        <p>closet</p>
      </Link>
    </header>
  );
};

export default Header;
