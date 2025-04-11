import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import generateToken from '../lib/utils.js'
import cloudinary from '../lib/cloudinary.js'
export const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' })
        }

        if (password.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters' })
        }

        if (!email.includes('@')) {
            return res.status(400).json({ message: 'Invalid email format' })
        }

        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({ name, email, password: hashedPassword })
        await newUser.save()

        generateToken(newUser._id, res)

        res.status(201).json({
            message: 'User created successfully',
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            profilePic: newUser.profilePic
        })
    } catch (error) {
        console.log('Signup error:', error.message)
        res.status(500).json({ message: 'Server error' })
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body
    try {
        if (!email || !password) {
            return res.status(400).json({ message: 'All fields are required' })
        }

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: 'User not found' })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' })
        }

        generateToken(user._id, res)

        res.status(200).json({
            message: 'User logged in successfully',
            _id: user._id,
            name: user.name,
            email: user.email,
            profilePic: user.profilePic
        })

    } catch (error) {
        console.log('Login error:', error.message)
        res.status(500).json({ message: 'Server error' })
    }
}

export const logout = (req, res) => {
    try {
        res.clearCookie('jwt', "" , {maxAge :0})
        res.status(200).json({ message: 'User logged out successfully' })
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message })
    }
}

export const update = async (req, res) => {
    try {
      const { profilePic } = req.body;
      const userId = req.user._id;
      if (!profilePic) {
        return res.status(400).json({ message: "Profile pic is required" });
      }
  
      const uploadResponse = await cloudinary.uploader.upload(profilePic);
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { profilePic: uploadResponse.secure_url },
        { new: true }
      );
  
      res.status(200).json(updatedUser);
    } catch (error) {
      console.log("error in update profile:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

export const checkAuth = async (req, res) => {
    try {
        res.status(200).json(req.user)
    } catch (error) {
        res.status(500).json({ message: 'Server error' })
    }
}
