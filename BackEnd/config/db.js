import mongoose from "mongoose";

export const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_DB);
        console.log("Connection Succesful")
        return mongoose.connect;
    } catch (error) {
        console.log("Connection Failed", error.message)
        process.exit(1)    
    }
}