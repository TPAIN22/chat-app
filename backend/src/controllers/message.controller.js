import User from "../models/user.model.js"
import Messages from "../models/message.model.js"
import cloudinary from "../lib/cloudinary.js"
import { io ,getUserSocketId } from "../lib/socket.js"
export const getUSersForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select('-password')
        res.status(200).json(filteredUsers)
    } catch (error) {
        console.log('error in message controller',error.message)
    }
}

import mongoose from 'mongoose';

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;

    const messages = await Messages.find({
      $or: [
        { senderId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: senderId }
      ]
    }).sort({ createdAt: 1 });
    res.status(200).json(messages);
  } catch (error) {
    console.log('error in message controller', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

export const sendMessage = async (req, res) => {
    try {
        const {message , image} = req.body
        const { id: receiverId } = req.params
        const senderId = req.user._id
        let imageUrl = ''
        if (image) {
            const res = await cloudinary.uploader.upload(image)

            imageUrl = res.secure_url
        }
        const newMessage = new Messages({ senderId,
             receiverId, 
             message, 
             image: imageUrl 
            })
        await newMessage.save()
        const receiverSocketId = getUserSocketId(receiverId)
        if (receiverSocketId) {
            io.to(receiverSocketId).emit('newMessage', newMessage)
        }

        res.status(200).json(newMessage)
    } catch (error) {
        console.log('error in message controller',error.message)
        res.status(500).json({ message: 'Server error' })
    }
}