import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Import the main App component

const root = ReactDOM.createRoot(document.getElementById('root')); // Get the root element from HTML
root.render(
    <React.StrictMode>
        <App /> {/* Render the App component */}
    </React.StrictMode>
);
