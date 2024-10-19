import React from 'react';

// Seat component receives the 'isBooked' prop to determine if the seat is booked
const Seat = ({ isBooked }) => {
    return (
        <span
            className={`seat ${isBooked ? 'booked' : 'available'}`} // Apply CSS classes based on seat status
        >
           {isBooked ? 'B' : 'A'}                                 
        </span>
    );
};

export default Seat; // Export the Seat component for use in other parts of the application
