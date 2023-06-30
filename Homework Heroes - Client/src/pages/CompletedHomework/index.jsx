/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { SideHeader, HomeworkCard} from "../../components";

const CompletedHomework = () => {
  const [loading, setLoading] = useState(false);
  const [assignments, setAssignments] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());

  const user_info = localStorage.userInfo
  const user_json = JSON.parse(user_info)
  const user_id = user_json.id

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

  function renderAssignments() {
    const ordered_assignments = assignments.sort((a,b) => {
      const deadlineA = new Date(a.deadline)
      const deadlineB = new Date(b.deadline)

      return deadlineA - deadlineB
    })

    return ordered_assignments
      .filter((assignment) => assignment.completed)
      .map((assignment) => (
        <HomeworkCard
          key={assignment.assignment_id}
          assignment={assignment}
          onClick={handleClick}
        />
      ));
  }
  return (
    <div className="container">
      <div className="hl-title">
        <h1>Completed Homework</h1>
      </div>
      <div className="dashboard">
        <div className="list">
        {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              <p className="today-date">Today's Date: {currentDate.toDateString()}</p>
              {renderAssignments()}
            </>
          )}
        </div>
      </div>
      <div className="SH-container">
        <SideHeader className="SH-testing" />
      </div>
    </div>
  );
}

export default CompletedHomework
