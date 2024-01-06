import mongoose, { Schema } from "mongoose";
import { User } from "../entities/User";



const userSchema = new Schema<User>({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    role: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: String, required: false },
}, { timestamps: true });


export default mongoose.model("User", userSchema);