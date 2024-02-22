import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import morgan from "morgan";
import cors from "cors";
import cookieParser from 'cookie-parser';
import session from 'express-session'
// const QRCode = require('qrcode');
dotenv.config()
import {userRouter} from './routes/User.js'
import {profileRouter} from './routes/Profile.js'
const app = express()

app.use(morgan("dev"));
app.use(cors(
    {
        origin:["http://localhost:5173"],
        credentials: true
    }
));

app.use(express.json());
app.use(cookieParser())

app.use(session({
    secret: 'mySecret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }));

  
app.use('/auth', userRouter)
app.use('/product', profileRouter)



// db
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(()=> console.log("DB CONNECTED"))
.catch((err)=> console.log("DB CONNECTION ERROR", err));



app.listen(process.env.PORT, ()=>{
    console.log("Server is running")
})