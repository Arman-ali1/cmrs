import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

// Helper function to format date for datetime-local input
const formatDateForInput = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  const pad = (num) => num.toString().padStart(2, '0');
  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

const SlotEdit = ({ onSave, onCancel }) => {
  // Retrieve the slot from the location state
  const location = useLocation();
  const { slot } = location.state || {};
  console.log("Slot", slot);
  
  const navigate = useNavigate();

  // If no slot is provided, display a fallback UI
  if (!slot) {
    return <div>No slot data available.</div>;
  }

  const { startTime, endTime, notes } = slot;

  // Local state for the edited values, formatted for the datetime-local input
  const [editedStartTime, setEditedStartTime] = useState(formatDateForInput(startTime));
  const [editedEndTime, setEditedEndTime] = useState(formatDateForInput(endTime));
  const [editedNotes, setEditedNotes] = useState(notes || '');

  // Handle form submission and call the API
  const handleSave = async (e) => {
    e.preventDefault();
    const payload = {
      ...slot,
      startTime: editedStartTime,
      endTime: editedEndTime,
      notes: editedNotes,
    };
    const slotId = slot.slotId;
    console.log("Payload", payload);
    console.log("Slot ID", slotId);
    
    
    try {
      const response = await axios.patch(`http://localhost:8000/api/v1/slot/edit/${slotId}`, payload);
      if(response.data.success){
        // Optionally call onSave callback if provided, then navigate back
        if(onSave) {
          onSave(response.data.updatedSlot || payload);
        }
        navigate('/dashboard/slot-management');
      } else {
        alert("Error updating slot: " + response.data.message);
      }
    } catch (error) {
      console.error("Error updating slot", error);
      alert("Error updating slot. Please try again later.");
    }
  };

  // Navigate back if cancel is clicked
  const handleCancel = () => {
    if(onCancel) {
      onCancel();
    } else {
      navigate('/dashboard/slot-management');
    }
  };

  // Inline styles for a dark-themed form
  const containerStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(5px)',
    borderRadius: '8px',
    padding: '1rem',
    width: '300px',
    color: '#fff',
    margin: '1rem auto',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
  };

  const labelStyle = {
    display: 'block',
    fontWeight: 'bold',
    marginBottom: '0.5rem',
  };

  // Updated input style with text color set to black
  const inputStyle = {
    width: '100%',
    padding: '0.5rem',
    marginBottom: '1rem',
    borderRadius: '4px',
    border: '1px solid #ccc',
    boxSizing: 'border-box',
    color: '#000',
  };

  const buttonStyle = {
    backgroundColor: '#1E90FF',
    color: '#fff',
    padding: '0.5rem 1rem',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginRight: '1rem',
  };

  const cancelButtonStyle = {
    backgroundColor: 'gray',
    color: '#fff',
    padding: '0.5rem 1rem',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  };

  return (
    <form  style={containerStyle}>
      <h1>Slot Edit</h1>
      <div>
        <label style={labelStyle} htmlFor="startTime">
          Start Time
        </label>
        <input
          type="datetime-local"
          id="startTime"
          name="startTime"
          style={inputStyle}
          value={editedStartTime}
          onChange={(e) => setEditedStartTime(e.target.value)}
        />
      </div>
      <div>
        <label style={labelStyle} htmlFor="endTime">
          End Time
        </label>
        <input
          type="datetime-local"
          id="endTime"
          name="endTime"
          style={inputStyle}
          value={editedEndTime}
          onChange={(e) => setEditedEndTime(e.target.value)}
        />
      </div>
      <div>
        <label style={labelStyle} htmlFor="notes">
          Notes
        </label>
        <textarea
          id="notes"
          name="notes"
          style={inputStyle}
          value={editedNotes}
          onChange={(e) => setEditedNotes(e.target.value)}
        ></textarea>
      </div>
      <div>
        <button  style={buttonStyle}  onClick={handleSave}>
          Save
        </button>
        <button type="button" onClick={handleCancel} style={cancelButtonStyle}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default SlotEdit;
