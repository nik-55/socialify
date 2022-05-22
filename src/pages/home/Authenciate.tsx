import React, { useState } from 'react'
import { auth, onAuthStateChanged } from '../../services/firebase'
import { User } from 'firebase/auth';
import Home from './Home';


const Authenciate: React.FC = () => {
    const [cuser, setCuser] = useState<User>();

    onAuthStateChanged(auth, (user) => {
        if (user) setCuser(user);
        else setCuser(undefined);
    });

    return (
        <>
        {cuser?<Home user={cuser}/>:"Loading..."}
        </>
    )
}

export default Authenciate;
