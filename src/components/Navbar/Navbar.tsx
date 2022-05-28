import React, { useEffect, useState } from 'react'
import { props } from '../../types'
import { signout } from '../../pages/auth/logic'
import "./style.css"
import { getApi } from '../../logic/api'
import { useNavigate } from 'react-router-dom'

const Navbar = (props: props) => {
  const [src, setSrc] = useState<string>();
  const navigate = useNavigate();

  useEffect(() => {

    getApi("https://avatars.dicebear.com/api/avataaars/").then((image_link) => {
      setSrc(image_link);
    });

  }, [])
  return (
    <header>
      <nav className="navbar">
        <ul>
          <li>Socialify</li>
          <li><img src={src} id={"user_image"} alt={"Oops!!"}/></li>
          <li>{props.userDetails?.username}</li>
          <li><button onClick={()=>{signout(navigate)}}>Signout</button></li>
        </ul>
      </nav>
    </header>
  )
}

export default Navbar

