import React, { useEffect, useState } from 'react'
import './error.scss'
import NavBar from '../../components/nav-bar/nav-bar'
import { showLoader, tailspin } from '../../components/loader/loader'
import { useSearchParams } from 'react-router-dom'
import { URL_Redirect } from '../../declarations/consts'
import { handleErrors } from '../../utils/error'

function Error() {
    const [customRedirect,setCustomRedirect] = useState(URL_Redirect.Home as string)
    const [searchParams] = useSearchParams()
    const [loading, setLoading] = useState(true)
    const [errorMessage,setErrorMessage] = useState("")

    useEffect(() => {
        try{
            handleErrors({errorMessage:searchParams.get('error'),setErrorMessage,setCustomRedirect})
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

export default Error
