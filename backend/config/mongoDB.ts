import mongoose from "mongoose";

export default async function InitializeMongo() {
    try {
        mongoose.set('strictQuery', false);

        await mongoose.connect(process.env.MONGO_URI, {dbName: process.env.MONGO_DB});

        const db = mongoose.connection;

        db.on('error', console.error.bind(console, 'MongoDB connection error:'));

        return true;

    } catch (error) {
       
        console.error('MongoDB connection error:', error);
        
        return false;
    }
}
