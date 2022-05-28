import React, { useRef, useState } from 'react'
import { push, onChildChanged, ref, database,set } from "../../services/firebase";

const Comment = () => {
    const comment_ref = useRef<HTMLInputElement>(null!);
    function comment() {
        const postListRef = ref(database, 'socialify/comments');
        const newPostRef = push(postListRef);
        set(newPostRef, {
          comments: comment_ref.current.value,
          key: newPostRef.key
        });
    }
    return (
        <div>
            <input type={"text"} placeholder={"Reply"} ref={comment_ref} />
            <button onClick={comment}>Comment</button>
        </div>
    )
}

export default Comment
