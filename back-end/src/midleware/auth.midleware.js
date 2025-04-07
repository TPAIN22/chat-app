import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'

export const protectRoute = async (req, res, next) => {
    const token = req.cookies.jwt
    try {
        if (!token) {   
        return res.status(401).json({msg: 'no token found'})
        }
        const decoded = jwt.verify(token, process.env.JWT_SEC)
        if (!decoded) {   
        return res.status(401).json({msg: 'Unauthorized token not valid'})
        }

        const user = await User.findById(decoded.userId).select('-password')
        if (!user) {   
        return res.status(401).json({msg: 'Unauthorized user not found'})
        }
        req.user = user
        next()
    } catch (error) {
        console.log("error in protectRoute midleware",error)
        res.status(401).json({msg: 'error in auth middleware'})
    }
}
export default protectRoute