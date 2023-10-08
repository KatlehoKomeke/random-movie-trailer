// Indicating that this file is a module
export {};

// Adding types to process.env
declare global {
    namespace NodeJS {
        interface ProcessEnv {
            [key: string]: string | undefined;
            aws_region: string;
            user_pool_id: string;
            user_pool_web_client_id: string;
        }
    }
}