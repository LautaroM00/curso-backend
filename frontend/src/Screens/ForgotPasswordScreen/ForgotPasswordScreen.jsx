import React from 'react'
import BloqueInputLabel from '../../Components/BloqueInputLabel/BloqueInputLabel'
import { useState } from 'react'

const ForgotPasswordScreen = () => {

const [ form, formState ] = useState({
    email: ''
})

    const handleOnChange = (e) => {
        const key = e.target.name
        const value = e.target.value

        formState((prevForm) => {
            return {...prevForm, [key]: value}
        })
        
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const email = e.target[0].value

        const URL_BACKEND_POST_FORGOT_PASSWORD = 'http://localhost:7000/api/auth/forgot-password'

        const response = await fetch(URL_BACKEND_POST_FORGOT_PASSWORD, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                email: email
            })
        })

        console.log(await response.json())
    }

    return (
        <>
            <h1>Olvidé mi contraseñá</h1>
            <p>Ingrese su email para que le sea enviado un correo con el link de reestablecimiento de contraseña</p>
            <form onSubmit={handleSubmit}>
                <BloqueInputLabel forIdName='email' label='Ingrese email: ' onChange={handleOnChange}/>
                <button type='submit'>Enviar email de recuperacion</button>
            </form>
        </>
    )
}

export default ForgotPasswordScreen