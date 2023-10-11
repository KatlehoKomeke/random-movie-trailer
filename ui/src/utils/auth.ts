import { Auth } from 'aws-amplify';
import { URL_Redirect } from '../types/types';
import { redirectToErrorPage } from './error';

export function redirectTo(redirect_page:string|undefined,fallback:URL_Redirect){
    // eslint-disable-next-line no-restricted-globals
    location.href = redirect_page ?? fallback
}

export async function redirectIfNotLoggedIn(redirect_page?:string):Promise<void>{
    try {
        debugger
        const userInfo = await Auth.currentUserInfo()
        console.log("userInfo: ",userInfo)
        if(!userInfo){
            redirectTo(redirect_page,URL_Redirect.SignIn)
        }
    } catch (error:any){
        redirectToErrorPage(error)
    }
}

export async function redirectIfLoggedIn(redirect_page?:string):Promise<void>{
    try {
        debugger
        const userInfo = await Auth.currentUserInfo()
        console.log("userInfo: ",userInfo)
        if(userInfo){
            redirectTo(redirect_page,URL_Redirect.Home)
        }
    } catch (error:any){
        redirectToErrorPage(error)
    }
}

export async function redirectOnVerifiedLogin(redirect_page?:string){
    try {
        debugger
        const authedUser = await Auth.currentAuthenticatedUser()
        console.log("authedUser: ",authedUser)
        if(authedUser){
            redirectTo(redirect_page,URL_Redirect.Home)
        }
    } catch (error:any){
        redirectToErrorPage(error)
    }
}

