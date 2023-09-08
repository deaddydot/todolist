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

const userId = new URLSearchParams(window.location.search).get("user_id");

export default function RouterPage() {
  useEffect(() => {
    Cookies.set('userId', userId, { expires: 7 });
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