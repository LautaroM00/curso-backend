import jwt from 'jsonwebtoken'
import ENVIROMENT from '../config/enviroment.js'

const authMiddleware = (allowedRoles) => {
    return (req, res, next) => {
        const accessToken = req.headers.authorization.split(' ')[1]
        
        const userData = jwt.verify(accessToken, ENVIROMENT.SECRET_KEY)

        const { name, email, role } = userData

        if(!allowedRoles.includes(role)){
            return res.send(`El usuario ${name} cuyo mail es ${email} no tiene autorización debido a que su rol es ${role} y necesita jerarquía de admin`)
        }

        return next()
    }

}

export default authMiddleware