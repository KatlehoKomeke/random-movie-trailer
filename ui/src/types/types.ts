export type contentType = {
    title: string;
    link: string;
}

export type NavBarOptions = {
    showLogo?: true;
    showSignIn?: true;
    showBackBtn?: true;
}

export type ContentProps = {
    image: string;
    title: string;
    id: number;
}

export enum URL_Redirect {
    Home = '/',
    Content = '/content',
    SignIn = '/sign-in',
    Menu = 'Menu'
}

export enum QueryParams {
    id = '?id='
}

type result = {
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
    video: false,
    vote_average: number,
    vote_count: number
}

export type contentsType = {
    page: number,
    results: result[],
    total_pages: number,
    total_results: number
}

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
}