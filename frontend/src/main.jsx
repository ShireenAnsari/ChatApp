import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter } from 'react-router-dom';
import Authcontext from './context/Authcontext'; // Import the Authcontext provider

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Authcontext>
        <Toaster />
        <App />
      </Authcontext>
    </BrowserRouter>
  </React.StrictMode>
);
