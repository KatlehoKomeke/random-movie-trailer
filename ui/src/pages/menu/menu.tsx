import React, { useEffect, useState } from 'react'
import './menu.scss'

import NavBar from '../../components/nav-bar/nav-bar'
import { Auth } from 'aws-amplify'
import { checkIfLoggedIn } from '../../utils/auth'
import { showLoader, tailspin } from '../../utils/loader'

function Menu() {
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        checkIfLoggedIn().then(() => setLoading(false))
    },[])
    async function logout(){
        const isLoggedOut = await Auth.signOut()
        console.log("isLoggedOut: ",isLoggedOut)
    }
    async function deleteUser(){
        const isUserDeleted = await Auth.deleteUser()
        console.log("isLoggedOut: ",isUserDeleted)
    }
    function renderMenu(){
        return(
            <div className='menu-container'>
                <NavBar showBackBtn={true}/>
                <div className='menu-btn' onClick={logout}>logout</div>  
                <div className='menu-btn' onClick={deleteUser}>delete account</div>           
            </div>
        )
    }
    return (
        showLoader(loading,tailspin(),renderMenu())
    )
}

export default Menu;
