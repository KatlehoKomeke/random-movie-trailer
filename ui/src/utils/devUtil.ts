// Incase you wish to use debuggers, please use this instead
export function pauseApp(obj?: any){    
    if(process.env.NODE_ENV !== 'production'){
        debugger
        console.log("obj: ",obj)
    }
}