import Resume from "../models/Resume.model.js";
import User from "../models/User.model.js";
import bcrypt from 'bcrypt'

const generateToken = (userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' })
    return token;
}

// controller for user registration
// POST: /api/users/register
export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // check if required fields are present
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // create new user
        const hashedPass = await bcrypt.hash(password, 10)
        const newUser = await User.create({ name, email, password: hashedPass });

        // return success response
        const token = generateToken(newUser._id)
        newUser.password = undefined;

        return res.status(201).json({ message: 'User created Successfully', token, user: newUser })
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};


// controller for user login
// POST: /api/users/login
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // check if password is correct
        if (!user.comparePassword(password)) {
            return res.status(400).json({ message: 'Invalid email or password' })
        }

        // return success response
        const token = generateToken(user._id)
        user.password = undefined;

        return res.status(200).json({ message: 'User logedin Successfully', token, user })
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }

};

// controller for getting user by id 
//GET: /api/users/data

export const getUserById = async (req, res) => {
    try {
        const userId = req.body;

        // check if user exists
        const user = await User.findById({ userId });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        // return user
        user.password = undefined;
        return res.status(200).json({ user })

    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }

};

// controller for getting user Resumes
//GET: /api/users/resumes
export const getUserResumes = async (req, res) => {
    try {
        const userId = req.user._id;
        //return user resumes
        const resumes = await Resume.find({ userId });
        return res.status(200).json({ resumes });
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};