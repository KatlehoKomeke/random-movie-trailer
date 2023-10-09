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