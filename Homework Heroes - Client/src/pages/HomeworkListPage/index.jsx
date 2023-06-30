/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import GameContextWrapper, {
  GameContext,
} from "../../context/gameContextWrapper";
import { SideHeader, HomeworkCard, LevelBadge } from "../../components";
import { Lettering } from '../../components';

import { useSelector } from 'react-redux';


import "./index.css";
import Button from '../../components/Button/index'

const HomeworkListPage = () => {
  const [loading, setLoading] = useState(false);
  const [assignments, setAssignments] = useState([]);
  const [completed, setCompletedOnly] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedSubject, setSelectedSubject] = useState('')

  const user_info = localStorage.userInfo;
  const user_json = JSON.parse(user_info);
  const user_id = user_json.id;
  const { userInfo } = useSelector((state) => state.auth)

  useEffect(() => {
    setLoading(true);

    async function loadAssignments() {
      try {
        const response = await fetch(
          `https://homeworkhero-api.onrender.com/students/${user_id}`
        );
        const data = await response.json();

        if (data && data.assignments && Array.isArray(data.assignments)) {
          setAssignments(data.assignments);
        } else {
          setAssignments([]);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    loadAssignments();
  }, []);


  function handleClick(assignment) {
    const { assignment_id } = assignment;
    window.location.href = `/homework/${assignment_id}`;
  }

  const handleSubjectFilter = (subject) => {
    setSelectedSubject(prevSubject => prevSubject === subject ? "" : subject)
  }


  function renderAssignments () {
    let filteredAssignments = assignments;

    if (selectedSubject !== '') {
      filteredAssignments = assignments.filter(
        (assignment) => assignment.subject === selectedSubject

      )
    }

    const orderedAssignments = filteredAssignments.sort((a, b) => {
      const deadlineA = new Date(a.deadline);
      const deadlineB = new Date(b.deadline);

      return deadlineA - deadlineB;
    })


    const filteredAndOrderedAssignments = orderedAssignments.filter(
      (assignment) => !assignment.completed
    )

    return filteredAndOrderedAssignments
      .map((assignment) => (
        <HomeworkCard
          key={assignment.assignment_id}
          assignment={assignment}
          onClick={handleClick}
        />
      ));
  }

  return (
    <GameContextWrapper>
      <div className="container">
        <div className="hw-dashboard"> 

          <div className="hwtitle-hwlevel">
              <div className="letter-sizing">
                <Lettering />
              </div>
              <div className="hw-title">
                <img src= {userInfo.avatar} className="img-dashboard" />
                <h1 className="greeting">Hello, {userInfo.name}!</h1>
                <h2>Welcome to your <b className="homework-em">Homework Dashboard</b></h2>
                <p className="date">Date: {currentDate.toDateString()} </p>
              </div>
              <div className="lvl-badge">
                <LevelBadge />
              </div>
          </div>

          <div className="hw-dash">

            <div className="subjects-container">
                <button
                  className={`pink-btn subjects ${selectedSubject === '' ? 'active' : ''}`}
                  onClick={() => handleSubjectFilter('')}
                  role=""
                  name='All homework'
                >All Homework</button>
                <button
                  className={`pink-btn subjects ${selectedSubject === 'Geography' ? 'active' : ''}`}
                  role=""
                  name='Geography'
                  onClick={() => handleSubjectFilter('Geography')}
                >Geography</button>
                <button
                  className={`pink-btn subjects ${selectedSubject === 'Maths' ? 'active' : ''}`}
                  role=""
                  name='Maths'
                  onClick={() => handleSubjectFilter('Maths')}
                >Maths</button>
                <button
                  className={`pink-btn subjects ${selectedSubject === 'Science' ? 'active' : ''}`}
                  role=""
                  name='Science'
                  onClick={() => handleSubjectFilter('Science')}
                >Science</button>
                <button
                  className={`pink-btn subjects ${selectedSubject === 'English' ? 'active' : ''}`}
                  role=""
                  name='English'
                  onClick={() => handleSubjectFilter('English')}
                >English</button>
              </div>

              <div className="all-student-hw-container">
                {loading ? (
                    <p>Loading...</p>
                  ) : (
                    <>
                      {renderAssignments()}
                    </>
                  )}
              </div>
            </div>

        </div>

      </div>
    </GameContextWrapper>
  );
};

export default HomeworkListPage;
