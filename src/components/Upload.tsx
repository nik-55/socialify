import React, { useState } from 'react'
import Modal from './modal/Modal';
import Postbox from '../pages/Postbox';
import { props } from '../types';

const Upload = (props: props) => {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <div id='upload_div'>
            <button id='upload_btn' className='fa-solid fa-upload'
                onClick={() => { setOpen(true) }}></button>

            {open && <Modal open={setOpen} component={<Postbox user={props.user} userDetails={props.userDetails} />} />}
        </div>
    )
}
export default Upload;
