import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { App } from './App';
import Cookies from 'js-cookie';

// These could be different components for your different pages
const Title = () => (
  <div>
    <h1>Tasktastic</h1>
    <nav>
      <Link to="/app">Test Environment</Link>
    </nav>
  </div>
);

export default function RouterPage() {
  useEffect(() => {
    Cookies.set('userId', '0', { expires: 7 });
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Title />} />
        <Route path="/app" element={<App />} />
      </Routes>
    </Router>
  );
}