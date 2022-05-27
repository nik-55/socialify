import React, { useState } from 'react'
import Modal from './modal/Modal';
import Postbox from '../pages/Postbox';
import { props } from '../types';

const Upload = (props: props) => {
    const [open, setOpen] = useState<boolean>(false);
    function close() {
        setOpen(false);
    }
    return (
        <>
            <button onClick={() => { setOpen(true) }} >Upload</button>
            {open && <Modal close={close} open={setOpen} component={<Postbox user={props.user} userDetails={props.userDetails} />} />}
        </>
    )
}
export default Upload;
