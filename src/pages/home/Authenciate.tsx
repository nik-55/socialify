import React, { useState } from 'react'
import { auth, onAuthStateChanged } from '../../services/firebase'
import { User } from 'firebase/auth';
import Home from './Home';
import { Link } from 'react-router-dom';



const Authenciate: React.FC = () => {
    const [cuser, setCuser] = useState<User>();
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
