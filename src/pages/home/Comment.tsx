import React, { useRef, useState } from 'react'
import { time } from '../../logic/extra';
import { push, ref, database, set, onValue } from "../../services/firebase";
import { userDetails } from '../../types';

type props = {
    user?: userDetails
    postkey: string
}

type comment = {
    commentMessage: string,
    commentkey: string,
    user_commenting: string,
    commentTime: string
}
const Comment = (props: props) => {
    const comment_ref = useRef<HTMLInputElement>(null!);
    const [call, setCall] = useState<boolean>(true);
    const [display, setDisplay] = useState<comment[]>();

    function comment() {
        const postListRef = ref(database, `socialify/comments/${props.postkey}`);
        const newPostRef = push(postListRef);
        if (comment_ref.current.value !== "") {
            set(newPostRef, {
                commentMessage: comment_ref.current.value,
                commentkey: newPostRef.key,
                user_commenting: props.user?.username,
                commentTime: time()
            });
            comment_ref.current.value = "";
        }

    }

    function reading() {
        onValue(ref(database, `socialify/comments/${props.postkey}`), (snapshot) => {
            let arr: comment[] = [];
            snapshot.forEach((element) => {
                arr.push(element.val())
            })
            setDisplay(arr);
            setCall(false);
        })
    }

    if (call) reading();

    return (
        <div className='comment_div'>
            <input type={"text"} placeholder={"Reply"} ref={comment_ref} className='input'/>
            {display ? display.map((element) => {
                return <div key={element.commentkey}>
                    <small className='comment_username'>{element.user_commenting} </small>
                    <span>{element.commentMessage}</span>
                </div>
            }) : "Loading Comments...."}
            <button className='comment_btn' onClick={comment}>Comment</button>
        </div>
    )
}

export default Comment
