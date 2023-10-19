import React, { useEffect, useState } from 'react'
import './error.scss'
import NavBar from '../../components/nav-bar/nav-bar'
import { showLoader, tailspin } from '../../components/loader/loader'
import { useSearchParams } from 'react-router-dom'
import { URL_Redirect } from '../../types/types'
import { redirectTo } from '../../utils/auth'

function Error() {
    const [customRedirect,setCustomRedirect] = useState(URL_Redirect.Home)
    const [searchParams] = useSearchParams()
    const [loading, setLoading] = useState(true)
    const [errorMessage,setErrorMessage] = useState("")

    useEffect(() => {
        try{
            if(searchParams.get('error') === 'Unauthorized' || searchParams.get('error')?.toLocaleLowerCase() === 'undefined' || searchParams.get('error')?.toLocaleLowerCase() === 'Error'){
                redirectTo(URL_Redirect.SignIn)
            }else{
                setErrorMessage(searchParams.get('error')!)
            }
            // eslint-disable-next-line no-restricted-globals
            if(URL_Redirect.Error !== location.pathname){
                setErrorMessage('Page not found')
            }
            if(searchParams.get('error')?.includes('Username')){
                let errorMessage = searchParams.get('error')!
                errorMessage = errorMessage.replace('Username','Email')
                setErrorMessage(errorMessage)
            }
            if(searchParams.get('error')?.startsWith('InvalidPasswordException:') || searchParams.get('error')?.includes("Value at 'password' failed to satisfy constraint") || searchParams.get('error')?.startsWith('Password does not conform to policy')){
                let errorMessage = searchParams.get('error')!
                errorMessage = 'Password must be at least 6 characters long, with at least 1 lowercase letter, 1 uppercase letter, 1 symbol and 1 number'
                setErrorMessage(errorMessage)
            }
            if(searchParams.get('error') && searchParams.get('error') === 'User does not exist.'){
                setCustomRedirect(URL_Redirect.SignIn)
            }
            if(!searchParams.get('error')){
                redirectTo(URL_Redirect.SignIn)
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
        showLoader((loading || errorMessage?.length < 1) ,tailspin(),renderError())
    )
}

export default Error;
