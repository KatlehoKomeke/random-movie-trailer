import { TailSpin } from  'react-loader-spinner'

export function tailspin(){
    return(
        <TailSpin height="80" width="80" color="#212020" ariaLabel="tail-spin-loading" radius="1" wrapperStyle={{}} wrapperClass="loader" visible={true}/>
    )
}

export function showLoader(loading:boolean = true, loader: JSX.Element, element: JSX.Element){
    if(loading){
        return loader
    }
    return element
}