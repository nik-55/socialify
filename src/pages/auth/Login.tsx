import React from 'react'
import { login } from './logic'

const Login = () => {
    return (
        <div id='login_div'>

            <input placeholder='Email' id='login_email' type={"email"} />
            <input placeholder='Password' id='login_password' type={"password"} />
            <button id='login_btn' onClick={login}>Login</button>
         
        </div>
    )
}

export default Login
