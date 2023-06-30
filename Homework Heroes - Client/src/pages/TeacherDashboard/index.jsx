/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './index.css'
import { AssignHomework } from '../../components'
import { NewHomeworkForm } from '../../components'

import MainTitle from '../../components/MainTitle/index'
import LandingButton from '../../components/Landing Button'


const TeacherDashboard = () => {
  const [homework, setHomework] = useState([])
  const [students, setStudents] = useState([])
  const [assignmentUpdated, setAssignmentUpdated] = useState(false)
  const [homeworkUpdated, setHomeworkUpdated] = useState(false)
  const [teacherFeedbackValues, setTeacherFeedbackValues] = useState({});

  const fetchHomework = async () => {
    const homework_list = await axios.get('https://homeworkhero-api.onrender.com/homework')
    const homework_data = await homework_list.data
    setHomework(homework_data)
  }

  const fetchStudents = async () => {
    const students_list = await axios.get('https://homeworkhero-api.onrender.com/students')
    const students_data = await students_list.data
    setStudents(students_data)
    setAssignmentUpdated(false)
  }

  useEffect(() => {
    fetchHomework()
  }, [homeworkUpdated])

  const resetHomeworkToFalse = () => {
    setHomeworkUpdated(false)
  }

  useEffect(() => {
    resetHomeworkToFalse()
  })

  useEffect(() => {
    fetchStudents()
  }, [assignmentUpdated])

  const handleTeacherFeedbackChange = (assignmentId, value) => {
    setTeacherFeedbackValues((prevFeedbackValues) => ({
      ...prevFeedbackValues,
      [assignmentId]: value,
    }))
  }


  const handleTeacherFeedbackSubmit = async (studentId, assignmentId) => {
    const student = students.find((student) => student.id === studentId)
    if (!student) return

    const assignment = student.assignments.find(
      (assignment) => assignment.assignment_id === assignmentId)
    if (!assignment) return

    const feedback = {
      "teacher_feedback": teacherFeedbackValues[assignmentId]
    }

    const headers = {'Content-Type': 'application/json'}

    try {
      // Send a PATCH request to update the teacher feedback in the database
      await axios.patch(`https://homeworkhero-api.onrender.com/assignments/${assignmentId}`, feedback, headers)
      console.log('Teacher feedback updated successfully')

      fetchStudents()
      setTeacherFeedbackValues((prevFeedbackValues) => ({
        ...prevFeedbackValues,
        [assignmentId]: ''
      }))
    } catch (error) {
      console.error('Error updating teacher feedback:', error);
    }
  };


  return (
    <div className='teacher-dashboard'>
        <div className='title-hw-form'>
        <MainTitle mainTitle='Teacher Dashboard'/>

        {/* HOMEWORK FORM */}
        <NewHomeworkForm onHomeworkComplete={() => setHomeworkUpdated(true)} />

      </div>

      {/* ALL HOMEWORK LIST  */}
      <div className='homework-container'>
        <h2>Homework List</h2>
        <div className="homework-list">
        {
            homework.map(hw => (
              <div key={hw.id} className="homework-item">
                <div className="homework-info">
                <h3>{hw.homework_name}</h3>
                  <div className='homework-info-seperator'>
                      <div className='hw-separator-card'>
                        <h5>Subject:</h5> <p>{hw.subject}</p>
                      </div>
                      <div className='hw-separator-card'>
                        <h5>Content:</h5>
                          <ul>
                            <li>{hw.content}</li>
                          </ul>
                      </div>
                      <div className='hw-separator-card'>
                        <h5>Resources:</h5>
                          <ul>
                            <li>{hw.extra_resources}</li>
                          </ul>
                      </div>
                    </div>
                </div>
                {/*
                <div className='homework-btn'>
                  <Button name='DELETE'/>
                </div>
                */}
              </div>
              ))
          }
        </div>
      </div>



    {/* ALL STUDENTS LIST WITH HOMEWORK COMPLETED/PENDING*/}
    <div className='student-list-container'>
      <div className="students-list">
          <h2>List of students</h2>

          <div className='student-container'>
            {
              students.map(st => (
                <div className='student-card' key={st.id}>

                  <div className='student-info'>
                    <div className='st-name'><h5>Student Name: </h5> <p>{st.name}</p></div>
                    <div className='st-id'><h5>Student ID: </h5> <p>{st.id}</p></div>
                    <div className='st-class'><h5>Student Class: </h5> <p>{st.school_class}</p></div>
                    <div className='student-btn'><LandingButton name='STUDENT PROFILE'/></div>
                  </div>

                  <div className='student-assignment-info'>
                    <div className="ass-info">
                      {st.assignments.map((assign) => (
                        <ul key={assign.assignment_id}>
                          <div className='ind-ass'>
                            <div className='individual-ass'>
                              <h3>Homework Name: </h3>
                              <h5>{assign.homework_name}:</h5>
                              <p>Has student completed: {assign.completed ? 'Completed ' : 'Pending'}</p>
                            </div>
                          {assign.completed && (
                            <div className='feedback-ass'>
                              <h3>Feedback:</h3>
                                <h5>student feedback: </h5> <p>{assign.student_feedback}</p>
                                <h5>teacher feedback:</h5>
                                {assign.teacher_feedback === null ? (

                                  <div className='teacher-feedback-form'>
                                    <div className='feedback-input'>
                                      <textarea
                                        className='landing-inputs'
                                        value={teacherFeedbackValues[assign.assignment_id] || ''}
                                        onChange={(e) =>
                                        handleTeacherFeedbackChange (
                                          assign.assignment_id,
                                          e.target.value)
                                        }
                                      />
                                    </div>
                                    <button className='pink-btn' onClick={() => handleTeacherFeedbackSubmit  (st.id, assign.assignment_id)}>SUBMIT</button>
                                  </div>

                                ) : (
                                  <p>{assign.teacher_feedback}</p>
                                )}
                            </div>
                          )}
                        </div>
                        </ul>
                      ))}
                    </div>
                  </div>
                </div>
                ))
            }
          </div>

          </div>
        </div>

        <AssignHomework
            students={students}
            homework={homework}
            onAssigmentComplete={() => setAssignmentUpdated(true)}
        />
      </div>
  )
}

export default TeacherDashboard
