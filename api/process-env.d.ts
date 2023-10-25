// Indicating that this file is a module
export {};

// Adding types to process.env
declare global {
    namespace NodeJS {
        interface ProcessEnv {
            [key: string]: string | undefined;
            user_table: string;
            tmdb_api_key: string;
            tmbd_get_content_by_id_url: string;
            tmbd_get_content_by_id_query_params: string;
            tmbd_get_content_by_id_video_params: string;
        }
    }
}