import React, { useState } from 'react'
import Modal from './modal/Modal';
import Postbox from '../pages/Postbox';
import { props } from '../types';

const Upload = (props: props) => {
    const [open, setOpen] = useState<boolean>(false);
  
    return (
        <>
            <button onClick={() => { setOpen(true) }} >Upload</button>
            {open && <Modal  open={setOpen} component={<Postbox user={props.user} userDetails={props.userDetails} />} />}
        </>
    )
}
export default Upload;
