import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { App } from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Auth0Provider } from "@auth0/auth0-react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(  
  <div style={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
    <React.StrictMode>
      <Auth0Provider
        domain="dev-yjpxjgkbim0ygj8c.us.auth0.com"
        clientId="ixHfvzExgH69wz7sfTToWwvoH9xATg4t"
        authorizationParams={{
          redirect_uri: window.location.origin
        }}
      >
        <App />
      </Auth0Provider>
    </React.StrictMode>
  </div>
);