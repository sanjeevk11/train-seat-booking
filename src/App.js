import React from 'react';
import SeatBooking from './components/SeatBooking'; // Import the SeatBooking component
import './styles.css'; // Import CSS styles

const App = () => {
    return (
        <div className="app">
            <SeatBooking /> {/* Render the SeatBooking component */}
        </div>
    );
};

export default App; // Export the App component for rendering in the index file
