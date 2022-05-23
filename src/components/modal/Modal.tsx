import React from 'react'

type props = {
    open: React.Dispatch<React.SetStateAction<boolean>>,
    component: JSX.Element,
}

const Modal = (props: props) => {

    return (
        <div className='modal_bg'>
            <div className="modal">
                {props.component}
                <button onClick={() => { props.open(false) }}>Close</button>
            </div>
        </div>
    )
}

export default Modal
