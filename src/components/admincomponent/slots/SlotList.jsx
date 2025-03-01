import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SlotCard from './SlotCard';
import { useNavigate } from 'react-router-dom';

const SlotList = () => {
  const navigate = useNavigate();
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch slots from API on component mount
  useEffect(() => {
    const fetchSlots = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:8000/api/v1/slot/all');
        console.log('API response:', response.data.sessions);
        
        // Try to extract slots array from the response.
        // Adjust according to your API response structure.
        let fetchedSlots = [];
        if (response.data.sessions) {
          // If the API sends an object with a "slots" key
          fetchedSlots = response.data.sessions;
        } else if (Array.isArray(response.data.sessions)) {
          // If the API sends an array directly
          fetchedSlots = response.data.sessions;
        } else {
          // If the response isn't an array, wrap it in an array (or handle accordingly)
          fetchedSlots = [response.data.sessions];
        }
        
        setSlots(fetchedSlots);
      } catch (err) {
        console.error('Error fetching slots:', err);
        setError('Failed to load slots. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchSlots();
  }, []);

  // Handler to navigate to the "add slot" page
  const addSlotHandler = () => {
    navigate('/dashboard/add-slot');
  };

  return (
    <div style={{ padding: '2rem' }}>
      {/* Add Slot button */}
      <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
        <button
          onClick={addSlotHandler}
          style={{
            backgroundColor: '#1E90FF',
            color: '#fff',
            padding: '0.75rem 1.5rem',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '1rem'
          }}
        >
          Add new Slot
        </button>
      </div>

      {loading && <p style={{ textAlign: 'center' }}>Loading slots...</p>}
      {error && <p style={{ textAlign: 'center', color: 'red' }}>{error}</p>}

      {/* Fallback message when no slots are available */}
      {!loading && !error && slots.length === 0 && (
        <p style={{ textAlign: 'center' }}>No slots available.</p>
      )}

      {/* Render list of slot cards */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {slots.map((slot, index) => (
          <SlotCard key={index} slot={slot} />
        ))}
      </div>
    </div>
  );
};

export default SlotList;
