import React, { useEffect, useState } from 'react'
import './sign-in.scss'
import { Auth } from 'aws-amplify'
import { redirectIfLoggedIn} from '../../utils/auth'
import { showLoader, tailspin } from '../../components/loader/loader'
import { redirectToErrorPage } from '../../utils/error'


function SignIn() {
  const [verificationHeader,setVerificationHeader] = useState("Please enter the verification code sent to your email. If you haven't received one, please wait 5 minutes before requesting another.")
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

  function updateUserCredentials(event:any) {
    setUserFormFields({...userFormFields, [event.target.attributes[0].nodeValue]: event.target.value})
  }
  
  async function signUp(){
    setLoading(true)
    await Auth.signUp({
      username: userFormFields.email,
      password: userFormFields.password,
      attributes: {
        email: userFormFields.email
      }
    })
    .then(() => {
      setIsVerifyStep(true)
      setLoading(false)
    })
    .catch((error)=>redirectToErrorPage(error))
  }

  async function verifyUser() {
    setLoading(true)
    await Auth.confirmSignUp(userFormFields.email, verifyCode)
    .then(async (result)=>{
      if(result === 'SUCCESS'){
        await login()
      }else{
        redirectToErrorPage('Verification failed, try again')
      }
    })
    .catch((error) =>
      redirectToErrorPage(error?.message) 
    )
  }

  async function resendVerificationCode() {
    setLoading(true)
    await Auth.resendSignUp(userFormFields.email)
    .then(async (result)=>{
      setLoading(false)
      setVerificationHeader('Another verification code has been sent. Please check your email.')
    })
    .catch((error) =>
      redirectToErrorPage(error?.message) 
    )
  }

  async function login(){
    setLoading(true)

    await Auth.currentUserInfo()
    .then(async (userInfo) => {
      if(userInfo){
        await Auth.currentAuthenticatedUser()
        .catch(() => {
          setIsVerifyStep(true)
          setLoading(false)
        })
      }
    })

    await Auth.signIn(userFormFields.email, userFormFields.password)
    .then(async ()=> await redirectIfLoggedIn())
    .catch((error)=>{
      if(error?.message !== 'User is not confirmed.'){
        redirectToErrorPage(error?.message)
      }
      setIsVerifyStep(true)
      setLoading(false)
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
                <div className="switch" onClick={()=>{setSwapSignInMode(false)}}>
                  Sign up
                </div>
                <div className="switch" onClick={()=>{setSwapSignInMode(true)}}>
                  Login
                </div>
          </div>
          <input type='email' placeholder="Email" value={userFormFields.email} onChange={updateUserCredentials}></input>
          <input type='password' placeholder="Password" value={userFormFields.password} onChange={updateUserCredentials}></input>
          {renderSignInBtn()}
        </div>
      </div>
    )
  }

  function renderCodeVerification(){
    return(
      <div className="VerifyCode-container">
        <div className="sub-container">
          <div className="instructions">{verificationHeader}</div>
          <div className='VerifyCode-input-container'>
            <input type="text" value={verifyCode} onChange={(event) => setVerifyCode(event.target.value)} name="verifyCode" placeholder="Enter verification code"/>
          </div>
          <div className='btn-container'>
              <div onClick={verifyUser} className='btn'>Verify</div>
              <div onClick={resendVerificationCode} className='btn'>Resend</div>
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

