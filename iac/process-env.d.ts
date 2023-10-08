// Indicating that this file is a module
export {};

// Adding types to process.env
declare global {
    namespace NodeJS {
        interface ProcessEnv {
            [key: string]: string | undefined;
            aws_region: string;

            user_pool:string;
            user_pool_client: string;
            user_pool_password_min_length: string;

            api_graphql: string;
            api_graphql_schema_path: string;
            api_key_expiration: string;

            signUp_lambda_id: string;
            signUp_lambda_path: string;
            login_lambda: string;
            lambda_size: string;

            user_table: string;
            user_table_partition_key: string;

            s3_bucket: string;
            website_entrypoint: string;
            frontend_path: string;

            s3_deployment:string;
            cloudfront_distribution:string;
        }
    }
}