import express from 'express'
import authRoutes from './routes/auth.route.js'
import messageRoutes from './routes/message.route.js'
import connectDB from './lib/db.js'
import dotenv from "dotenv"
import cookieParser from 'cookie-parser'
import cors from "cors"
import { app , server } from './lib/socket.js'
import path from 'path'

dotenv.config()
const __dirname = path.resolve()
const port = process.env.PORT
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
}
))

app.use("/api/auth" , authRoutes)
app.use("/api/message" , messageRoutes)

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname , '../front-end/dist')))
    app.get('/*', (req, res) => {
        res.sendFile(path.join(__dirname , '../front-end/dist/index.html'))
    })
}    
server.listen(port, () => {
    console.log('Server is running on port' + port)
    connectDB()
})
