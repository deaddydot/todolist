import React, { useState, useEffect } from 'react';
import './UserClock.css'

function UserClock({ nightMode }) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerID = setInterval(() => {
      setTime(new Date());
    }, 1000); // Update every second

    return () => clearInterval(timerID); // Cleanup on component unmount
  }, []);

  const clockClass = `digital-clock ${nightMode ? 'dark-mode' : ''}`;

  return (
    <div className={clockClass}>
      {time.toLocaleTimeString()}
    </div>
  );
}

export default UserClock;
