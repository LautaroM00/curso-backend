const errorHandlerMiddleware = (err, req, res, next) => {
    console.log(err.validationErrors)
    //Como no todos los errores de la app van a tener status_code o status entonces en caso de no haber asumimos que es un error de servidor
    err.status_code = err.status_code || 500
    err.status = err.status || 'error'
    if(err.validationErrors){
        return res.json({
            status: err.status,
            message: err.message,
            validationErrors: err.validationErrors
        })
    }

    if(err.is_operational){
        return res.json({
            status: err.status,
            message: err.message
        })
    }

    console.error('ERROR: 😢🔴', err)

    return res.status(500).json({
        status: 'error',
        message: 'Algo anda muy mal aqui...'
    })
}

export default errorHandlerMiddleware