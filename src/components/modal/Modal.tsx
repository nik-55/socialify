import React from 'react'

type props = {
    open: React.Dispatch<React.SetStateAction<boolean>>,
    component: JSX.Element,
    close:()=>void
}

const Modal = (props: props) => {

    return (
        <div className='modal_bg'>
            <div className="modal">
                {props.component}
                <button onClick={() => { 
                    props.close();
                    props.open(false); }}>Close</button>
            </div>
        </div>
    )
}

export default Modal
