// Indicating that this file is a module
export {};

// Adding types to process.env
declare global {
    namespace NodeJS {
        interface ProcessEnv {
            [key: string]: string | undefined;
            REACT_APP_aws_region: string;
            REACT_APP_user_pool_id: string;
            REACT_APP_user_pool_web_client_id: string;
            REACT_APP_appsync_api_key: string;
        }
    }
}