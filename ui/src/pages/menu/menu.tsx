import React from 'react'
import './menu.scss'

import NavBar from '../../components/nav-bar/nav-bar'

function Menu() {
    return (
        <div className='menu-container'>
            <NavBar showBackBtn={true}/>
            <div className='menu-btn'>logout</div>  
            <div className='menu-btn'>delete</div>           
        </div>
    )
}

export default Menu;
