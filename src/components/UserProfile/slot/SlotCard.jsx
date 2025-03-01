import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SlotCard = ({ slot, onAction, onInactive, onEdit }) => {
  const { adminId, startTime, endTime, state, meetingUrl, notes } = slot;
  const navigate = useNavigate();
  
  // Local state to track if the session is booked
  const [booked, setBooked] = useState(false);

  // Helper function to format ISO-like date strings into a readable date/time
  const formatDateTime = (isoString) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    return date.toLocaleString(undefined, {
      dateStyle: 'medium',
      timeStyle: 'short',
    });
  };

  const cardStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(5px)',
    borderRadius: '8px',
    padding: '1rem',
    minWidth: '300px',
    maxWidth: '300px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
    color: '#fff',
    margin: '1rem',
  };

  const labelStyle = { fontWeight: 'bold' };
  const itemStyle = { marginBottom: '0.5rem' };

  // Container for the buttons or status label
  const buttonContainerStyle = {
    display: 'flex',
    gap: '1rem',
    marginTop: '0.5rem',
  };

  // Style for the Active button remains inline
  const actionButtonStyle = {
    backgroundColor: 'green',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    padding: '0.5rem 1rem',
    cursor: 'pointer',
  };

  // Common style for other buttons
  const commonButtonStyle = {
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    padding: '0.5rem 1rem',
    cursor: 'pointer',
  };

  // Navigate to the edit slot page with the current slot data
  const handleEdit = () => {
    navigate("/dashboard/edit-slot", { state: { slot } });
  };

  // Call the API to book the slot and update the local state on success
  const slotId = slot.slotId;
  const handleBook = async () => {
    // Replace with your actual user ID logic (e.g., from context or localStorage)
    const userId = "user123";
    try {
      const response = await axios.patch(`https://csrm.onrender.com/api/v1/slot/book/${slotId}/${userId}`);
      if (response.data.success) {
        alert("Slot booked successfully!");
        setBooked(true);
      } else {
        alert("Error booking slot: " + response.data.message);
      }
    } catch (error) {
      console.error("Error booking slot", error);
      alert("Error booking slot. Please try again later.");
    }
  };

  return (
    <div style={cardStyle}>
      <div style={itemStyle}>
        <span style={labelStyle}>Start Time:</span> {formatDateTime(startTime)}
      </div>
      <div style={itemStyle}>
        <span style={labelStyle}>End Time:</span> {formatDateTime(endTime)}
      </div>
      <div style={itemStyle}>
        <span style={labelStyle}>Status:</span> {status}
      </div>
      {notes && (
        <div style={itemStyle}>
          <span style={labelStyle}>Notes:</span> {notes}
        </div>
      )}
      {/* Buttons for actions or a booked status message */}
      <div style={buttonContainerStyle}>
        {!booked ? (
          <>
            <button
              style={actionButtonStyle}
              onClick={() => onAction && onAction(slot)}
            >
              {state}
            </button>
            {slot.state!=="booked"?<button
              style={commonButtonStyle}
              className="bg-gray-500 hover:bg-blue-500"
              onClick={handleBook}
            >
              Book
            </button>:null}
          </>
        ) : (
          <span>Booked</span>
        )}
        
      </div>
    </div>
  );
};

export default SlotCard;
