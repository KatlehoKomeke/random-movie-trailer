import { site } from "./consts"

export type Content = {
    title:string,
    link:string
}

export type userBehaviour = {
    email: string,
    createdAt: string,
    lastUpdate: string,
    watchlist: number[]
}

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

export type GetWatchlistResponse = {
    watchlist:number[]
}

export type WatchlistMutationResponse = {
    isSuccessful: boolean
}

export type siteType = (typeof site)[keyof typeof site]