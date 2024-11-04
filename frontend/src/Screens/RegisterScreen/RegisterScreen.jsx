import React from 'react'
import { BloqueInputLabel } from '../index'
import './RegisterScreen.css'
import { useNavigate } from 'react-router-dom'



const RegisterScreen = () => {
    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault()

        const domForm = new FormData(event.target)

        const formData = {
            email: domForm.get('email'),
            name: domForm.get('name'),
            password: domForm.get('password')
        }

        const URL_POST_REGISTER = 'http://localhost:7000/api/auth/register'

        const res = await fetch(URL_POST_REGISTER, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(formData)
        })

        const response = await res.json()

        console.log(response)


        setTimeout(() => {
            if(response.code === 'REGISTER_SUCCESS'){
                return navigate('/login')
            }
            return
        },
    3000)

    }

    return (
        <form onSubmit={handleSubmit}>
            <BloqueInputLabel forIdName={'name'} label={'Nombre:'} />
            <BloqueInputLabel forIdName={'email'} label={'Email:'} />
            <BloqueInputLabel forIdName={'password'} label={'Password:'} />
            <button type='submit' >Registrarse</button>
        </form>
    )

}

export default RegisterScreen