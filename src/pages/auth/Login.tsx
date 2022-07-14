import React from 'react'
import { login } from './logic'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import Org from '../../components/Org';

const Login = () => {
    const navigate = useNavigate();


    return (
        <>
            <Org />
            <div id='login_div'>
                                                {/* no  need to put strings in {} , it is supported in JSX */}
                <input placeholder='Email' className='input' id='login_email' type={"email"} autoComplete="off" />
                <input placeholder='Password' className="input" id='login_password' type={"password"} autoComplete="off" />
                <button id='login_btn' onClick={() => { login(navigate); }}>Login</button>
                <small> Don't have an account? <Link to="/signup">Sign Up</Link></small>
            </div></>
    )
}

export default Login
