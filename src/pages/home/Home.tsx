import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar';
import { props, userDetails } from '../../types';
import { onValue, database, ref } from '../../services/firebase';

const Home = (props: props) => {
  const [userDetails, setUserDetails] = useState<userDetails>();

  let scanning_user = () => {
    try {
      onValue(ref(database, 'socialify/users/' + props.user.uid),
        (snapshot) => { setUserDetails(snapshot.val()); });
    }
    catch (error) { console.log(error); }
  }

  useEffect(() => {
    scanning_user();
  }, [])

  return (
    <>
      <Navbar user={props.user} userDetails={userDetails} />
    </>
  )
}

export default Home
