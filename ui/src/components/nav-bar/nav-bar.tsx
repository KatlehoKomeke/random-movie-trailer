import React from 'react'
import './nav-bar.scss'
import logo from './../../assets/Logo.svg'
import backBtn from './../../assets/back_btn.svg'
import menuBtn from './../../assets/menu_btn.svg'
import { Link } from 'react-router-dom';
import { NavBarOptions } from './../../types/types'

function NavBar(props: NavBarOptions) {
  return (
    <div className='nav-bar-conainer'>
      { 
        props.showLogo
        ?
          <Link to={props.redirectURL ?? "/"}>
            <img src={logo} className='logo' alt='logo'></img>
          </Link>
        : null
      }
      { 
        props.showSignIn
        ?
          <Link to="/sign-in" className='Link'>
            <div className='sign-in_btn'>
              sign-in
            </div>
          </Link>
        : null
      }
      { 
        props.showBackBtn
        ?
          <Link to="/">
            <img src={backBtn} className='backBtn' alt='back button'></img>
          </Link>
        : null
      }
      { 
        props.showMenuBtn
        ?
          <Link to="/menu">
            <img src={menuBtn} className='menuBtn' alt='menu button'></img>
          </Link>
        : null
      }
    </div>
  );
}

export default NavBar;
