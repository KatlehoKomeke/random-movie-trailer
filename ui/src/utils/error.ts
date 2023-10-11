import { URL_Redirect } from "../types/types";
import { pauseApp } from "./devUtil";

export function redirectToErrorPage(errorMessage:string){
    pauseApp(errorMessage)
    // eslint-disable-next-line no-restricted-globals
    location.href = URL_Redirect.Error+"?error="+errorMessage
}