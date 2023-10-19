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
  const [isResetPasswordStep, setIsResetPasswordStep] = useState(false)
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
    await Auth.signIn(userFormFields.email, userFormFields.password)
    .then(async ()=> await redirectIfLoggedIn())
    .catch((error)=>{
      if(error?.message !== 'User is not confirmed.'){
        redirectToErrorPage(error?.message)
      }else{
        setIsVerifyStep(true)
        setLoading(false)
      }
    })
  }

  // Send confirmation code to user's email
  async function forgotPassword(forgotPassword?: true) {
    setLoading(true)
    if(!userFormFields.email){
      redirectToErrorPage('Please specify your email address before, resetting ')
      return
    }
    setUserFormFields({...userFormFields,password: ""})
    setIsVerifyStep(true)
    if(forgotPassword){
      setVerificationHeader('Another verification code has been sent. Please check your email.')
    }
    setIsResetPasswordStep(true)
    await Auth.forgotPassword(userFormFields.email)
    .then((data) => {     
      if(data){
        setLoading(false)
      }
      console.log("await Auth.forgotPassword(userFormFields.email)",data)
    })
    .catch((error) =>{
      if(error.message !== 'Cannot reset password for the user as there is no registered/verified email or phone_number'){
        redirectToErrorPage(error?.message)
      }else{
        setIsVerifyStep(true)
        setIsResetPasswordStep(false)
        setLoading(false)
      }
    })
  }

  // Collect confirmation code and new password
  async function forgotPasswordSubmit() {
    setLoading(true)
    await Auth.forgotPasswordSubmit(userFormFields.email, verifyCode, userFormFields.password)
    .then((response) => {
      // eslint-disable-next-line no-restricted-globals
      response === 'SUCCESS' ? setSwapSignInMode(true) : redirectToErrorPage('Password resest was unsuccessful')
      setIsVerifyStep(false)
      setLoading(false)
    })
    .catch((error) => redirectToErrorPage(error?.message))
  }


  function renderSignInBtn(){
    if(swapSignInMode){
      return (
        <>
          <div className="btn" onClick={login}>Login</div>
          <div>
            <div className='switchSignInMode-container'>
              <p>Forgot password?</p><p className='forgot-password' onClick={()=>forgotPassword()}>Reset</p>
            </div>
            <div className='switchSignInMode-container'>
              <p>Don't have an acccount?</p> <p className='switchSignInMode' onClick={()=>setSwapSignInMode(false)}>Sign up</p>
            </div>
          </div>
        </>
      )
    }
    return (
      <>
        <div className="btn" onClick={signUp}>Sign up</div> 
        <div className='switchSignInMode-container'>
          <p>Already have an acccount? </p> <p className='switchSignInMode' onClick={()=>setSwapSignInMode(true)}>Login</p>
        </div>
      </>
    )
  }

  function renderSignInForm(){
    return(
      <div className='sign-in'>
        <div className="input-container">
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

  function renderResetPassword(){
    return(
      <div className="ResetPassword-container">
        <div className="sub-container">
          <div className="instructions">{verificationHeader}</div>
          <div className='VerifyCode-input-container'>
            <input type="text" value={verifyCode} onChange={(event) => setVerifyCode(event.target.value)} name="verifyCode" placeholder="Enter verification code"/>
            <input type="password" value={userFormFields.password} onChange={updateUserCredentials} name="newPassword" placeholder="Enter new password"/>
          </div>
          <div className='btn-container'>
              <div onClick={forgotPasswordSubmit} className='btn'>Confirm</div>
              <div onClick={()=>forgotPassword(true)} className='btn'>Resend</div>
            </div>
        </div>
      </div>
    )
  }

  function renderSignInOrVerifyMode(){
    if(isVerifyStep){
      return isResetPasswordStep ? renderResetPassword() : renderCodeVerification()
    }
    return renderSignInForm()
  }
  
  return (
    showLoader(loading,tailspin(),renderSignInOrVerifyMode())
  )
}

export default SignIn;

