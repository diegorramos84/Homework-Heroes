/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';

const VisualCard = ({ image, index, handleDragStart, handleDragOver, handleDrop }) => {
  return (
    <div
      className="card"
      draggable
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <img src={image} alt={`Image ${index}`} />
    </div>
  );
};

export default VisualCard;
