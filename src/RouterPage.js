import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { App } from './App';
import LoginButton from './authentication/LoginButton';

// These could be different components for your different pages
const Title = () => (
  <div>
    <h1>Tasktastic</h1>
    <LoginButton />
  </div>
);

function RouterPage() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Title />} />
        <Route path="/app" element={<App />} />
      </Routes>
    </Router>
  );
}

export default RouterPage;
