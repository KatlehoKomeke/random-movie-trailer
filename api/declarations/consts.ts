export const HTTP_METHOD = {
    POST: 'post',
    GET: 'get'
} as const 

export const axios_response = {
    json: 'json'
} as const

export const site = {
    YouTube: "YouTube",
    Vimeo: "Vimeo"
} as const

export const video_embed_link = {
    YouTube: "https://www.youtube.com/embed/"
} as const

export const whitelist_origin = {
    'https://random-movie-trailer.com': true,
    'https://www.random-movie-trailer.com': true
    //'https://us-east-1.console.aws.amazon.com': true // if on staging environment
    //'http://localhost:3000': true // if on staging environment
} as const

export const watchlist = {
    minimumSize: 0
} as const

export const exceptions_list = {
    deleteWatchlist: 'could not delete watchlist',
    getContent: 'could not get content',
    getTitle: 'could not get title',
    getLink: 'could not get link',
    updateWatchlist: 'could not update watchlist',

    userBehaviourExists: 'could not verify that the user behaviour exists',
    updateUserWatchlist: 'could not update watchlist',
    addUserBehaviour: 'could not add user behaviour',
    handler: 'invalid request'
} as const

export const initContent = {
    page: 0,
    results: [ {
        adult: false,
        backdrop_path: '',
        genre_ids: [0],
        id: 0,
        original_language: '',
        original_title: '',
        overview: '',
        popularity: 0,
        poster_path: '',
        release_date: '',
        title: '',
        video: true,
        vote_average: 0,
        vote_count: 0
    }],
    total_pages: 0,
    total_results: 0
}

export const axiosConfig = {
    method: HTTP_METHOD.GET,
    responseType: axios_response.json
}