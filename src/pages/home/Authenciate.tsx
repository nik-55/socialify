import React, { useState } from 'react'
import { auth, onAuthStateChanged } from '../../services/firebase'
import { User } from 'firebase/auth';
import Home from './Home';
import { Link } from 'react-router-dom';

// Function should be in firebase directory inside auth_service

const Authenciate: React.FC = () => {
    // no need of shortcuts write conplete names..
    const [cuser, setCuser] = useState<User>();
    // variable names should makes sense
    const [other,setOther]=useState<JSX.Element>(<h1>Loading...</h1>)
    onAuthStateChanged(auth, (user) => {
        if (user) setCuser(user);
        else { setCuser(undefined);
                setOther(<Link to="/login">PLease Login In</Link>)
        }
    });

    return (
        <>
        {cuser?<Home user={cuser}/>:other}
        </>
    )
}

export default Authenciate;
