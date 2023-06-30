/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import './index.css'

const NewHomeworkForm = ({ onHomeworkComplete }) => {
  const [showForm, setShowForm] = useState(false)
  const [homeworkName, setHomeworkName] = useState('')
  const [subject, setSubject] = useState('')
  const [content, setContent] = useState('')
  const [extraResources, setExtraResources] = useState('')

  const handleSubmit =  async (event) => {
    event.preventDefault()

    const new_homework = {
      homework_name: homeworkName,
      subject: subject,
      content: content,
      extra_resources: extraResources,
      teacher_id: 1
    }

    try {
      const headers = {'Content-Type': 'application/json'}

      const response = await axios.post('https://homeworkhero-api.onrender.com/homework',new_homework, headers)
      setHomeworkName('')
      setSubject('')
      setContent('')
      setExtraResources('')
      onHomeworkComplete()
      toast.success('Homework created sucessfully!')

    } catch (error) {
      console.error(error.message)
    }
    console.log('homework created')

    setShowForm(false)
  }


  return (
    <div className='new-homework-form-container'>
      <div className='new-hw'>
      <button className='main-btn hw-page' onClick={() => setShowForm(true)}>Create New Homework</button>
      </div>

        {showForm && (
          <form onSubmit={handleSubmit}>

          <div className='new-hw-form'>
            <div className='seperator'>
              <div className='hw-inputs'>
                  <label htmlFor="hw-name">Name:</label>
                  <input
                    className='landing-inputs'
                    required
                    id='hw-name'
                    value={homeworkName}
                    onChange={(event) => setHomeworkName(event.target.value)}
                  />
              </div>
              <div className='hw-inputs'>
                <label htmlFor="hw-subject">Subject:</label>
                <input
                  className='landing-inputs'
                  required
                  id='hw-subject'
                  value={subject}
                  onChange={(event) => setSubject(event.target.value)}
                />
              </div>
              </div>

              <div className='hw-textareas'>
                  <label htmlFor="hw-content">Content:</label>
                  <textarea
                    className='landing-inputs'
                    required
                    id='hw-content'
                    value={content}
                    onChange={(event) => setContent(event.target.value)}
                  />
              </div>

              <div className='hw-textareas'>
                <label htmlFor="hw-extra">Extra resources:</label>
                <textarea
                  className='landing-inputs'
                  required
                  id='hw-extra'
                  value={extraResources}
                  onChange={(event) => setExtraResources(event.target.value) }
                />
              </div>
              <div className='hw-form-btns'>
                <button className='main-btn'type='submit'>Save Homework</button>
                <button className='main-btn'type='button' onClick={() => setShowForm(false)}>Cancel</button>
              </div>
            </div>
          </form>
        )}

        <ToastContainer />
    </div>
  )
}

export default NewHomeworkForm
