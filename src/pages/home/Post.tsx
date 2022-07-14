import React, { useState } from 'react'
import { userDetails } from "../../types"
import { database, update, ref, onValue } from "../../services/firebase"
import { User } from 'firebase/auth'
import Modal from "../../components/modal/Modal"
import Comment from "./Comment"

type props = {
    user: User
    element: {
        postMessage: string;
        postTime: string;
        userDetails: userDetails;
        image_src: string;
        postInterest: string[];
        number_of_likes: number,
        number_of_dislikes: number,
        postKey: string
    },
    userDetails?: userDetails
}
const Post = (props: props) => {
    const [liked, setLiked] = useState<boolean>()
    const [disliked, setDisliked] = useState<boolean>()
    const [call, setCall] = useState<boolean>(true)
    const [open, setOpen] = useState<boolean>(false);
    const reference = `socialify/posts/${props.element.userDetails.uid}/${props.element.postKey}`


    function reading() {
        onValue(ref(database, reference + `/users/${props.user.uid}`), (snapshot) => {
            if (snapshot.exists()) {
                setLiked(snapshot.val().liked || false)
                setDisliked(snapshot.val().disliked || false)
                setCall(false)
            }
            else {
                setLiked(false)
                setDisliked(false)
                setCall(false)
            }
        })
    }

    if (call) reading();

    function increment() {
        if (!liked && !disliked) {
            update(ref(database, reference), {
                number_of_likes: props.element.number_of_likes + 1,
            })
            update(ref(database, reference + `/users/${props.user.uid}`), {
                liked: true
            })
        }
        else if (!disliked) {
            update(ref(database, reference), {
                number_of_likes: props.element.number_of_likes - 1,
            })
            update(ref(database, reference + `/users/${props.user.uid}`), {
                liked: false
            }
            )
        }

    }

    function decrement() {
        if (!liked && !disliked) {
            update(ref(database, reference), {
                number_of_dislikes: props.element.number_of_dislikes + 1,
            })
            update(ref(database, reference + `/users/${props.user.uid}`), {
                disliked: true
            })
        }
        else if (!liked) {
            update(ref(database, reference), {
                number_of_dislikes: props.element.number_of_dislikes - 1,
            })
            update(ref(database, reference + `/users/${props.user.uid}`), {
                disliked: false
            }
            )
        }
    }



    return (
        <div className="post_div">
            <span className='block'>{props.element.userDetails.username}</span>
            <img src={props.element.image_src} alt={"oops"} className="post_img" />
            <p className='post_para'>{props.element.postMessage}</p>

                                                                    {/* Increment can directly be passed as function in onClick */}
            <button className='fa-solid fa-thumbs-up ldrbtn' onClick={() => { increment() }}>
                <small> {props.element.number_of_likes}</small></button>

            <button className='fa-solid fa-thumbs-down ldrbtn' onClick={() => { decrement() }}>
                <small> {props.element.number_of_dislikes}</small></button>

            <button className='fa-solid fa-comment ldrbtn' onClick={() => { setOpen(true) }}></button>
            {open && <Modal open={setOpen} component={<Comment user={props.userDetails} postkey={props.element.postKey} />} />}

            <br/> <small className='small_txt'>{(props.element.postTime)}</small>
        </div>

    )
}

export default Post
