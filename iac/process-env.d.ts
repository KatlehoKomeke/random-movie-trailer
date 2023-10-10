// Indicating that this file is a module
export {};

// Adding types to process.env
declare global {
    namespace NodeJS {
        interface ProcessEnv {
            [key: string]: string | undefined;
            aws_region: string;

            user_pool: string;
            user_pool_client: string;
            user_pool_password_min_length: string;

            api_graphql: string;
            api_graphql_schema_path: string;
            api_key_expiration: string;

            main_lambda_handler: string;
            main_handler: string;
            main_handler_dirname: string;
            lambda_size: string;

            main_lambdaDS: string;
            get_content_by_id_resolver: string;
            get_content_by_id: string;

            user_behaviour_table: string;
            user_behaviour_table_partition_key: string;

            s3_bucket: string;
            website_entrypoint: string;
            frontend_path: string;

            s3_deployment: string;
            cloudfront_distribution: string;
        }
    }
}