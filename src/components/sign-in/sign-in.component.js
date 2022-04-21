import { useState } from 'react';
import { createUserDocumentFromAuth, signInWithGooglePopup, signInAuthUserWithEmailAndPassword } from '../../utils/firebase/firebase.utils'

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import './sign-in.styles.scss';

const defaultFormFields = {
  email: '',
  password: ''
}

const SignIn = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const signInWithGoogle = async () => {
    const response = await signInWithGooglePopup();
  };

  const handleChange = (event) => {
    const {name, value} = event.target;
    setFormFields({...formFields, [name]: value});
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const {user} = await signInAuthUserWithEmailAndPassword(email, password);
      // console.log(user);
      // setCurrentUser(user);
      resetFormFields();
    } catch (error) {
      switch(error.code) {
        case 'auth/wrong-password':
          alert('Incorrect email/password');
          break;
        case 'auth/user-not-found':
          alert('No user association with this email');
          break;
        default:
          console.error('some error: ', error);
      }
    }
  };

  return (
    <div className='sign-up-container'>
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput 
          label='Email'
          type="email" name='email' value={email} onChange={handleChange} required/>
        <FormInput 
          label='Password'
          type="password" name='password' value={password} onChange={handleChange} required/>

        <div className='buttons-container'>
          <Button type='submit'>Sign in</Button>
          <Button type='button' onClick={signInWithGoogle} buttonType='google'>Google sign in</Button>
        </div>
      </form>
    </div>
  )
}

export default SignIn;