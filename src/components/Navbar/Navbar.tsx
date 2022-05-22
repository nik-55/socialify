import React, { useEffect, useState } from 'react'
import { props } from '../../types'
import { signout } from '../../pages/auth/logic'
import "./style.css"
import { getApi } from '../../logic/api'

const Navbar = (props: props) => {
  const [src, setSrc] = useState<string>();
  useEffect(() => {
    getApi("https://randomuser.me/api/").then((image_link) => {
      setSrc(image_link);
    });
  }, [])
  return (
    <header>
      <nav className="navbar">
        <ul>
          <li>Socialify</li>
          <li><img src={src} id={"user_image"}/></li>
          <li>{props.userDetails?.username}</li>
          <li><button onClick={signout}>Signout</button></li>
        </ul>
      </nav>
    </header>
  )
}

export default Navbar

