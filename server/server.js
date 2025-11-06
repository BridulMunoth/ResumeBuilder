import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./configs/db.js";
import userRouter from "./routes/userRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Database Connections
await connectDB(); 

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => res.send("Server is live..."));
app.use('/api/users', userRouter)

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
