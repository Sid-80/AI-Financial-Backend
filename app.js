import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import AuthRoutes from "./Routes/AuthRoutes.js"
import ChatRoutes from "./Routes/ChatRoutes.js"
import RetireFileRoutes from "./Routes/RetireRoutes.js"
import GoalRoutes from "./Routes/GoalRoutes.js"

dotenv.config({
  path: "./.env",
});

const app = express();
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

// DB Connection
try {
    const connectionInstance = await mongoose.connect(`${process.env.MONGO_URL}`,{family:4})
    console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
} catch (error) {
    console.log("MONGODB connection FAILED ", error);
    process.exit(1)
}

app.listen(5000, () => console.log("Running!"));

app.use("/api/v1/user",AuthRoutes)
app.use("/api/v1/chat",ChatRoutes)
app.use("/api/v1/retire",RetireFileRoutes)
app.use('/api/v1/goals', GoalRoutes);