import React, {useState, useContext} from 'react';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom'
import {AuthContext} from '../context/authContext';
import '../styles/Login.css'
import logo from '../styles/logo.png';

const Login = () => {

    const [inputs, setInputs] = useState({
        username: "",
        password: ""
    });
    const [err, setError] = useState(null);

    const navigate = useNavigate();

    const {login} = useContext(AuthContext)

    const handleChange = (e) => {
        setInputs(prev => ({...prev, [e.target.name]: e.target.value}))
       
    }
 
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(inputs)
            navigate("/")
            
        } catch(err) {
            setError(err.response.data)
        }
    }


    return (
        <div className="login">
            <div className="loginLogo" onClick={() => navigate("/")}>
                <img src={logo} className="loginLogoImage" alt=""/>
                <span className="loginGameSense">GameSense</span>
            </div>
            <div className="loginFormContainer">
                <h1>Log in to your account</h1>
                <form className="loginForm">
                    <input required type="text" className="loginInput" placeholder="username" name="username" onChange={handleChange} />
                    <input required type="password" className="loginInput" placeholder="password" name="password" onChange={handleChange} />
                    <button className="loginButton" onClick={handleSubmit}>Log In</button>
                    {err && <p>{err}</p>}
                </form>
                <div className="createAccountContainer">
                    <div className="createAccount">
                        <div>Don't have an account?</div> 
                        <Link to="/register" className="loginButton">Create one here</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;