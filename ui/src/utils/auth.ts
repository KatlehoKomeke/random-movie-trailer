import { Auth } from 'aws-amplify';
import { URL_Redirect } from '../types/types';
import { redirectToErrorPage } from './error';

export function redirectTo(redirect_page:string|undefined){
    // eslint-disable-next-line no-restricted-globals
    location.href = redirect_page ?? URL_Redirect.Home
}

export async function redirectIfNotLoggedIn(redirect_page?:string):Promise<void>{
    try {
        const userInfo = await Auth.currentUserInfo()
        if(!userInfo){
            redirectTo(URL_Redirect.SignIn)
        }
    } catch (error:any){
        redirectToErrorPage(error)
    }
}

export async function redirectIfLoggedIn(redirect_page?:string):Promise<void>{
    try {
        const userInfo = await Auth.currentUserInfo()
        if(userInfo){
            redirectTo(URL_Redirect.Home)
        }
    } catch (error:any){
        redirectToErrorPage(error)
    }
}

