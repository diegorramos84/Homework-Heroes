import React from "react";
import { NavLink } from "react-router-dom";
import boyStudy from '../../assets/images/boyStudy.png'
import './style.css';


const Footer = () => {
  return (
    <footer role='footer' className="footer-container">
        <div className="teach-dash-btn">
            <NavLink  to='/teacherdashboard'>Teacher Dashboard</NavLink>
        </div>
          <img role='img' src={boyStudy} alt='Boy studying' />
        <div role='info' className="footer-info">
          <p><strong>Homework Heroes inc</strong></p>
          <p>123 Hotel street</p>
          <p>LH15 6PY</p>
          <p>01968 222444</p>
        </div>
    </footer>
  );
};

export default Footer;

