import User from '../models/user.model.js'
import Message from '../models/message.model.js'
import cloudinary from '../lib/cloud.js'
import { getResponseSocket , io } from '../lib/socket.js'



export const getUsers = async (req, res) => {
    try {
        const loggedInUser = req.user._id
        const filteredUsers = await User.find({ _id: { $ne: loggedInUser } }).select('-password')

        res.status(200).json(filteredUsers)
    } catch (error) {
        console.log("error in messages controler",error.message)
        res.status(500).json({ msg: 'internal Server error' })
    }
}

export const getMessages = async (req, res) => {
    try {
        const { id } = req.params
        const myId = req.user._id
        const messages = await Message.find({
            $or: [
                { myId: myId, receiverId: id },
                { myId: id, receiverId: myId }
       ] })
       res.status(200).json(messages)

    } catch (error) {
        console.log("error in messages controler",error.message)
        res.status(500).json({ msg: 'internal Server error' })
    }
}


export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const myId = req.user._id;

    let imageUrl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = await Message.create({
      myId,
      receiverId,
      text,
      image: imageUrl,
    });

    // ما يحتاج save() مرة ثانية بعد create()

    // إرسال للمستلم إذا كان متصل
    const receiverSocketId = getResponseSocket(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit('newMessage', newMessage);
    }

    // إرسال للمرسل أيضًا لو احتاج يشوف رسالته على طول (خصوصًا لو تأخرت صورة)
    const senderSocketId = getResponseSocket(myId);
    if (senderSocketId && senderSocketId !== receiverSocketId) {
      io.to(senderSocketId).emit('newMessage', newMessage);
    }

    res.status(200).json(newMessage);
  } catch (error) {
    console.log('error in messages controller', error.message);
    res.status(500).json({ msg: 'Internal Server Error' });
  }
};
