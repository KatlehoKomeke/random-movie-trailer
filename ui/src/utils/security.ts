export function forceHttps(){
    if (process.env.NODE_ENV === 'production' && window.location.protocol !== "https:") {
        window.location.protocol = "https:";
    }
}