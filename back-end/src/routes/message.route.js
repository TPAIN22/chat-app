import express from 'express'
import protectRoute from '../midleware/auth.midleware.js'
import { getUsers, getMessages, sendMessage } from '../controllers/message.contoller.js'

const router = express.Router()

// routes
router.get('/users', protectRoute, getUsers)
router.get('/chat/:id', protectRoute, getMessages)
router.post('/send/:id', protectRoute, sendMessage)

export default router
