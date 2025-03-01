import React, { useState } from 'react';
import axios from 'axios';

const Slotmanagement = () => {
  const adminId = '1740623442301'; // Hardcoded admin ID for now
  const [formData, setFormData] = useState({
    adminId: adminId,
    startTime: '',
    endTime: '',
    status: 'scheduled',
    meetingUrl: '',
    notes: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Updated handleSubmit using Axios
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);

    // Basic validation
    if (!formData.adminId || !formData.startTime || !formData.endTime) {
      setError('adminId, startTime, and endTime are required.');
      return;
    }

    setError('');
    setSuccess('');

    try {
      // Make the POST request using Axios
      const response = await axios.post(
        'http://localhost:8000/api/v1/slot/add',
        formData,
        {
          headers: { 'Content-Type': 'application/json' }
        }
      );

      // If successful
      if (response.status === 200 || response.status === 201) {
        setSuccess('Session created successfully.');
        // Reset form fields
        setFormData({
          adminId: adminId,  // or '' if you want to clear it
          startTime: '',
          endTime: '',
          status: 'scheduled',
          meetingUrl: '',
          notes: ''
        });
      } else {
        // Handle non-2xx status codes
        setError(response.data?.message || 'Failed to create session.');
      }
    } catch (err) {
      console.error('API error:', err);
      setError(err.response?.data?.message || 'Internal error. Please try again later.');
    }
  };

  // Styles...
  const containerStyle = {
    height: '100vh',
    margin: 0,
    padding: '2rem',
    background: 'radial-gradient(circle at center, #0B0F2A 0%, #0D1B2A 100%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#ffffff',
    fontFamily: 'Arial, sans-serif',
    boxSizing: 'border-box',
  };

  const titleStyle = {
    marginBottom: '2rem',
    fontSize: '1.8rem',
    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
    textAlign: 'center'
  };

  const formWrapperStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(5px)',
    padding: '2rem',
    borderRadius: '8px',
    maxWidth: '400px',
    width: '100%',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '0.5rem',
    fontWeight: 'bold',
  };

  const inputStyle = {
    width: '100%',
    padding: '0.5rem',
    marginBottom: '1rem',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '1rem',
    backgroundColor: '#fff',
    color: '#000'
  };

  const selectStyle = {
    ...inputStyle
  };

  const textAreaStyle = {
    ...inputStyle,
    height: '80px'
  };

  const buttonStyle = {
    backgroundColor: '#1E90FF',
    color: '#fff',
    padding: '0.75rem 1.5rem',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem'
  };

  const errorStyle = {
    color: 'red',
    marginBottom: '1rem'
  };

  const successStyle = {
    color: 'limegreen',
    marginBottom: '1rem'
  };

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>Create One-to-One Session</h2>

      <div style={formWrapperStyle}>
        {error && <p style={errorStyle}>{error}</p>}
        {success && <p style={successStyle}>{success}</p>}

        <form onSubmit={handleSubmit}>

          {/* Admin ID is already set in state. You can show it or hide it as needed. */}
          {/* <label htmlFor="adminId" style={labelStyle}>Admin ID</label>
          <input
            id="adminId"
            name="adminId"
            type="text"
            style={inputStyle}
            value={formData.adminId}
            onChange={handleChange}
            disabled
          /> */}

          <label htmlFor="startTime" style={labelStyle}>Start Time</label>
          <input
            id="startTime"
            name="startTime"
            type="datetime-local"
            style={inputStyle}
            value={formData.startTime}
            onChange={handleChange}
            required
          />

          <label htmlFor="endTime" style={labelStyle}>End Time</label>
          <input
            id="endTime"
            name="endTime"
            type="datetime-local"
            style={inputStyle}
            value={formData.endTime}
            onChange={handleChange}
            required
          />

          <label htmlFor="status" style={labelStyle}>Status</label>
          <select
            id="status"
            name="status"
            style={selectStyle}
            value={formData.status}
            onChange={handleChange}
          >
            <option value="scheduled">Scheduled</option>
            <option value="ongoing">Ongoing</option>
            <option value="completed">Completed</option>
          </select>

          <label htmlFor="meetingUrl" style={labelStyle}>Meeting URL</label>
          <input
            id="meetingUrl"
            name="meetingUrl"
            type="url"
            style={inputStyle}
            placeholder="https://example.com/meeting"
            value={formData.meetingUrl}
            onChange={handleChange}
          />

          <label htmlFor="notes" style={labelStyle}>Notes</label>
          <textarea
            id="notes"
            name="notes"
            style={textAreaStyle}
            placeholder="Additional notes..."
            value={formData.notes}
            onChange={handleChange}
          />

          <button type="submit" style={buttonStyle}>
            Create Session
          </button>
        </form>
      </div>
    </div>
  );
};

export default Slotmanagement;
