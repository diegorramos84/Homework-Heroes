/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';
import GreenContextWrapper from '../../context/greenContextWrapper';
import {FaCheckCircle} from 'react-icons/fa'
import './style.css';

const HomeworkCard = ({ assignment, onClick }) => {
  const { id, homework_name, deadline, subject } = assignment;

  const handleClick = () => {
    onClick(assignment);
  };

  const formattedDeadline = new Date(deadline).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
  });

  return (
    <GreenContextWrapper>
    <div className='homeworkList-container'>
      <div className="all-homework" onClick={handleClick}>
          <div className='dueDate-container'>
            <div className='date-cont'>
              <p className="due-date">Due date: 
              <p><b>{formattedDeadline}</b></p></p>
            </div>
          </div>
          <Link to={`/homework/${id}`} className='hw-name'>{homework_name}</Link>
            <p className='hw-status'>
            {assignment.completed ? (
              <>
                <span className='completed-icon'>
                  <FaCheckCircle />
                </span>
                Completed
              </>
            ) : (
              <span className='pending-text'>Pending</span>
            )}
          </p>

          <div className="assign-feedback">
            {assignment.student_feedback
              ? <p>student_feedback: {assignment.student_feedback}</p>
              : ""
            }
            {assignment.teacher_feedback
              ? <p>teacher feedback: {assignment.teacher_feedback}</p>
              : ""
            }
          </div>
        </div>
      
    </div>

    </GreenContextWrapper>
  );
};

export default HomeworkCard;


