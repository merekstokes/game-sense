import React from 'react';
import logo from '../styles/logo.png';
import {Link, useNavigate} from 'react-router-dom';
import '../styles/App.css';

const Footer = () => {
    const navigate = useNavigate()
    return (
        <div className="footer">
            <div className="footerLogo" onClick={() => navigate("/")}>
                <img src={logo} className="logoImage" alt=""/>
                <span className="gameSense">GameSense</span>
            </div>
        </div>
    )
}

export default Footer;