import React, { useEffect, useState } from 'react'
import './menu.scss'

import NavBar from '../../components/nav-bar/nav-bar'
import { Auth } from 'aws-amplify'
import { redirectIfNotLoggedIn } from '../../utils/auth'
import { showLoader, tailspin } from '../../components/loader/loader'
import { redirectToErrorPage } from '../../utils/error'

function Menu() {
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        redirectIfNotLoggedIn().then(() => setLoading(false))
    },[])
    async function logout(){
        setLoading(true)
        try{
            await Auth.signOut()
            await redirectIfNotLoggedIn()
        } catch (error:any) {
            redirectToErrorPage(error?.message)
        }
    }
    async function deleteUser(){
        setLoading(true)
        try{
            await Auth.deleteUser()
            .then((isUserDeleted) => {
                if(isUserDeleted === 'SUCCESS'){
                    redirectIfNotLoggedIn()
                }else{
                    redirectToErrorPage('Account deletion failed')
                }
            })
        } catch (error:any) {
            redirectToErrorPage(error?.message)
        }
    }
    function renderMenu(){
        return(
            <div className='menu-container'>
                <NavBar showBackBtn={true}/>
                <div className='menu-btn-container'>
                    <div className='menu-btn' onClick={logout}>logout</div>  
                    <div className='menu-btn' onClick={deleteUser}>delete account</div>
                </div>           
            </div>
        )
    }
    return (
        showLoader(loading,tailspin(),renderMenu())
    )
}

export default Menu;
