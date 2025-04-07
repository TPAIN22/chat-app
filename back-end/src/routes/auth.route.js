import express from 'express'
import protectRoute from '../midleware/auth.midleware.js'

import { signup, login, logout ,checkAuth, update } from '../controllers/auth.controller.js';

const router = express.Router()

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.put('/update', protectRoute ,update);   
router.get("/check", protectRoute, checkAuth)

export default router;