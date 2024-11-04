import nodemailer from 'nodemailer'
import dotenv from 'dotenv'


dotenv.config()

const { EMAIL_USER, EMAIL_PASSWORD, SECRET_KEY } = process.env

const ENVIROMENT = {
    EMAIL_USER: EMAIL_USER,
    EMAIL_PASSWORD: EMAIL_PASSWORD,
    SECRET_KEY: SECRET_KEY
}

export default ENVIROMENT