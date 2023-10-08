import React, { useState } from 'react';
import './sign-in.scss';
import NavBar from '../../components/nav-bar/nav-bar';
import { Auth } from 'aws-amplify';


function SignIn() {
  const [swapSignInMode,setSwapSignInMode] = useState(false)
  const [isVerifyStep, setIsVerifyStep] = useState(false)
  const [verifyCode, setVerifyCode] = useState("")
  const [userLoggedIn, setUserLoggedIn] = useState(false)
  const [userFormFields, setUserFormFields] = useState({
    email: "",
    password: "",
  })

  function handleChange(event:any) {
    setUserFormFields({...userFormFields, [event.target.attributes[0].nodeValue]: event.target.value})
  }
  
  async function signUp(){
    try {
      const { user } = await Auth.signUp({
        username: userFormFields.email,
        password: userFormFields.password,
        attributes: {
          email: userFormFields.email
        }
      })
      console.log("user: ",user)
      setIsVerifyStep(true);
    } catch (error) {
      console.log('error signing up:', error)
    }
  }

  async function handleVerifyCode() {
    const email = userFormFields.email;
    try {
      const result = await Auth.confirmSignUp(email, verifyCode)
      console.log("sign up verification result: ",result)
      if(result === 'SUCCESS'){
        setIsVerifyStep(false)
      }else{
        // show error modal
      }
    } catch (error) {
      console.log('error at verify code step');
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

  function renderCodeVerification(){
    return(
      <div className="VerifyCode">
        <div className="">
          <label>Verify Code</label>
          <input type="text" value={verifyCode} onChange={(event) => setVerifyCode(event.target.value)} name="verifyCode" placeholder="code"/>
        </div>
        <button onClick={handleVerifyCode} className='SubmitVerifyCode'>Submit</button>
      </div>
    )
  }

  function renderSignInOrVerification(){
    if(isVerifyStep){      
      return renderCodeVerification() 
    }
    return renderSignInForm()
  }
  
  async function login(){
    try {
      const user = await Auth.signIn(userFormFields.email, userFormFields.password)
      console.log("user: ", user)
      setUserLoggedIn(true)
    } catch (error) {
      console.log('error signing in', error)
    }
  }
  return (
    <>
      <NavBar showBackBtn={true}/>
      {renderSignInOrVerification()}
    </>
  );
}

export default SignIn;
