import React from 'react'
import { BloqueInputLabel } from '../index'
import './RegisterScreen.css'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import useForm from '../../Hooks/useForm'



const RegisterScreen = () => {
    const initialFormState = {
        password: '',
        name: '',
        email: ''
    }

    const { formState, handleChange } = useForm(initialFormState)

    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault()

        const URL_POST_REGISTER = 'http://localhost:7000/api/auth/register'

        const res = await fetch(URL_POST_REGISTER, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(formState)
        })

        const response = await res.json()

        console.log(response)


        setTimeout(() => {
/*             if (response.code === 'REGISTER_SUCCESS') {
                return navigate('/login')
            } */
            return
        },
            3000)

    }

    const formScheme = [
        {
            labelText: 'Ingrese su nombre: ',
            labelProps: {
                htmlFor: 'name'
            },
            fieldStructure: {
                type: 'input',
                id: 'name',
                name: 'name',
                onChange: handleChange
            }
        },
        {
            labelText: 'Ingrese su contraseña: ',
            labelProps: {
                htmlFor: 'password'
            },
            fieldStructure: {
                type: 'password',
                id: 'password',
                name: 'password',
                onChange: handleChange
            }
        },
        {
            labelText: 'Ingrese su email: ',
            labelProps: {
                htmlFor: 'email'
            },
            fieldStructure: {
                type: 'email',
                id: 'email',
                name: 'email',
                onChange: handleChange
            }
        },
    ]

    return (
        <form onSubmit={handleSubmit}>
            <FieldList formScheme={formScheme}/>
            <button type='submit' >Registrarse</button>
            <NavLink to='/login'>Ya estoy registrado</NavLink>
        </form>
    )

}

const FieldList = ({ formScheme }) => {
    return(
        formScheme.map((block, index) => {
            const {labelText, labelProps, fieldStructure} = block
    
            return (
                <div key={index}>
                    <label {...labelProps}>{labelText}</label>
                    <input {...fieldStructure} />
                </div>
            )
        })
    )

}

export default RegisterScreen