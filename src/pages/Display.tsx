import React, { useState } from 'react'
import { database, ref, onValue } from '../services/firebase'
import { userDetails } from "../types"
type post = {
    postMessage: string;
    postTime: string;
    userDetails: userDetails;
    image_src: string,
    postInterest: string[]
}[]

type postitem = {
    postMessage: string;
    postTime: string;
    userDetails: userDetails;
    image_src: string,
    postInterest: string[]
}

type props={
    userDetails:userDetails|undefined
}

const Display = (props: props) => {
    const [display, setDisplay] = useState<post>();
    const [call, setCall] = useState<boolean>(true);
    const [check, setCheck] = useState<boolean>(false)

    let reference = ref(database, "socialify/posts");

    function reading(interest:string[]) {
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
                       let cinterest:string[]=[];
                       for(let i=0;i<interest.length;i++) if(child2.val().postInterest.indexOf(interest[i])>-1)
                       cinterest.push(interest[i]);
                       console.log(cinterest);
                       if(cinterest.length!==0) arr.push(child2.val())
                    })
                })

                arr.sort((a, b) => compare(a, b));
                setDisplay(arr);
                console.log(arr);
                setCall(false);
            }
        })
    }


   if(props.userDetails?.interests) { if (call) reading(props.userDetails.interests); }
   

    return (
        <ol>
            {display ? display.map((element) => {
                return <li style={{ border: "2px solid black" }} key={element.postTime}><h4>{element.userDetails.username} :</h4>
                    <img src={element.image_src} style={{ width: "100px", height: "100px" }} />
                    <p>{element.postMessage}</p>
                    <br /><small>{(element.postTime)}</small></li>
            }) : "Loading posts...."}
        </ol>
    )
}

export default Display
