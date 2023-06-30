/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import images from '../../assets/images/imageHelper'
import VisualCard from '../../components/VisualCard';
import './index.css'


const VisualCalendar = () => {
  const [calendarImages, setCalendarImages] = useState(images);

  const handleDragStart = (index) => (event) => {
    event.dataTransfer.setData('text/plain', String(index));
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (dropIndex) => (event) => {
    event.preventDefault();
    const dragIndex = Number(event.dataTransfer.getData('text/plain'));
    if (dragIndex !== dropIndex) {
      const updatedImages = [...calendarImages];
      const temp = updatedImages[dragIndex];
      updatedImages[dragIndex] = updatedImages[dropIndex];
      updatedImages[dropIndex] = temp;
      setCalendarImages(updatedImages);
    }
  };

  return (
    <div className="calendar-container">
      {calendarImages.map((image, index) => (
        <VisualCard
          key={index}
          image={image}
          index={index}
          handleDragStart={handleDragStart(index)}
          handleDragOver={handleDragOver}
          handleDrop={handleDrop(index)}
        />
      ))}
    </div>
  );
};

export default VisualCalendar;
