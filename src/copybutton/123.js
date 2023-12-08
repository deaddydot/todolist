import React from 'react';
import Button from 'react-bootstrap/Button';

const CopyButton = ({ taskData }) => {
    const buttonStyle = {
      backgroundColor: '#007BFF',
      color: '#FFFFFF',
      padding: '10px 15px',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      marginRight: '10px', // Adjust spacing as needed
      right: '100px'
    };

    const handleClick = () => {
      // Manually parse the deadline string
      const parseDate = (dateStr) => {
        // Updated regular expression to match "Fri, 20 Oct 12:42pm"
        const parts = dateStr.match(/(\d{1,2})\s([A-Za-z]+)\s(\d{1,2}):(\d{2})([ap]m)/);
        if (!parts) return null;
    
        const [, day, month, hour, minute, ampm] = parts;
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const monthIndex = monthNames.findIndex(m => m.toLowerCase() === month.toLowerCase());
        const year = new Date().getFullYear(); // Assuming the current year
    
        let hourInt = parseInt(hour, 10);
        if (ampm.toLowerCase() === 'pm' && hourInt < 12) {
          hourInt += 12;
        } else if (ampm.toLowerCase() === 'am' && hourInt === 12) {
          hourInt = 0;
        }
    
        return new Date(year, monthIndex, day, hourInt, minute);
      };
    
      const deadlineDate = parseDate(taskData.deadline);
      if (!deadlineDate) {
        alert('Invalid date format');
        return;
      }
    
      const formattedDeadline = deadlineDate.toLocaleDateString('en-US', {
        month: 'long', 
        day: 'numeric', 
        hour: 'numeric', 
        minute: 'numeric', 
        hour12: true
      });
    
      const formattedData = `${taskData.title}\n${formattedDeadline}`;
      navigator.clipboard.writeText(formattedData)
        .then(() => {
          alert('Task information copied to the clipboard!');
        })
        .catch(err => {
          console.error('Copy failed: ', err);
          alert('Copy failed. Please try again.');
        });
    };
    

    return (
      <Button onClick={handleClick} style={{backgroundColor: 'lightgrey', color: 'black', border: 'none', height: '2rem'}} >Copy</Button>
    );
  };
  
  export default CopyButton;