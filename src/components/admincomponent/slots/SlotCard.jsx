import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SlotCard = ({ slot, onAction, onInactive, onEdit }) => {
  const { adminId, startTime, endTime, status, meetingUrl, notes } = slot;
  const navigate = useNavigate();

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

  // Container for the buttons
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

  // Common style for the Cancel and Edit buttons
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

  // Call the API to delete the slot
  const slotId = slot.slotId;
  const handleCancel = async () => {
    try {
      const response = await axios.delete(`https://csrm.onrender.com/api/v1/slot/delete/${slotId}`);
      if (response.data.success) {
        alert("Slot deleted successfully");
        if (onInactive) {
          onInactive(slot); // Notify parent to update the list, if needed.
        }
      } else {
        alert("Error deleting slot: " + response.data.message);
      }
    } catch (error) {
      console.error("Error deleting slot:", error);
      alert("Error deleting slot. Please try again later.");
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
      {/* Buttons for actions */}
      <div style={buttonContainerStyle}>
        <button
          style={actionButtonStyle}
          onClick={() => onAction && onAction(slot)}
        >
          {slot.state}
        </button>
        <button
          style={commonButtonStyle}
          className="bg-gray-500 hover:bg-red-500"
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button
          style={commonButtonStyle}
          className="bg-gray-500 hover:bg-yellow-500"
          onClick={handleEdit}
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default SlotCard;
