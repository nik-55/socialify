import React from 'react'
import { set, ref, database, storage, sref, uploadBytes, getDownloadURL } from "../services/firebase"
import { time } from '../logic/extra'
import Interest from '../components/Interest'
import { props } from '../types'


const postbox = (props: props) => {
  const postContent = () => {
    const box = (document.getElementById("postbox")! as HTMLTextAreaElement)
    const image = (document.getElementById("uploadImage")! as HTMLInputElement);
    const signup_interest = document.getElementById("signup_interest")! as HTMLSelectElement;

    if (box.value !== "" && image.files?.length === 1) {

      let user_interests: string[] = [];
      for (let i = 0; i < signup_interest.options.length; i++)
        if (signup_interest.options[i].selected) {
          user_interests.push(signup_interest.options[i].value);
          signup_interest.options[i].selected = false;
        }
      if (user_interests.length !== 0) {
        const extension = image.value.substring(image.value.lastIndexOf('.') + 1).toLowerCase();
        if (extension === "png" || extension === "jpeg" || extension === "jpg") {
          const postTime = time();

          const imageref = sref(storage, "socialify/posts/images/" + props.user.uid + "/" + postTime);
          console.log(image.files[0])
          uploadBytes(imageref, image.files[0]).then((snapshot) => {
            getDownloadURL(sref(storage, 'socialify/posts/images/' + props.user.uid + "/" + postTime)).then((url) => {
              const image_src = url;
              const reference = ref(database, "socialify/posts/" + props.user.uid + "/" + postTime)
              set(reference, {
                userDetails: props.userDetails,
                postMessage: box.value,
                postTime,
                image_src,
                postInterest: user_interests.sort(),
                number_of_likes: 0,
                number_of_dislikes: 0,
                reactedlike : false,
                reacteddislike : false,
              });
              box.value = "";
            })
            console.log('Uploaded a blob or file!');

            image.value = "";
          });

        }
        else alert("Upload a Valid image")
      }
      else alert("Select Interest Tags")
    }
    else alert("Don't leave field empty")
  }
  return (
    <div>
      <textarea id='postbox' placeholder='Type Your Post' />
      <input type={"file"} id="uploadImage" />
      <button onClick={postContent}>Post</button>
      <Interest interest_array={props.userDetails ? props.userDetails.interests : [""]} />
    </div>
  )
}

export default postbox
