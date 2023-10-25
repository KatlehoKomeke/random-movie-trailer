import { URL_Redirect } from "../declarations/consts";
import { handleErrorsProp } from "../declarations/types";
import { redirectTo } from "./auth";

export function redirectToErrorPage(errorMessage:string){
    window.location.href = URL_Redirect.Error+"?error="+errorMessage
}

const analyzers = [
    {
        description: "Handle unknown errors",
        run: (props:handleErrorsProp):void|never => {
            switch(props.errorMessage){
                case 'Unauthorized':
                case 'undefined':
                case 'Error':
                    redirectTo(URL_Redirect.SignIn)
                    break
                default:
            }
        }
    },
    {
        description: "Default action",
        run: (props:handleErrorsProp):void|never => {
            if(props.errorMessage){
                props.setErrorMessage(props.errorMessage)
            }
        }
    },
    {
        description: "Handle 404s",
        run: (props:handleErrorsProp):void|never => {
            if(URL_Redirect.Error !== window.location.pathname){
                props.setErrorMessage('Page not found')
            }
        }
    },
    {
        description: "Handle 'email' swapped with 'Username'",
        run: (props:handleErrorsProp):void|never => {
            if(props.errorMessage?.includes('Username')){
                props.errorMessage = props.errorMessage.replace('Username','Email')
                props.setErrorMessage(props.errorMessage)
            }
        }
    },
    {
        description: "Handle vague password error message",
        run: (props:handleErrorsProp):void|never => {
            if(props.errorMessage?.startsWith('InvalidPasswordException:') || props.errorMessage?.includes("Value at 'password' failed to satisfy constraint") || props.errorMessage?.startsWith('Password does not conform to policy')){
                props.errorMessage = 'Password must be at least 6 characters long, with at least 1 lowercase letter, 1 uppercase letter, 1 symbol and 1 number'
                props.setErrorMessage(props.errorMessage)
            }
        }
    },
    {
        description: "Handle vague password error message",
        run: (props:handleErrorsProp):void|never => {
            if(props.errorMessage && props.errorMessage === 'User does not exist.'){
                props.setCustomRedirect(URL_Redirect.SignIn)
            }
        }
    },
    {
        description: "Handle vague password error message",
        run: (props:handleErrorsProp):void|never => {
            if(props.errorMessage && props.errorMessage === 'User does not exist.'){
                props.setCustomRedirect(URL_Redirect.SignIn)
            }
        }
    }
] as const

export function handleErrors(props:handleErrorsProp):void|never{
    analyzers.forEach((analyzerObjectType) => analyzerObjectType.run(props))
}
