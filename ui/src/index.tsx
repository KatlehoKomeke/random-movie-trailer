import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import reportWebVitals from './reportWebVitals'
import LandingPage from './pages/landing-page/landing-page'
import SignIn from './pages/sign-in/sign-in'
import { Amplify, Auth } from 'aws-amplify'
import Content from './pages/content/content'
import { URL_Redirect } from './declarations/consts'
import Menu from './pages/menu/menu'
import { forceHttps } from './utils/security'
import Error from './pages/error/error'

forceHttps()

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

Amplify.configure({
  Auth: {
    region: process.env.REACT_APP_aws_region!,
    userPoolId: process.env.REACT_APP_user_pool_id!,
    userPoolWebClientId: process.env.REACT_APP_user_pool_web_client_id!
  }
})

Auth.configure()

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path={URL_Redirect.Home} element={<LandingPage />} />
        <Route path={URL_Redirect.SignIn} element={<SignIn />} />
        <Route path={URL_Redirect.Content} element={<Content />} />
        <Route path={URL_Redirect.Menu} element={<Menu />} />
        <Route path={URL_Redirect.Invalid} element={<Error/>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
