import express from "express"
import { getUserById, loginUser, registerUser } from "../controllers/UserController";
import protect from "../middlewares/authMiddleware";


const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/data', protect, getUserById);

export default userRouter;