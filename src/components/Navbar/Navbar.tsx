import React, { useEffect, useState } from 'react'
import { props } from '../../types'
import { signout } from '../../pages/auth/logic'
import { getApi } from '../../logic/api'
import { useNavigate } from 'react-router-dom'
import Profile from './Profile'
import Modal from '../modal/Modal'
// why inconsistency in type definition location
const Navbar = (props: props) => {
  // destructure props
  const [src, setSrc] = useState<string>();
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    // async await can be used
    getApi("https://avatars.dicebear.com/api/avataaars/").then((image_link) => {
      setSrc(image_link);
    });

  }, []);



  return (
    <header>
        <nav className="navbar">
          <ul>
            <a href='/'><li className='navtab'>Socialify</li></a>
            <li><img src={src} id={"user_image"} alt={"Oops!!"}
              onClick={() => { setOpen(true) }} /></li>
            {open ? <Modal open={setOpen} component={<Profile source={src} userDetails={props.userDetails} />} /> : ""}
            <li className='navtab' onClick={() => { setOpen(true) }}>{props.userDetails?.username}</li>
            <li className='navtab'><button id='signout_btn' onClick={() => { signout(navigate) }}>Signout</button></li>
          </ul>
        </nav>
    </header>
  )
}

export default Navbar

