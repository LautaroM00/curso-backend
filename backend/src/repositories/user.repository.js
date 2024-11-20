import User from "../model/User.model.js";
import bcrypt from 'bcrypt'

class UserRepository {

    static async createUser(userData){
        userData.password = await bcrypt.hash(userData.password, 10)

        const newUser = new User(userData)
        return newUser.save()
    }

    static async resetPassword(email, newPassword){
        const usuarioEncontrado = await User.findOne({
            email: email
        })

        const passwordHash = await bcrypt.hash(newPassword,10)

        usuarioEncontrado.password = passwordHash

        return await usuarioEncontrado.save()
    }

    static async deleteUser(email){
        return User.findOneAndDelete({
            email: email
        })
    }
    
    static async getUserByEmail(email){
        const userGotten = await User.findOne({
            email: email
        })

        return userGotten
    }
    
}

export default UserRepository