import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

import router from "./routes/index.js";

const app = express();

// connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/gemini" );
if (mongoose.connection) {
  console.log("Database connected successfully");
} else {
  console.log("Database connection failed");
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS
// const allowedOrigins = ["http://localhost:3000", "https://shop-bb.vercel.app"];

// const corsOptions = {
//   origin: function (origin, callback) {
//     if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//   credentials: true,
//   optionsSuccessStatus: 204,
// };

// app.use(cors(corsOptions));
app.use(cors());

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

// use the router
app.use("/", router);

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
