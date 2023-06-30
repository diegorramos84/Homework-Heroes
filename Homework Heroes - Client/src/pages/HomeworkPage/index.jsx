/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { SideHeader, HomeworkTimer, Sounds } from "../../components";
import GreenContextWrapper from "../../context/greenContextWrapper";
import GameContextWrapper from "../../context/gameContextWrapper";
import { toast } from "react-toastify";
import { Lettering } from '../../components';
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import axios from "axios";

const HomeworkPage = () => {
  const { id } = useParams();
  const [homework, setHomework] = useState(null);
  const [loading, setLoading] = useState(true);
  const [resources, setResources] = useState([]);
  const user_info = localStorage.userInfo
  const user_json = JSON.parse(user_info)
  const user_id = user_json.id
  const name = user_json.name
  const avatar = user_json.avatar



  async function loadHomework() {
    console.log('HI IM HERE')
    try {
      const response = await fetch(
        `https://homeworkhero-api.onrender.com/assignments/${id}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch homework");
      }

      const data = await response.json();
      setHomework(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }
  useEffect(() => {
    setLoading(true);
    console.log('Im here')

    loadHomework();

    async function loadResources() {
      try {
        const response = await fetch(
          "https://homeworkhero-api.onrender.com/assignments"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch resources");
        }

        const data = await response.json();
        setResources(data);
      } catch (error) {
        console.log(error);
      }
    }


    loadResources();
  }, [id]);

    const handleClickComplete = async () => {
    const assign_update = {
      completed: true,
    };

    const headers = { "Content-Type": "application/json" };

    try {
      const response = await axios.patch(
        `https://homeworkhero-api.onrender.com/assignments/${id}`,
        assign_update,
        { headers }
      );
      loadHomework();
      toast.success( `🚀 Assignment marked as completed.  Well Done ${name}`);
    } catch (error) {
      console.log(error.message);
      toast.error("An error occurred while marking the assignment as completed.");
    }
  };

  const handleClickUndo = async () => {
    const assign_update = {
      completed: false,
    };


    const headers = { "Content-Type": "application/json" };

    try {
      const response = await axios.patch(
        `https://homeworkhero-api.onrender.com/assignments/${id}`,
        assign_update,
        { headers }
      );
      loadHomework();
      toast.success(` Assignment marked as incomplete. `);
    } catch (error) {
      toast.error("An error occurred while marking the assignment as incomplete.");
    }
  };

  // const formattedDeadline = new Date(homework.deadline).toLocaleDateString('en-US', {
  //   day: 'numeric',
  //   month: 'short',
  // });

  return (
    <div className="homework-page-container">

      <div className="page">
        <div className="singular-homework">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <main>
              <h2>{homework.homework_name}</h2>
              <h3>{homework.deadline}</h3>
              <div className="assign-status">
                <p><b className="status">Status: </b>{homework.completed
                    ? 'Completed'
                    : 'Pending'
                    }
                </p>
              </div>
              <div className="same-line">
                <h3>Content:</h3>
                <p>{homework.content}</p>
              </div>

              <div className="same-line">
                <h3>Subject:</h3>

                <p>{homework.subject}</p>
              </div>

              <div className="same-line">
                <h3>Teacher:</h3>
                <p>{homework.teacher}</p>
              </div>

              <div className="assign-buttons">
                <button className='pink-btn subjects' onClick={handleClickComplete}>Complete</button>
                <button className='pink-btn subjects' onClick={handleClickUndo}>Undo</button>
              </div>

              <Link className="link" to={"/homework"}>
                Go back to the Dashboard
              </Link>
            </main>
          )}
        </div>

        <div className="timer">
            <HomeworkTimer />
            <div className="sound-container">
              <Sounds />
            </div>
        </div>

        <div className="customisation2">
          <Lettering />
        </div>
      </div>
    </div>

  );
};

export default HomeworkPage;

// this should fix it
