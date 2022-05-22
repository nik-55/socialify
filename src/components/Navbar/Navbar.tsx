import React from 'react'
import { props } from '../../types'
import { signout } from '../../pages/auth/logic'
import "./style.css"

const Navbar = (props:props) => {
  return (
    <header>
      <nav className="navbar">
          <ul>
              <li>Socialify</li>
              <li>{props.userDetails?.username}</li>
              <li><button onClick={signout}>Signout</button></li>
          </ul>
      </nav>
    </header>
  )
}

export default Navbar

