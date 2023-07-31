import React, {useState} from 'react';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom'
import '../styles/Login.css'
import logo from '../styles/logo.png';

const Register = () => {

    const [inputs, setInputs] = useState({
        username: "",
        password: ""
    })

    const [err, setError] = useState(null);

    const navigate = useNavigate()

    const handleChange = (e) => {
        setInputs(prev => ({...prev, [e.target.name]: e.target.value}))
       
    }
 
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("/auth/register", inputs)
            navigate("/login")
            
        } catch(err) {
            setError(err.response.data)
        }
    }

    return (
        <div className="register">
            <div className="loginFormContainer">
                <h1>Create A New Account</h1>
                <form className="loginForm">
                    <input required type="text" className="loginInput" placeholder="username" name="username" onChange={handleChange} />
                    <input required type="text" className="loginInput" placeholder="password" name="password" onChange={handleChange} />
                    <button className="loginButton" onClick={handleSubmit}>Register</button>
                    {err && <p>{err}</p>}
                </form>
                <Link to="/login" className="loginButton backToLogin">Back to Log In</Link>
            </div>
        </div>
    )
}

export default Register;