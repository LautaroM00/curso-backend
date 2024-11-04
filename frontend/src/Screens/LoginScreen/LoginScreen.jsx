import React from 'react'
import BloqueInputLabel from '../../Components/BloqueInputLabel/BloqueInputLabel'
import { useNavigate } from 'react-router-dom'

const LoginScreen = () => {
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()
        
        const loginData = new FormData(e.target)

        const formData = {
            email: loginData.get('email'),
            password: loginData.get('password')
        }

        const URL_POST_LOGIN = 'http://localhost:7000/api/auth/login'

        await fetch(URL_POST_LOGIN, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(formData)
        })
        .then(async (res) => {
            console.clear()
            
            const response = await res.json()

            console.log(response)

            setTimeout(() => {
                if(response.code === 'LOGIN_SUCCESS'){
                    return navigate('/sos-groso-sabelo')
                }
            },
        3000)
        })



    }
    return (
        <form onSubmit={handleSubmit}>
            <BloqueInputLabel forIdName={'email'} label={'Email:'} />
            <BloqueInputLabel forIdName={'password'} label={'Password:'} />
            <button type='submit' >Iniciar sesión</button>
        </form>
    )
}

export default LoginScreen