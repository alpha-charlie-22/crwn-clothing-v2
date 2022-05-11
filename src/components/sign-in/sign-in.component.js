import { useState } from 'react';
import {useDispatch} from 'react-redux';

import FormInput from '../form-input/form-input.component';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';

import {
  googleSignInStart,
  emailSignInStart,
} from '../../store/user/user.action';

import './sign-in.styles.scss';

const defaultFormFields = {
  email: '',
  password: ''
}

const SignIn = () => {
  const dispatch = useDispatch();
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const signInWithGoogle = async () => {
    dispatch(googleSignInStart());
  };

  const handleChange = (event) => {
    const {name, value} = event.target;
    setFormFields({...formFields, [name]: value});
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      dispatch(emailSignInStart(email, password));
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
          <Button type='button' onClick={signInWithGoogle} buttonType={BUTTON_TYPE_CLASSES.google}>Google sign in</Button>
        </div>
      </form>
    </div>
  )
}

export default SignIn;