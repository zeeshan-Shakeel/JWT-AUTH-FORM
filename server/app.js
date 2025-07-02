import express from 'express';
import dotenv from 'dotenv';
import connectDb from './config/mongodb.js';
import cors from 'cors'
import router from './routes/authRoute.js'
import userProtect from './routes/userProtect.js'
const app = express();
dotenv.config(); // Load env variables
connectDb();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({credentials:true}));

const port = process.env.PORT || 4000;


app.use("/api",router)
app.use("/hy",userProtect)
app.listen(port, () => {
  console.log(`✅ Server is running on port ${port}`);
});
