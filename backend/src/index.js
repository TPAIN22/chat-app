import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import cors from "cors"
import path from "path"
import { connect } from "./lib/db.js"
import authRoute from "./routes/auth.route.js"
import messageRoute from "./routes/message.route.js"
import { app , server} from "./lib/socket.js"
dotenv.config()
const PORT = process.env.PORT
const __dirname = path.resolve()

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser())

app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true
}))

// Routes
app.use("/api/auth", authRoute)
app.use("/api/message", messageRoute)


if (process.env.NODE_ENV === "production") {
    // خدمة الملفات الثابتة من مجلد dist
    app.use(express.static(path.join(__dirname, "../frontend/dist")));
  
    // التعامل مع جميع المسارات المتبقية (بدلاً من app.get("*"))
    app.use((req, res) => {
      res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    });
}
server.listen(PORT, () => {
    console.log(`🚀 Server listening on port ${PORT}`)
    connect()
})
