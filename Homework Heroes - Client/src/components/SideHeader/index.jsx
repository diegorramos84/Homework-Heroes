import React, { useContext } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { Lettering, Toggle } from '../../components';
import GreenContextWrapper from '../../context/greenContextWrapper';
import './style.css';

const SideHeader = () => {
  const location = useLocation();
  const { id } = useParams();

  const isHomeworkPage = location.pathname.includes(`/homework/${id}`);

  return (
    <GreenContextWrapper>
      <div className="component">
        <ul className="link-list">
          <li>
            <Link to="/homework">Homework</Link>
          </li>
          {/* <li>
            <Link to="/notes">Notes</Link>
          </li>
          <li>
            <Link to="/calendar">Calendar</Link>
          </li> */}
        </ul>
        {isHomeworkPage && (
          <div className="resources">
            <h3>Resources</h3>
            <ul>
            </ul>
          </div>
        )}
        <div className="toggles">
          <Lettering className="LT" />
          <Toggle className="DM" />
        </div>
      </div>
    </GreenContextWrapper>
  );
};

export default SideHeader;

