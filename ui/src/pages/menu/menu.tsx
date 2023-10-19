import React, { useEffect, useState } from 'react'
import './menu.scss'
import NavBar from '../../components/nav-bar/nav-bar'
import { Auth } from 'aws-amplify'
import { redirectIfNotLoggedIn, redirectTo } from '../../utils/auth'
import { showLoader, tailspin } from '../../components/loader/loader'
import { redirectToErrorPage } from '../../utils/error'
import { deleteWatchlist } from '../../utils/watchlist'

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
        await Auth.deleteUser()
        .then((isUserDeleted) => {
            if(isUserDeleted === 'SUCCESS'){
                redirectIfNotLoggedIn()
            }else{
                redirectToErrorPage('Account deletion failed')
            }
        })
        .catch((error) =>
            redirectToErrorPage(error?.message)
        )
    }

    async function deleteWatchlistAndUser(){
        setLoading(true)
        await deleteWatchlist()
        .then(() => deleteUser())
        .catch(() => deleteUser())
    }
    function renderMenu(){
        return(
            <div className='menu-container'>
                <NavBar showBackBtn={true}/>
                <div className='menu-btn-container'>
                    <div className='menu-btn' onClick={()=>{
                        redirectTo('mailto:katkomza@gmail.com')
                    }}>contact me</div>
                    <div className='menu-btn' onClick={logout}>logout</div>  
                    <div className='menu-btn' onClick={deleteWatchlistAndUser}>delete account</div>
                </div>           
            </div>
        )
    }
    return (
        showLoader(loading,tailspin(),renderMenu())
    )
}

export default Menu;
