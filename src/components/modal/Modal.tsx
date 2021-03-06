import React from 'react'
import "./modal.css"
type props = {
    open: React.Dispatch<React.SetStateAction<boolean>>,
    component: JSX.Element,
    save?: () => void
}

const Modal = (props: props) => {

    return (
        <div className='modal_bg'>
            <div className="modal">
                {props.component}
                <button onClick={() => {
                    props.open(false);
                }}>Close</button>
                {props.save ? <button onClick={props.save}>Post</button> : ""}
            </div>
        </div>
    )
}

export default Modal;
