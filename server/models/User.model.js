import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const UserSchema = new mongoose.Schema(
    {
        fullname: {
            type: String,
            required: [true, 'Please Enter your name'],
            trim: true,
            maxlength: [50, 'Name cannot be more than 50 characters']
        },
        email: {
            type: String,
            required: [true, 'Please Enter your email'],
            unique: true,
            lowercase: true,
            match: [
                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,63}$/,
                'Please provide a valid email'
            ]
        },
        password: {
            type: String,
            required: [true, 'Please provide a password'],
            minlength: [8, 'Password must be at least 8 characters'],
            match: [/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,20}$/,
                "Password must be 8-20 characters with upper & lower case letters, a number, and a special character."],
            select: false  // Hides password from query results by default for security
        }}, { timestamps: true })

userSchema.methods.comparePassword = function (password){
    return bcrypt.compareSync(password,this.password)
}

const User = mongoose.model("User", UserSchema)

export default User;