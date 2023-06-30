/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import axios from 'axios'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import './index.css'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import LandingButtom from '../Landing Button/index'
const AssignHomework = ({ students, homework, onAssigmentComplete }) => {
  const [selectedStudentId, setSelectedStudentId] = useState(null)
  const [selectedHomeworkId, setSelectedHomeworkId] = useState(null)
  const [deadLine, setDeadline] = useState(new Date())

  const handleStudentChange = (event) => {
    const studentId = event.target.value
    setSelectedStudentId(studentId)
  }

  const handleHomeworkChange = (event) => {
    const homeworkId = event.target.value
    setSelectedHomeworkId(homeworkId)
  }

  const handleAssignHomework = async () => {
    const new_assignment = {
      "student_id": selectedStudentId,
      "homework_id": selectedHomeworkId,
      "deadline": deadLine
    }
    const headers = {'Content-Type': 'application/json'}

    try {
      const response = await axios.post('https://homeworkhero-api.onrender.com/assignments',new_assignment, headers)
      onAssigmentComplete()
      toast.success('Homework assigned with success!')
    } catch (error) {
      console.log(error.message)
    }
  }

  const handleDateChange = (date) => {
    setDeadline(date)
  }

  return (
    <div className='assign-homework-container'>
      <h2>Assign Homework</h2>
      <div className='assign-hw-form'>
      
        <div className='select-hw'>
          <label htmlFor="homeworkSelect">Select a Homework: </label>
          <select id="homeworkSelect" onChange={handleHomeworkChange}>
            <option value="">-- Select homework --</option>
            {homework.map((hw) => (
              <option key={hw.id} value={hw.id}>
                {hw.homework_name}
              </option>
            ))}
          </select>
        </div>
        
        <div className='select-st'>
          <label htmlFor="studentSelect">Select a Student: </label>
          <select id="studentSelect" onChange={handleStudentChange}>
            <option value="">-- Select Student --</option>
            {students.map((student) => (
              <option key={student.id} value={student.id}>
                {student.name}
              </option>
            ))}
          </select>
        </div>

        <div className='hw-form-date'>
          <label htmlFor="datePicker">Select a Deadline:</label>
          <DatePicker
            className='date'
            id="datePicker"
            selected={deadLine}
            onChange={handleDateChange}
            dateFormat="dd/MM/yyyy"
          />
        </div>
        <button className='main-btn ass-hw' onClick={handleAssignHomework}>ASSIGN HOMEWORK</button>
        <ToastContainer />
      </div>
    </div>
  )
}

export default AssignHomework
