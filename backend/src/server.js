import express, { urlencoded } from 'express'
import authRouter from './routes/auth.route.js'
import mongoose from './config/db.config.js'
import dotenv from 'dotenv'
import cors from 'cors'



const app = express()
const PORT = 7000

app.use(cors())
app.use(express.json())

app.listen(PORT, () => {
    console.log(`El servidor está funcionando en la dirección http://localhost:${PORT}`)
})




app.use('/api/auth', authRouter)

