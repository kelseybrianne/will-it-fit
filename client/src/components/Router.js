import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Header';
import DiscoverFeed from '../pages/DiscoverFeed';
import Closet from '../pages/Closet';

const BrowserRouter = ({ windowSize }) => {
  return (
    <Router>
      <>
        <Header />
        <Routes>
          <Route path="/" element={<DiscoverFeed />} />
          <Route path="/closet" element={<Closet windowSize={windowSize} />} />
        </Routes>
      </>
    </Router>
  );
};

export default BrowserRouter;
