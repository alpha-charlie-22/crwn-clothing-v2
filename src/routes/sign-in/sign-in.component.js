// import { useEffect } from 'react';
// import { getRedirectResult  } from 'firebase/auth';
// import { auth, signInWithGooglePopup, signInWithGoogleRedirect, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import { signInWithGooglePopup, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import Register from "../../components/register/register.component";
import Button from "../../components/button/button.component";

const SignIn = () => {
  // useEffect(() => {
  //   async function fetchData() {
  //     const response = await getRedirectResult(auth);
  //     if(response) {
  //       const userDocRef = await createUserDocumentFromAuth(response.user);
  //     }
  //   }
  //   fetchData();
  // }, []);

  const logGoogleUser = async () => {
    const response = await signInWithGooglePopup();
    console.log({response});
    await createUserDocumentFromAuth(response.user);
  }

  return (
    <div>
      <h1>Sign In Page</h1>
      <Button onClick={logGoogleUser} buttonType='google'>
        Sign in with Google
      </Button>
      <Register />
      {/* <button onClick={signInWithGoogleRedirect} >
        Sign in with Google redirect
      </button>       */}
    </div>
  )
}

export default SignIn;