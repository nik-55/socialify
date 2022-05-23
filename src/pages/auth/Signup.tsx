import React, { useState } from 'react'
import Modal from '../../components/modal/Modal';
import Interest from '../../components/Interest'
import { signup } from './logic'

const Signup: React.FC = () => {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <div id='signup_div'>
            <input placeholder='Username' id='signup_username' type={"text"} />
            <input placeholder='Email' id='signup_email' type={"email"} />
            <input placeholder='Password' id='signup_password' type={"password"} />
            <button onClick={() => { setOpen(true) }} id="signup_interest_btn">Interests</button>

            {open && <Modal open={setOpen} component={<Interest />} />}

            <button id='signup_btn' onClick={() => { signup(); }}>Sign Up</button>
        </div>
    )
}

export default Signup

// When modal is closed data user enter get lost ---->bugs