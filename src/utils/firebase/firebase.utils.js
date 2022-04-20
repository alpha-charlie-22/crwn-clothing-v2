import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCMxDrUX2j-AHwVWkKge9w0JitkzYHQsXg",
  authDomain: "fir-crwn-clothing-db.firebaseapp.com",
  projectId: "fir-crwn-clothing-db",
  storageBucket: "fir-crwn-clothing-db.appspot.com",
  messagingSenderId: "489034518898",
  appId: "1:489034518898:web:06460c2db2894ebcaa0deb"
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account"
})

export const auth = getAuth();
export const signInWithGooglePopup = async () => {
  try{
    return await signInWithPopup(auth, provider);
  } catch(error) {
    console.error('sign-in failed: ', error);
  }
};

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);
  console.log(userDocRef);
  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);
  console.log(userSnapshot.exists());

  if(!userSnapshot.exists()) {
    const { displayName, email }= userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt
      })
    } catch(error) {
      console.error('failed to create user', error.message);
    }
  }
  return userDocRef;
};