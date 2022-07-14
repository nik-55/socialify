import React from 'react'
import "./modal.css"
// do not name is props.. make name more self explanatory
type props = {
    open: React.Dispatch<React.SetStateAction<boolean>>,
    component: JSX.Element,
    save?: () => void
}
// Define types for the functional component like const Modal : React.FC = () => {}
const Modal = (props: props) => {
// Destructure props
    return (
        <div className='modal_bg'>
            <div className="modal">
                {/* children is passed by default no need to pass as props explicitly */}
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
