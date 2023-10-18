// enums

export enum video_type {
    YouTube = "YouTube",
    Vimeo = "Vimeo"
}

export enum video_embed_link {
    YouTube = "https://www.youtube.com/embed/"
}

// types 

export type result = {
    adult: boolean,
    backdrop_path: string,
    genre_ids: number[],
    id: number,
    original_language: string,
    original_title: string,
    overview: string,
    popularity: number,
    poster_path: string,
    release_date: string,
    title: string,
    video: boolean,
    vote_average: number,
    vote_count: number
}

export type Contents = {
    page: number,
    results: result[],
    total_results: number,
    total_pages: number
} 

export type userBehaviour = {
    email: string,

}