const testMiddleware = (req, res, next) => {
    const numero = Math.round(Math.random() * 10) 
    console.log(req.headers)
    if(numero > 5){
        next()
    }else{
        res.send({
            luck: 'unlucky!',
            numero: numero
        })
    }
}

export default testMiddleware