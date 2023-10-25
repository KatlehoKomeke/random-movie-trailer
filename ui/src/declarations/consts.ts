import { TailSpinProps, contentsType } from "./types"

export const initTailSpin = {
    radius: '1',
    strokeWidth: '80',
    height: '80',
    width: '80',
    color: '#212020',
    ariaLabel: 'tail-spin-loading',
    wrapperStyle: {},
    wrapperClass: 'loader',
    visible: true
} as TailSpinProps 

export const URL_Redirect = {
    Home: '/',
    Content: '/content',
    SignIn: '/sign-in',
    Menu: '/menu',
    Error: '/error',
    Invalid: '*'
} as const

export const initResults = {
    adult: false,
    backdrop_path: "",
    genre_ids: [0],
    id: 0,
    original_language: "",
    original_title: "",
    overview: "",
    popularity: 0,
    poster_path: "",
    release_date: "",
    title: "",
    video: false,
    vote_average:0,
    vote_count: 0
} as const

export const initContents = {
    page: 0,
    results: [initResults],
    total_pages: 0,
    total_results: 0
} as unknown as contentsType

export const QueryParams = {
    id: '?id='
} as const

export const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': ''
} as const

export const HTTP_METHOD = {
    POST: 'POST',
    GET: 'GET'
} as const