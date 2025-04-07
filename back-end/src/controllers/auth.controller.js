import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import { gentoken } from '../lib/utils.js'
import cloudinary from '../lib/cloud.js'
export const signup = async (req, res) => {
    const { email, password, name } = req.body
    try {
        if (!email || !password || !name) {
            return res.status(400).json({msg: 'Please enter all fields'})
        }
       //hash the password
       if (password.length < 6 ) {
           return res.status(400).json({msg: 'Password should be at least 6 characters long'})
       }
       const user = await User.findOne({email})
    if (user) {
        return res.status(400).json({msg: 'User already exists'})
    }
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)

    const newUser = new User({
        name,
        email,
        password: hashPassword  
    })
    if (newUser) {
        gentoken(newUser._id, res)
        await newUser.save()
        res.status(201).json({msg: 'User created successfully'})
    
    }
    else {
        return res.status(400).json({msg: 'Invalid user data'})
    }

    } catch (error) {
        console.log("error in signup controler",error)
        res.statud(500).json({msg: 'internal Server error'})
    }
}

//////////////////////log in //////////////////


export const login = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({email})
        if (!user) {
            return res.status(400).json({msg: 'invalid username or password'})
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({msg: 'invalid username or password'})
        }
        gentoken(user._id, res)
        return res.status(200).json({msg: 'User logged in successfully'})
    } catch (error) {
        console.log("error in login controler",error)
        res.status(500).json({msg: 'internal Server error'})
    }

}

///////////////////logout////////////////////
export const logout = (req, res) => {
    try {
        res.cookie('jwt', '', {maxAge: 0});
        res.status(200).json({msg: 'User logged out successfully'})
    } catch (error) {
        console.log("error in logout controler",error)
        res.cookie('jwt', '', {maxAge: 0});
    }
}

export const update = async (req, res) => {
    try {
        const { avatar } = req.body;
        const userId = req.user._id;

        if (!avatar) {
            return res.status(400).json({ msg: 'avatar is required' });
        }

        const uploadResponse = await cloudinary.uploader.upload(avatar);

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { avatar: uploadResponse.secure_url },
            { new: true }
        );

        res.status(200).json(updatedUser);
    } catch (error) {
        console.log("error in update controller", error);
        res.sendStatus(500);
    }
};


export const checkAuth = (req, res) => {
    try {
        res.status(200).json(req.user)
    } catch (error) {
        console.log("error in checkAuth controler",error)
        res.sendStatus(500).json({msg: 'internal Server error in authcheck'})
    }
}   