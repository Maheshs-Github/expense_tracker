import express from "express";
import dotenv from "dotenv"
import cors from "cors"
import { connectDB } from "./db/index.js";
import expencesRoutes from "./routes/expences.route.js"


const app=express();
dotenv.config();

app.use(express.json());

// const allowedOrigins = [
//   // "http://localhost:5173",
//   process.env.ORIGIN,
// ];


// const corsOptions={
//   origin:allowedOrigins,
//   methods:["GET","POST","DELETE"]
// }
//  app.use(cors(corsOptions))
app.use(cors())

 connectDB()
 .then(()=>{
   console.log("DB Connected Successfully");
  //  const port = process.env.PORT || 7000;
   app.listen(`${process.env.PORT}`, () => console.log(`Listening from the Port ${process.env.PORT}`))
 })
 .catch((err)=>{
  console.log("Error while Connceting... ",err);
 })

 app.use("/api/v1/expences",expencesRoutes)
