import React from 'react'
import { NavLink } from 'react-router-dom'
import './HomeScreen.css'

const HomeScreen = () => {
    return (
        <div className='linksContainer'>
            <NavLink to={'/register'}>Ir a register</NavLink>
            <NavLink to={'/login'}>Ir a login</NavLink>
            <NavLink to={'/validate-email'}>Ir a validate-email</NavLink>
        </div>
    )
}

export default HomeScreen