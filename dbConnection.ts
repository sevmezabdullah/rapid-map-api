import mongoose from "mongoose";

export const connect = async () => {
    try {
        await mongoose.connect("mongodb+srv://abdullah:324106@cluster2.nxmtjts.mongodb.net/rapid-map?retryWrites=true&w=majority", {

        });
        console.log("Database connected");
    } catch (error) {
        console.log("Error connecting to database", error);
    }
};
