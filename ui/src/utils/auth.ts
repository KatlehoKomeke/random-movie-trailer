import { Auth } from 'aws-amplify'
import { URL_Redirect } from '../declarations/consts'
import { redirectToErrorPage } from './error'

export const jwt = async ():Promise<string> => {
    return (await Auth.currentAuthenticatedUser())?.signInUserSession?.accessToken?.jwtToken!
}

export function redirectTo(redirect_page:string|undefined){
    window.location.href = redirect_page ?? URL_Redirect.Home
}

export async function redirectIfNotLoggedIn(redirect_page?:string):Promise<void>{
    await Auth.currentUserInfo()
    .then((userInfo)=>{
        if(!userInfo){
            redirectTo(redirect_page ?? URL_Redirect.SignIn)
        }
    })
    .catch((error:Error)=>redirectToErrorPage(error.message))
}

export async function redirectIfLoggedIn(redirect_page?:string):Promise<void>{
    await Auth.currentUserInfo()
    .then((userInfo)=>{
        if(userInfo){
            redirectTo(redirect_page ?? URL_Redirect.Home)
        }
    })
    .catch((error:Error)=>redirectToErrorPage(error.message))
}

