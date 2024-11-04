import bcrypt from 'bcrypt'
import { validateEmail, validateMinLength, validateString } from "../helpers/validations.js"
import ResponseBuilder from "../helpers/builders/ResponseBuilder.js"
import User from "../model/User.model.js"
import emailTransporter from "../helpers/emailTransporter.helper.js"
import jwt from 'jsonwebtoken'
import ENVIROMENT from '../config/enviroment.js'

export const registerController = async (req, res) => {
    try {
        const { email, name, password } = req.body
        const datosRecibidos = {
            email: {
                value: email,
                validations: [
                    validateEmail
                ]
            },
            password: {
                value: password,
                validations: [
                    validateMinLength,
                    validateString
                ]
            },
            name: {
                value: name,
                validations: [
                    validateMinLength, //Preguntar a mati si la refactorización de esta función (de callback a referencia) está bien
                    validateString
                ]
            }
        }

        const errores = {
            name: [],
            password: [],
            email: [],
            hayErrores: false
        }

        for (let field_name in datosRecibidos) {
            for (let validation of datosRecibidos[field_name].validations) {
                let validationResult = validation(field_name, datosRecibidos[field_name].value)
                if (validationResult) {
                    errores[field_name].push(validationResult)
                    errores.hayErrores = true
                }
            }
        }

        if (errores.hayErrores) {
            throw errores
        }

        const passwordHash = await bcrypt.hash(password, 10)

        let usuarioNuevo = new User({
            name: name,
            password: passwordHash,
            email: email
        })

        await usuarioNuevo.save()

        const validationToken = jwt.sign(
            {
                email: email
            },
            ENVIROMENT.SECRET_KEY,
            {
                expiresIn: '1d'
            }
        )
        await emailTransporter.sendMail({
            to: email,
            subject: 'Verifica tu email',
            html: `<p>Para validar su email haga click <a href="http://localhost:7000/api/auth/validate-email/${validationToken}">aquí</a></p>`
        })

        const successResponse = new ResponseBuilder()
            .setOk(true)
            .setStatus(200)
            .setCode('REGISTER_SUCCESS')
            .setMessage('El registro se completo con éxito.')
            .setPayload({
                datosUsuario: {
                    name: name,
                    password: passwordHash,
                    email: email
                }
            })
            .build()

        return res.json(successResponse)
    }
    catch (error) {

        if (error.hayErrores) {
            const response = new ResponseBuilder()
                .setCode("VALIDATION_ERROR")
                .setMessage('Los datos ingresados no cumplen los parámetros solicidatos')
                .setOk(false)
                .setStatus(200)
                .setPayload(error)
                .build()



            return res.json(response)
        }

        if (error.code === 11000) {
            const response = new ResponseBuilder()
                .setCode('DUPLICATED_EMAIL')
                .setOk(false)
                .setStatus(400)
                .setMessage("El email ingresado ya se encuentra registrado")
                .setPayload()
                .build()

                console.log(response)

            return res.json(response)
        }

        console.log(error)

    }
}

export const validateEmailController = async (req, res) => { //Preguntar a mati como se manejan las validaciones de token de mail, si desde el front o desde el back. También si se pueden hacer consultas a la base de datos desde el front.
    try {
        const { validationToken } = req.params

        const { email } = jwt.verify(validationToken, ENVIROMENT.SECRET_KEY)

        const usuarioEncontrado = await User.findOne({ email: email }) //Preguntar a mati sobre la nomenclatura al llamar la variable que contiene el usuario cuando hacemos la consulta a la base de datos

        if (usuarioEncontrado.emailValidate) {
            throw {
                email: email,
                code: 'EMAIL_VALIDATED_ALREADY'
            } //Preguntar a mati cual es la mejor manera de throwear errores
        }

        usuarioEncontrado.emailValidate = true

        await usuarioEncontrado.save()

        const respuesta = new ResponseBuilder()
            .setCode('VALIDATION_SUCCESS')
            .setOk(true)
            .setMessage('El usuario fue validado con éxito.')
            .setPayload({
                emailValidado: email
            })
            .setStatus(200)
            .build()

        return res.json(respuesta)
    }
    catch (error) {
        if (error.code === 'EMAIL_VALIDATED_ALREADY') {
            const response = new ResponseBuilder()
                .setOk(false) //Preguntar a mati si el ok pertenece a la consulta o al estado de la respuesta
                .setStatus(400)
                .setMessage('El email del usuario ya fue validado')
                .setCode(error.code)
                .setPayload(error)
                .build()

            return res.json(response)
        }
    }
}


export const loginController = async (req, res) => {
    try{
        const { email, password } = req.body

        const usuarioEncontrado = await User.findOne({
            email: email
        })

        if(!usuarioEncontrado){
            throw {
                message: 'El email ingresado no pertenece a ningún usuario.',
                code: 'UNKNOWN_EMAIL'
            }
        }
        if(!(await bcrypt.compare(password, usuarioEncontrado.password))){
            throw {
                message: 'El password ingresado es incorrecto',
                code: 'PASSWORD_DOES_NOT_MATCH'
            }
        }

        const responseSuccess = new ResponseBuilder()
        .setOk(true)
        .setStatus(200)
        .setCode('LOGIN_SUCCESS')
        .setMessage('Inicio de sesión exitoso')
        .setPayload({
            bienvenida: `Bienvenido de nuevo, ${usuarioEncontrado.name}!`
        })
        .build()

    
        return res.send(responseSuccess)
    }
    catch(error){

        const { code, message } = error

        const responseError = new ResponseBuilder()
        .setStatus(400)
        .setCode(code)
        .setMessage(message)
        .setOk(false)
        .build()

        return res.json(responseError)
    }
}






