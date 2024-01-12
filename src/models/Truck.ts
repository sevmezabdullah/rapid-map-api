import mongoose, { Schema, model } from "mongoose";
import { Truck } from "../entities/Truck";



const truckSchema = new Schema<Truck>({
    plate: {
        type: String,
        required: [true, "Plate is required"],
        unique: [true, "Plate already exists"]
    },
    type: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ["available", "unavailable", "inTransit"],
        default: "available"
    },
    loadNumber: {
        type: String,
        required: false
    },
    driverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: false
    },
    currentPosition: {
        type: { langitute: Number, latitude: Number, dateTime: Date },
        required: false
    },

});


export default model("Truck", truckSchema);