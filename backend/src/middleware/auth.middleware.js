import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'

export const protect = async (req, res, next) => {
    const token = req.cookies.jwt
    try {
        if(!token) {
            console.log('token not found')
            return res.status(401).json({ message: 'Unauthorized' })
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if(!decoded) {
            return res.status(401).json({ message: 'invalid token' })
            console.log('invalid token')
        }

        const user = await User.findById(decoded.userId).select('-password')
        if(!user) {
            return res.status(404).json({ message: 'user not found' })
            console.log('user not found')
        }
        req.user = user
        next()
    } catch (error) {
        res.status(500).json({ message: 'Server error' })
        console.log(error, 'error in auth middleware')
    }
}