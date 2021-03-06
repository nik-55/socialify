import React from 'react'
import { set, ref, database, storage, sref, uploadBytes, getDownloadURL, push } from "../services/firebase"
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
              const refer = ref(database, "socialify/posts/" + props.user.uid);
              const reference = push(refer);
              set(reference, {
                userDetails: props.userDetails,
                postMessage: box.value,
                postTime,
                image_src,
                postInterest: user_interests.sort(),
                number_of_likes: 0,
                number_of_dislikes: 0,
                postKey: reference.key
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
      <textarea id='postbox' placeholder='Type Your Post' className='upload_items'/>
      <input type={"file"} id="uploadImage" className='upload_items'/>
      <Interest interest_array={props.userDetails ? props.userDetails.interests : [""]} />
      <button onClick={postContent} className='upload_items'>Post</button>
    </div>
  )
}

export default postbox
