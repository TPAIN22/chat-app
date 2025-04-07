import jwt from 'jsonwebtoken'
export const gentoken = (userId , res) => {
    const token = jwt.sign({userId}, process.env.JWT_SEC, {
        expiresIn: '5d'
    })
    res.cookie('jwt', token, {maxAge:5*24*60*60*1000,
     httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production'
})
    return token
}