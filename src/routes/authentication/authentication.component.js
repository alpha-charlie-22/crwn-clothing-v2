// import { useEffect } from 'react';
// import { getRedirectResult  } from 'firebase/auth';
// import { auth, signInWithGooglePopup, signInWithGoogleRedirect, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import Register from "../../components/register/register.component";
import SignIn from "../../components/sign-in/sign-in.component";

import './authentication.styles.scss';

const Authentication = () => {
  // useEffect(() => {
  //   async function fetchData() {
  //     const response = await getRedirectResult(auth);
  //     if(response) {
  //       const userDocRef = await createUserDocumentFromAuth(response.user);
  //     }
  //   }
  //   fetchData();
  // }, []);

  return (
    <div className='authentication-container'>
      <SignIn />
      <Register />
      {/* <button onClick={signInWithGoogleRedirect} >
        Sign in with Google redirect
      </button>       */}
    </div>
  )
}

export default Authentication;