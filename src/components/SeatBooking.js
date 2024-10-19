import React, { useState } from 'react';
import Seat from './Seat'; // Import Seat component

// Constants for the coach layout
const rows = 11; // Number of rows with 7 seats each
const lastRowSeats = 3; // Last row with only 3 seats

// Function to initialize the coach with available and booked seats
const initializeCoach = () => {
    // Create a 2D array to represent the seats in the coach
    let coach = Array.from({ length: rows }, () => Array(7).fill(false));
    coach.push(Array(lastRowSeats).fill(false)); // Add the last row with 3 seats

    // Example of already booked seats for demonstration purposes
    coach[0][2] = true; // Booked seat in Row 1, Seat 3
    coach[5][1] = true; // Booked seat in Row 6, Seat 2

    return coach; // Return the initialized coach layout
};

const SeatBooking = () => {
    const [numSeats, setNumSeats] = useState(1); // State to hold the number of seats to book
    const [coach, setCoach] = useState(initializeCoach()); // State to hold the current coach layout

    // Function to book seats based on the number requested
    const bookSeats = (numSeats) => {
        // Validate the number of seats requested
        if (numSeats < 1 || numSeats > 7) {
            alert("You can only book 1 to 7 seats at a time.");
            return false; // Exit if invalid number
        }

        // Try to book seats in one row first
        for (let i = 0; i < coach.length; i++) {
            let availableCount = 0; // Counter for available seats
            let startIndex = -1; // Index where the available seats start

            for (let j = 0; j < coach[i].length; j++) {
                if (!coach[i][j]) { // Check if the seat is available
                    if (availableCount === 0) startIndex = j; // Set start index for the first available seat
                    availableCount++; // Increment available seat counter
                    // If enough seats are found, book them
                    if (availableCount === numSeats) {
                        const updatedCoach = [...coach]; // Copy the current coach layout
                        for (let k = 0; k < numSeats; k++) {
                            updatedCoach[i][startIndex + k] = true; // Mark seats as booked
                        }
                        setCoach(updatedCoach); // Update state with new coach layout
                        alert(`Booked ${numSeats} seats in Row ${i + 1}`); // Notify user
                        return true; // Booking successful
                    }
                } else {
                    availableCount = 0; // Reset count if a seat is booked
                }
            }
        }

        // If no suitable seats found in one row, try to book nearby seats
        let bookedSeats = []; // Array to keep track of nearby available seats
        for (let i = 0; i < coach.length; i++) {
            for (let j = 0; j < coach[i].length; j++) {
                if (!coach[i][j]) { // Check if seat is available
                    bookedSeats.push([i, j]); // Add seat position to bookedSeats array
                    if (bookedSeats.length === numSeats) { // Check if we have enough nearby seats
                        const updatedCoach = [...coach]; // Copy the current coach layout
                        bookedSeats.forEach(([row, seat]) => {
                            updatedCoach[row][seat] = true; // Mark each seat as booked
                        });
                        setCoach(updatedCoach); // Update state with new coach layout
                        alert(`Booked ${numSeats} nearby seats.`); // Notify user
                        return true; // Booking successful
                    }
                } else {
                    bookedSeats = []; // Reset if a seat is booked
                }
            }
        }

        // Notify user if not enough available seats found
        alert("Not enough available seats.");
        return false; // Booking failed
    };

    // Function to handle the booking process when the user clicks the button
    const handleBooking = () => {
        bookSeats(numSeats); // Call the booking function
    };

    return (
        <div className="seat-booking">
            <h1>Train Seat Booking</h1>
            {/* Input to select the number of seats to book */}
            <input
                type="number"
                min="1"
                max="7"
                value={numSeats}
                onChange={(e) => setNumSeats(Number(e.target.value))} // Update state on input change
                className="seat-input"
            />
            <button onClick={handleBooking} className="book-button">Book Seats</button>
            {/* Display the seats in the coach */}
            <div className="seats-container">
                {coach.map((row, rowIndex) => (
                    <div key={rowIndex} className="seat-row">
                        {row.map((seat, seatIndex) => (
                            <Seat key={seatIndex} isBooked={seat} /> // Render each seat
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SeatBooking; // Export the SeatBooking component for use in the main App
