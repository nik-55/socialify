import React, { useState } from 'react'
import { userDetails } from "../../types"
import { database, update, ref, onValue } from "../../services/firebase"
import { User } from 'firebase/auth'

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
    }
}
const Post = (props: props) => {
    const [liked, setLiked] = useState<boolean>()
    const [disliked, setDisliked] = useState<boolean>()
    const [call, setCall] = useState<boolean>(true)
    const reference = `socialify/posts/${props.element.userDetails.uid}/${props.element.postTime}`
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
        <div style={{ border: "2px solid black" }}>
            <h4>{props.element.userDetails.username} :</h4>
            <img src={props.element.image_src} alt={"oops"} style={{ width: "100px", height: "100px" }} />
            <p>{props.element.postMessage}</p>
            <small>Likes : {props.element.number_of_likes}</small>
            <small>Dislikes : {props.element.number_of_dislikes}</small>
            <button onClick={() => { increment() }}>LIke</button>
            <button onClick={() => {
                decrement()
            }}>DisLike</button>
            <br /><small>{(props.element.postTime)}</small>
        </div>
    )
}

export default Post
