import React, { useState } from 'react';
import './sign-in.scss';
import NavBar from '../../components/nav-bar/nav-bar';
import { Auth } from 'aws-amplify';


function SignIn() {
  const [swapSignInMode,setSwapSignInMode] = useState(false)
  const [userFormFields, setUserFormFields] = useState({
    email: "",
    password: "",
  })

  function handleChange(event:any) {
    setUserFormFields({...userFormFields, [event.target.attributes[0].nodeValue]: event.target.value})
  }
  
  async function signUp(){
    try {
      await Auth.signUp({
        username: userFormFields.email,
        password: userFormFields.password,
        attributes: {
          email: userFormFields.email
        }
      })
      console.log("jwt: ", (await Auth.currentAuthenticatedUser())?.getAccessToken().getJwtToken())
      // eslint-disable-next-line no-restricted-globals
      location.href = '/'
    } catch (error) {
      console.error('error signing up:', error)
    }
  }

  function renderSignInBtn(){
    if(swapSignInMode){
      return <div id="subscribe" onClick={()=>{login()}}>Login</div>
    }
    return <div id="subscribe" onClick={()=>{signUp()}}>Sign up</div>
  }

  function renderSignInForm(){
    return(
      <div className='sign-in'>
        <div className="input-container">
          <div className="sign-up_login-switch">
                <div
                  className="switch"
                  onClick={()=>{setSwapSignInMode(false)}}
                >Sign up</div>
                <div
                  className="switch"
                  onClick={()=>{setSwapSignInMode(true)}}
                >Login</div>
          </div>
          <input type='email' placeholder="Email" value={userFormFields.email} onChange={handleChange}></input>
          <input type='password' placeholder="Password" value={userFormFields.password} onChange={handleChange}></input>
        </div>
        {renderSignInBtn()}
      </div>
    )
  }
  
  async function login(){
    try {
      await Auth.signIn(userFormFields.email, userFormFields.password)
      console.log("jwt: ", (await Auth.currentAuthenticatedUser())?.getAccessToken().getJwtToken())
      // eslint-disable-next-line no-restricted-globals
      location.href = '/'
    } catch (error) {
      console.log('error signing in', error)
    }
  }
  return (
    <>
      <NavBar showBackBtn={true}/>
      {renderSignInForm()}
    </>
  );
}

export default SignIn;
