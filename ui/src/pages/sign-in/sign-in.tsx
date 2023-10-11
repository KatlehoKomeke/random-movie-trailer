import React, { useEffect, useState } from 'react'
import './sign-in.scss'
import { Auth } from 'aws-amplify'
import { redirectIfLoggedIn } from '../../utils/auth'
import { showLoader, tailspin } from '../../components/loader/loader'
import { redirectToErrorPage } from '../../utils/error'


function SignIn() {
  const [swapSignInMode,setSwapSignInMode] = useState(false)
  const [userFormFields, setUserFormFields] = useState({
    email: "",
    password: "",
  })
  const [isVerifyStep, setIsVerifyStep] = useState(false)
  const [verifyCode, setVerifyCode] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    redirectIfLoggedIn().then(() => setLoading(false))
  },[])

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
      .then(() => setIsVerifyStep(true))
    } catch (error:any) {
      redirectToErrorPage(error)
    }
  }

  async function verifyUser() {
      await Auth.confirmSignUp(userFormFields.email, verifyCode)
      .then(async (result)=>{
        console.log("sign up verification result: ",result)
        if(result === 'SUCCESS'){
          await redirectIfLoggedIn()
        }else{
          redirectToErrorPage('Verification failed, try again')
        }
      })
      .catch((error) =>
        redirectToErrorPage(error?.message) 
      )
  }

  async function login(){
    debugger
    await Auth.signIn(userFormFields.email, userFormFields.password)
    .then(async ()=> await redirectIfLoggedIn())
    .catch((error)=>{
      if(error?.message !== 'User is not confirmed.'){
        redirectToErrorPage(error?.message)
      }
      setIsVerifyStep(true)
    })
  }

  function renderSignInBtn(){
    if(swapSignInMode){
      return <div className="btn" onClick={()=>{login()}}>Login</div>
    }
    return <div className="btn" onClick={()=>{signUp()}}>Sign up</div>
  }

  function renderSignInForm(){
    return(
      <div className='sign-in'>
        <div className="input-container">
          <div className="sign-up_login-switch">
                <div
                  className="switch"
                  onClick={()=>{setSwapSignInMode(false)}}
                >
                  Sign up
                </div>
                <div
                  className="switch"
                  onClick={()=>{setSwapSignInMode(true)}}
                >
                  Login
                </div>
          </div>
          <input type='email' placeholder="Email" value={userFormFields.email} onChange={handleChange}></input>
          <input type='password' placeholder="Password" value={userFormFields.password} onChange={handleChange}></input>
          {renderSignInBtn()}
        </div>
      </div>
    )
  }

  function renderCodeVerification(){
    return(
      <div className="VerifyCode-container">
        <div className="sub-container">
          <div className="instructions">Please enter the verification code sent to your email. If you haven't received one, please wait 5 minutes before requesting another.</div>
          <div className='VerifyCode-input-container'>
            <input type="email" value={userFormFields.email} name="email" placeholder="Email"/>
            <input type="text" value={verifyCode} onChange={(event) => setVerifyCode(event.target.value)} name="verifyCode" placeholder="Verification code"/>
            <div className='btn-container'>
              <div onClick={verifyUser} className='btn'>Verify</div>
              <div onClick={verifyUser} className='btn'>Resend</div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  function renderSignInOrVerifyMode(){
    if(isVerifyStep){
      return renderCodeVerification()
    }
    return renderSignInForm()
  }
  
  return (
    showLoader(loading,tailspin(),renderSignInOrVerifyMode())
  )
}

export default SignIn;

