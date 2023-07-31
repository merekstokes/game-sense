import React, {useContext} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import {logout} from '../context/authContext';
import '../styles/App.css';
import logo from '../styles/logo.png';

const Nav = () => {

    const {currentUser, logout} = useContext(AuthContext)

    const navigate = useNavigate()

    return (
        <div className="nav">
            <div className="navLogo" onClick={() => navigate("/")}>
                <img src={logo} className="logoImage" alt=""/>
                <span className="gameSense">GameSense</span>
            </div>
            <div className="navButtons">
                <span className="currentUser">{currentUser ? currentUser.username : ""}</span>
                <span className="loginNav">{currentUser ? <span onClick={logout} className="link actionButton"> Log out</span> : <Link className='link actionButton' to="/login">Log in</Link>}</span>
                {currentUser ? <Link className="link actionButtonInverted nav-CreateNewPost" to="/writePost">Create New Post</Link> : ""}
            </div>
        </div>
    )
}

export default Nav;