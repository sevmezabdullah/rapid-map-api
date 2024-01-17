import mongoose, { Schema, model } from "mongoose";
import { Load } from "../entities/Load";




const loadSchema = new Schema<Load>({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    loadAddress: {
        type: String,
        required: true
    },
    unloadAddress: {
        type: String,
        required: true
    },
    loadNumber: {
        type: String,
        required: true,
        unique: true
    },
    loadType: {
        type: String,
        required: true
    },
    weight: {
        type: String,
        required: true
    },

}, { timestamps: true });


export default model("Load", loadSchema);