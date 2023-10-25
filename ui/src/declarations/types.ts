import { BaseProps } from "react-loader-spinner/dist/type";

export type contentType = {
    title: string;
    link: string;
}

export type NavBarOptions = {
    showLogo?: true;
    showSignIn?: true;
    showBackBtn?: true;
    showMenuBtn?: true;
    redirectURL?: string;
}

export type ContentProps = {
    image: string;
    title: string;
    id: number;
}

export type result = {
    adult?: boolean,
    backdrop_path: string,
    genre_ids?: number[],
    id: number,
    original_language?: string,
    original_title?: string,
    overview?: string,
    popularity?: number,
    poster_path?: string,
    release_date?: string,
    title: string,
    video?: false,
    vote_average?: number,
    vote_count?: number
}

export type contentsType = {
    page: number,
    results: result[],
    total_pages: number,
    total_results: number
}

export type TailSpinProps = {
    radius?: string | number;
    strokeWidth?: string | number;
} & BaseProps 

export type handleErrorsProp = {
    errorMessage:string|null,
    setErrorMessage:(value: React.SetStateAction<string>) => void,
    setCustomRedirect:(value: React.SetStateAction<string>) => void
}