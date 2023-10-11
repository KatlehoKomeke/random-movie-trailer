import React, { useEffect, useState } from 'react'
import './error.scss'

import NavBar from '../../components/nav-bar/nav-bar'
import { showLoader, tailspin } from '../../components/loader/loader'
import { useSearchParams } from 'react-router-dom'
import { URL_Redirect } from '../../types/types'

function Error() {
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
                // eslint-disable-next-line no-restricted-globals
                console.log("location.pathname: ",location.pathname)
            }
            if(searchParams.get('error')?.startsWith('invalidpassword')){
                setErrorMessage('Invalidpassword: rules are 1. atleast 6 characters long , 2. atleast 1 uppercase, 3. atleast 1 lowercase, 4. atleast 1 number, 5. atleast 1 symbol')
            }
            if(searchParams.get('error')?.includes('Username')){
                setErrorMessage('Email is invalid')
            }
            setLoading(false)
        }catch(error:any){
            setErrorMessage(error?.message)
        }
    },[])

    function renderError(){
        return(
            <div className='error-container'>
                <NavBar showBackBtn={true}/>
                <div className='error-warning'>{errorMessage}</div>           
            </div>
        )
    }
    return (
        showLoader(loading,tailspin(),renderError())
    )
}

export default Error;
