import React from 'react'
import { NavLink } from 'react-router-dom'
import './HomeScreen.css'

const HomeScreen = () => {
    return (
        <div className='linksContainer'>
            <NavLink to={'/register'}>Ir a register</NavLink>
            <NavLink to={'/login'}>Ir a login</NavLink>
            <NavLink to={'/validate-email'}>Ir a validate-email</NavLink>
            <NavLink to={'/forgot-password'}>Olvidé mi contraseña</NavLink>
        </div>
    )
}

export default HomeScreen