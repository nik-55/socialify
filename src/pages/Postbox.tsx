import React from 'react'
import { props } from '../types'
import { set, ref, database, storage,sref,uploadBytes } from "../services/firebase"
import { time } from '../logic/extra'

const postbox = (props: props) => {
  const postContent = () => {
    const box = (document.getElementById("postbox")! as HTMLTextAreaElement)
    const image=(document.getElementById("uploadImage")! as HTMLInputElement);
    if(box.value!==""&&image.files?.length===1){
      const extension = image.value.substring(image.value.lastIndexOf('.') + 1).toLowerCase();
      if(extension==="png"||extension==="jpeg"||extension==="jpg"){
    const postTime = time();
    const reference = ref(database, "socialify/posts/" + props.user.uid + "/" + postTime)
    set(reference, {
      userDetails: props.userDetails,
      postMessage: box.value,
      postTime
    });

    const imageref=sref(storage,"socialify/posts/images/"+props.user.uid+"/"+postTime);
    console.log(image.files[0])
    uploadBytes(imageref, image.files[0]).then((snapshot) => {
      console.log('Uploaded a blob or file!');
    });

    box.value = "";
    image.value=""  }
  else alert("Upload a Valid image")  }
    else alert("Don't leave field empty")
  }
  return (
    <div>
      <textarea id='postbox' placeholder='Type Your Post' />
      <input type={"file"} id="uploadImage"/>
      <button onClick={postContent}>Post</button>
    </div>
  )
}

export default postbox
