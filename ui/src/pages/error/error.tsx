import React, { useEffect, useState } from 'react'
import './error.scss'

import NavBar from '../../components/nav-bar/nav-bar'
import { showLoader, tailspin } from '../../components/loader/loader'
import { useSearchParams } from 'react-router-dom'
import { URL_Redirect } from '../../types/types'
import { Auth } from 'aws-amplify'
import { redirectIfNotLoggedIn } from '../../utils/auth'

function Error() {
    const [customRedirect,setCustomRedirect] = useState(URL_Redirect.Home)
    const [searchParams] = useSearchParams()
    const [loading, setLoading] = useState(true)
    const [errorMessage,setErrorMessage] = useState("unknown error")

    useEffect(() => {
        try{
            if(searchParams.get('error')){
                setErrorMessage(searchParams.get('error')!)
            }
            // eslint-disable-next-line no-restricted-globals
            if(URL_Redirect.Error !== location.pathname){
                setErrorMessage('Page not found')
            }
            if(searchParams.get('error')?.includes('Username')){
                setErrorMessage('Email is invalid')
            }
            if(searchParams.get('error') && searchParams.get('error') === 'Unauthorized'){
                Auth.currentUserInfo().then(async (userInfo)=>{
                    if(userInfo){
                        await Auth.signOut()
                    }
                    await redirectIfNotLoggedIn()
                })
                setCustomRedirect(URL_Redirect.SignIn)
            }
            if(searchParams.get('error') && searchParams.get('error')?.toLocaleLowerCase() === 'undefined' ){
                Auth.currentUserInfo().then(async (userInfo)=>{
                    if(userInfo){
                        await Auth.signOut()
                    }
                    await redirectIfNotLoggedIn()
                })
                setCustomRedirect(URL_Redirect.SignIn)
            }
            setLoading(false)
        }catch(error:any){
            setErrorMessage(error?.message)
        }
    },[])

    function renderError(){
        return(
            <div className='error-container'>
                <NavBar showBackBtn={true} redirectURL={customRedirect}/>
                <div className='error-warning'>{errorMessage}</div>           
            </div>
        )
    }
    return (
        showLoader(loading,tailspin(),renderError())
    )
}

export default Error;
