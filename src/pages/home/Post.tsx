import React, { useState } from 'react'
import { userDetails } from "../../types"
import { database, update, ref } from "../../services/firebase"
type props = {
    element: {
        postMessage: string;
        postTime: string;
        userDetails: userDetails;
        image_src: string;
        postInterest: string[];
        number_of_likes: number,
        number_of_dislikes: number,
        reactedlike: boolean,
        reacteddislike: boolean,
    }
}
const Post = (props: props) => {
    const [nlikes, setNlikes] = useState<number>(props.element.number_of_likes);
    const [ndislikes, setNdislikes] = useState<number>(props.element.number_of_dislikes);

    function increment() {
        if (!props.element.reactedlike && !props.element.reacteddislike) {
            update(ref(database, "socialify/posts/" + props.element.userDetails.uid + "/" + props.element.postTime), {
                number_of_likes: props.element.number_of_likes + 1,
                reactedlike: true
            })
            setNlikes(nlikes + 1);
        }
        else if (!props.element.reacteddislike) {
            update(ref(database, "socialify/posts/" + props.element.userDetails.uid + "/" + props.element.postTime), {
                number_of_likes: props.element.number_of_likes - 1,
                reactedlike: false
            })
            setNlikes(nlikes - 1);
        }
    }

    function decrement() {
        if (!props.element.reacteddislike && !props.element.reactedlike) {
            update(ref(database, "socialify/posts/" + props.element.userDetails.uid + "/" + props.element.postTime), {
                number_of_dislikes: props.element.number_of_dislikes + 1,
                reacteddislike: true
            })
            setNdislikes(ndislikes + 1);
        }
        else if (!props.element.reactedlike) {
            update(ref(database, "socialify/posts/" + props.element.userDetails.uid + "/" + props.element.postTime), {
                number_of_dislikes: props.element.number_of_dislikes - 1,
                reacteddislike: false
            })
            setNdislikes(ndislikes - 1);
        }
    }

    return (
        <div style={{ border: "2px solid black" }}>
            <h4>{props.element.userDetails.username} :</h4>
            <img src={props.element.image_src} style={{ width: "100px", height: "100px" }} />
            <p>{props.element.postMessage}</p>
            <small>Likes : {nlikes}</small>
            <small>Dislikes : {ndislikes}</small>
            <button onClick={() => { increment() }}>LIke</button>
            <button onClick={() => {
                decrement()
            }}>DisLike</button>
            <br /><small>{(props.element.postTime)}</small>
        </div>
    )
}

export default Post
