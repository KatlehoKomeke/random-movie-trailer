export function forceHttps(){
    // eslint-disable-next-line no-restricted-globals
    if (process.env.NODE_ENV === 'production' && location.protocol !== "https:") {
        // eslint-disable-next-line no-restricted-globals
        location.protocol = "https:";
    }
}