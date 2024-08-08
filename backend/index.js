import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import databaseConnection from "./config/database.js";
import userRoute from "./routes/userRoute.js"
import tweetRoute from "./routes/tweetRoute.js"
import cors from "cors";
dotenv.config({
    path:".env"
})
databaseConnection();
const app=express();

//middlewear

app.use(express.urlencoded({
    extended:true
}));
app.use(express.json());
app.use(cookieParser());
const corsOptions={
    origin:"http://localhost:5173",
    credentials:true
}
app.use(cors(corsOptions));
//route
app.use("/api/v1/user", userRoute);
app.use("/api/v1/tweet", tweetRoute)


app.listen(process.env.PORT,()=>{
    console.log(`server listining at port ${process.env.PORT}`);
})