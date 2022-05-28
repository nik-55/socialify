import React, { useRef, useState } from 'react'
import { time } from '../../logic/extra';
import { push, ref, database, set,onValue } from "../../services/firebase";
import { userDetails } from '../../types';

type props = {
    user?: userDetails
    postkey: string
}

type comment={
    commentMessage: string,
    commentkey: string,
    user_commenting: string,
    commentTime: string
}
const Comment = (props: props) => {
    const comment_ref = useRef<HTMLInputElement>(null!);
    const [call, setCall] = useState<boolean>(true);
    const [display,setDisplay]=useState<comment[]>();

    function comment() {
        const postListRef = ref(database, `socialify/comments/${props.postkey}`);
        const newPostRef = push(postListRef);
        if(comment_ref.current.value!==""){
        set(newPostRef, {
            commentMessage: comment_ref.current.value,
            commentkey: newPostRef.key,
            user_commenting: props.user?.username,
            commentTime: time()
        });
        comment_ref.current.value = ""; }
        
    }

    function reading() {
        onValue(ref(database,`socialify/comments/${props.postkey}`),(snapshot)=>{
            let arr:comment[]=[];
                snapshot.forEach((element)=>{
                    arr.push(element.val())
                })
                setDisplay(arr);
                setCall(false);
        })
    }

    if (call) reading();

    return (
        <div>
            <input type={"text"} placeholder={"Reply"} ref={comment_ref} />
            <button onClick={comment}>Comment</button>
            {display?display.map((element)=>{
                return <div key={element.commentkey}>
                    <h6>{element.user_commenting}</h6>{element.commentMessage}
                </div>
            }):"Loading Comments...."}
        </div>
    )
}

export default Comment
