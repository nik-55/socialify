import React, { useState } from 'react'
import { database, ref, onValue } from '../services/firebase'
import { userDetails, props } from "../types"
type post = {
    postMessage: string;
    postTime: string;
    userDetails: userDetails;
    image_src: string
}[]

type postitem = {
    postMessage: string;
    postTime: string;
    userDetails: userDetails;
    image_src: string
}

const Display = (props: props) => {
    const [display, setDisplay] = useState<post>();
    const [call, setCall] = useState<boolean>(true);

    let reference = ref(database, "socialify/posts");

    function reading() {
        function compare(a: postitem, b: postitem) {
            if (new Date(a.postTime) < new Date(b.postTime))
                return -1;
            else if (new Date(a.postTime) > new Date(b.postTime)) return 1;
            return 0;
        }
        onValue(reference, (snapshot) => {
            let arr: post = [];
            if (snapshot.exists()) {
                snapshot.forEach((child1) => {
                    child1.forEach((child2) => {
                        arr.push(child2.val());
                    })
                })

                arr.sort((a, b) => compare(a, b));
                setDisplay(arr);
                console.log(arr);
                setCall(false);
            }
        })
    }


    if (call) reading();

    return (
        <ol>
            {display ? display.map((element) => {
                return <li style={{ border: "2px solid black" }} key={element.postTime}><h4>{element.userDetails.username} :</h4>
                    <img src={element.image_src} style={{width: "100px",height:"100px"}} />
                    <p>{element.postMessage}</p>
                    <br /><small>{(element.postTime)}</small></li>
            }) : "Loading posts...."}
        </ol>
    )
}

export default Display