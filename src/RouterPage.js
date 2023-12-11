import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom'; // Added useLocation
import { App } from './App';
import Cookies from 'js-cookie';
import LoginButton from './authentication/LoginButton';

// These could be different components for your different pages
const Title = () => (
  <div>
    <h1>Tasktastic</h1>
    <nav>
      <Link to="/app">Test Environment</Link>
      <LoginButton />
    </nav>
  </div>
);

export default function RouterPage() {
  useEffect(() => {
    // Fetch the userId from the Flask backend
    fetch('http://localhost:5000/callback', {
      method: 'GET',
      credentials: 'include',  // Important for sending cookies across origins
    })
    .then(response => response.json())
    .then(data => {
      // Assuming the userId is returned in the data object
      const userId = data.userId;
      Cookies.set('userId', userId, { expires: 7 });
    })
    .catch((error) => console.error('Error:', error));
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Title />} />
        <Route path="/app"
          element={
          Cookies.get('userId') === '0' ? (
      // Treat as unauthenticated
          (() => {
          console.log("Redirecting to /");
          return <Navigate to="/" replace={true} />; // Redirect to "/"
           })()
          ) : (
      // Render the App component when authenticated
          <App />
    )
  }
/>
        <Route path="/login" element={<LoginButton isAuthenticated={Cookies.get('userId') === '0'} />} />
      </Routes>
    </Router>
  );
}

function Logout() {
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('cleared') === 'true') {
      // Clear the session on the React side
      Cookies.remove('userId');
    }
  }, [location]);
}