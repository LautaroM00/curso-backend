import mongoose from 'mongoose'

mongoose.connect('mongodb://localhost:27017/PRIMER_PROYECTO_SOLO')
.then(() => {
    console.log('Conexión exitosa')
})
.catch(() => {
    console.log('Error de conexión')
})

export default mongoose