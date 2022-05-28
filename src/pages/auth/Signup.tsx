import React, { useState } from 'react'
import Modal from '../../components/modal/Modal';
import Interest from '../../components/Interest'
import { signup } from './logic'
import { useNavigate } from 'react-router-dom'

const Signup: React.FC = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState<boolean>(false);
    const interest_array: string[] = ["Investing", "Technology", "Singing And Dancing", "Sports", "Reading And Writing"]
    const [user_interests, setUserInterest] = useState<string[]>([])
    function save() {
        const signup_interest = document.getElementById("signup_interest")! as HTMLSelectElement;
        let user_interests: string[] = [];
        for (let i = 0; i < signup_interest.options.length; i++)
            if (signup_interest.options[i].selected) {
                user_interests.push(signup_interest.options[i].value);
                signup_interest.options[i].selected = false;
            }
        setUserInterest(user_interests)
    }
    return (
        <div id='signup_div'>
            <input placeholder='Username' id='signup_username' type={"text"} />
            <input placeholder='Email' id='signup_email' type={"email"} />
            <input placeholder='Password' id='signup_password' type={"password"} />
            <button onClick={() => { setOpen(true) }} id="signup_interest_btn">Interests</button>

            {open && <Modal save={save} open={setOpen} component={<Interest interest_array={interest_array} />} />
            }

            <button id='signup_btn' onClick={() => { signup(user_interests,navigate); }}>Sign Up</button>
        </div>
    )
}

export default Signup

// When modal is closed data user enter get lost ---->bugs