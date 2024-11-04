import express from 'express'
import {loginController, registerController, validateEmailController} from '../controllers/auth.controller.js'

const authRouter = express.Router()

authRouter.post('/register', registerController)
authRouter.get('/validate-email/:validationToken', validateEmailController)
authRouter.post('/login', loginController)




export default authRouter