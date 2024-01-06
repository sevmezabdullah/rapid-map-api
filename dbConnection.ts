import mongoose from "mongoose";

export const connect = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/rapidmap", {

        });
        console.log("Database connected");
    } catch (error) {
        console.log("Error connecting to database", error);
    }
};
