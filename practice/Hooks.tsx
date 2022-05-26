import React from 'react'
import useInput from './useInput'

const Hooks = () => {
    const [bind,printValue] =useInput("");
  return (
    <div>
      <input {...bind}/>
      <button onClick={()=>printValue}></button>
    </div>
  )
}

export default Hooks
