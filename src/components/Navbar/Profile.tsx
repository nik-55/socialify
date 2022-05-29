import React from 'react'
import { userDetails } from '../../types'

type props = {
    userDetails?: userDetails,
    source?: string
}

const Profile = (props: props) => {
    return (
        <div>

            <img src={props.source} className={"user_image"} alt={"Oops!!"} />
            <br />

            <small>Username : </small>
            <h4>{props.userDetails?.username}</h4>

            <small>Email : </small>
            <h4>{props.userDetails?.email}</h4>

            <small>Intersts : </small>
            {props.userDetails?.interests.map((element, index) => {
                return <h4 key={index}>{element}</h4>
            })}
        </div>
    )
}

export default Profile
