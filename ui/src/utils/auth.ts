import { Auth } from 'aws-amplify';

export async function isAuthenticatedUser(){
    debugger
    const user = await Auth.currentAuthenticatedUser()
    return user ? true : false
}

export async function checkIfLoggedIn(){
    try {
        const userInfo = await Auth.currentUserInfo()
        if(!userInfo){
            console.log("userInfo: ",userInfo)
            // eslint-disable-next-line no-restricted-globals
            location.href = '/sign-in'
        }
    } catch (error:any){
        throw new Error(error)
    }
}
