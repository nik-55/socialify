import React from 'react'
import { userDetails } from '../../types'

type props = {
    userDetails?: userDetails,
    source?: string
}
// why everywhere type name props... be a little specific
const Profile = (props: props) => {
    return (
        <div id='modal_profile'>

            <img className='block' src={props.source} id={"modal_img"} alt={"Oops!!"} />

            <span className='block'>Username : {props.userDetails?.username}</span>

            <span className='block'>Email : {props.userDetails?.email}</span>

            <span className='block'>Intersts : {props.userDetails?.interests.map((element, index) => {
                return <span className='block' key={index}>{element}</span>
            })}</span>

        </div>
    )
}

export default Profile
