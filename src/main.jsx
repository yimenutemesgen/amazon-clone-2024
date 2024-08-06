



// src/index.js
import "./index.css"
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { StateProvider } from './StateProvider';  // Import StateProvider
import reducer, { initialState } from './reducer'; // Import reducer and initialState

// Wrap the App component with StateProvider
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <StateProvider initialState={initialState} reducer={reducer}>
      <App />
    </StateProvider>
  </React.StrictMode>,
);
