import React, { useState } from 'react'
import "./modal.css";
const Modal = () => {
    const [open, setOpen] = useState(false);
    return (
        <div className="modalback">
            {open && (<>
                <div className="modalcontainer">
                    <div className="modalbody">
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quos distinctio, minus, nobis debitis reprehenderit doloremque repellendus illum ipsa incidunt fugit harum? Voluptate temporibus architecto similique a odio iste reiciendis delectus!</p>
                        <button onClick={() => {
                            setOpen(false)
                        }}>close</button>
                    </div>
                </div>
            </>)}
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veniam alias ipsum ab aperiam? Ducimus, alias expedita nobis qui accusantium exercitationem minus. Omnis doloremque, sed velit amet nisi exercitationem ipsum repellendus.</p>
            <button onClick={() => {
                setOpen(true);
            }}>Open</button>
        </div>
    )
}

export default Modal
