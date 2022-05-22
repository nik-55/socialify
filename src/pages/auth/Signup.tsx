import React from 'react'
import Interest from '../../components/Interest'
import { signup } from './logic'

const Signup: React.FC = () => {


    return (
        <div id='signup_div'>
            <input placeholder='Username' id='signup_username' type={"text"} />
            <input placeholder='Email' id='signup_email' type={"email"} />
            <input placeholder='Password' id='signup_password' type={"password"} />
            <Interest />
            <button id='signup_btn' onClick={signup}>Sign Up</button>
        </div>
    )
}

export default Signup

