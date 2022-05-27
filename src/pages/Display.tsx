import React, { useState } from 'react'
import { database, ref, onValue } from '../services/firebase'
import { userDetails } from "../types"
import Post from './home/Post';
type post = {
    postMessage: string;
    postTime: string;
    userDetails: userDetails;
    image_src: string,
    postInterest: string[],
    number_of_likes: number,
    number_of_dislikes : number,
    reactedlike : boolean,
    reacteddislike : boolean,
}[]

type postitem = {
    postMessage: string;
    postTime: string;
    userDetails: userDetails;
    image_src: string,
    postInterest: string[],
    number_of_likes: number,
    number_of_dislikes : number,
    reactedlike : boolean,
    reacteddislike : boolean,
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
        <div>
            {display ? display.map((element) => {
                return <Post element={element} key={element.postTime}/>
            }) : "Loading posts...."}
        </div>
    )
}

export default Display
