import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar';
import { props, userDetails } from '../../types';
import { onValue, database, ref } from '../../services/firebase';
// import Postbox from '../Postbox';
import Display from '../Display';
import Upload from '../../components/Upload';

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
    let unsuscribe=scanning_user();
    return unsuscribe
  }, [])

  return (
    <>
      <Navbar user={props.user} userDetails={userDetails} />
      {/* <Postbox user={props.user} userDetails={userDetails}/> */}
      <Upload user={props.user} userDetails={userDetails}/>
      <Display userDetails={userDetails}/>
    </>
  )
}

export default Home
