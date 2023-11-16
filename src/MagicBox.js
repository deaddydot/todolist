// MagicBox.js
import React, { useState } from 'react';
import axios from 'axios';

export default function MagicBox({ flaskUrl, userId }) {
  const [magicText, setMagicText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${flaskUrl}/magic-box/${userId}`, {
        magic_box_text: magicText,
      });

      // Here, the response could be the data of the newly created task.
      // You can handle it as you need. 
      console.log(response.data);
    } catch (error) {
      console.error('Error creating task from magic box:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Magicbox" 
          value={magicText}
          onChange={(e) => setMagicText(e.target.value)}
        />
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
}
