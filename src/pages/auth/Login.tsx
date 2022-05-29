import React from 'react'
import { login } from './logic'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'


const Login = () => {
    const navigate = useNavigate();


    return (
        <div id='login_div'>

            <input placeholder='Email' id='login_email' type={"email"} />
            <input placeholder='Password' id='login_password' type={"password"} />
            <button id='login_btn' onClick={()=>{login(navigate) ; }}>Login</button>
            <small> Don't have an account? <Link to="/signup">Sign Up</Link></small>
        </div>
    )
}

export default Login
