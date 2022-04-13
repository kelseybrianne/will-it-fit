import { Link } from 'react-router-dom';
import React from 'react';
import './Header.css';

const header = () => {
  return (
    <header>
      <Link to="/">
        <p>nav</p>
      </Link>
      <Link to="/">
        {/* <h1>Will It Fit</h1> */}
      </Link>
      <Link to="/feed">
        <p>username</p>
      </Link>
    </header>
  );
};

export default header;
