import { TailSpin } from  'react-loader-spinner'
import { TailSpinProps } from '../../declarations/types'
import { initTailSpin } from '../../declarations/consts'

export function tailspin(props:TailSpinProps = initTailSpin){
    return(
        <TailSpin height={props.height} width={props.width} color={props.color} ariaLabel={props.ariaLabel} radius={props.radius} wrapperStyle={props.wrapperStyle} wrapperClass={props.wrapperClass} visible={props.visible}/>
    )
}

export function showLoader(loading:boolean = true, loader: JSX.Element, element: JSX.Element){
    if(loading){
        return loader
    }
    return element
}