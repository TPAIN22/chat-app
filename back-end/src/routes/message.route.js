 import express from 'express'
import protectRoute from '../midleware/auth.midleware.js'
import { getUsers,getMessages ,sendMessage} from '../controllers/message.contoller.js'

 const router = express.Router()

 router.get('/users',protectRoute , getUsers) 
 router.get('/:id',protectRoute , getMessages) 
 router.post('/send/:id',protectRoute ,sendMessage)

 export default router