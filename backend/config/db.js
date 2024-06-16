import mongoose from "mongoose";

const mongoDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URL);
        console.log(`connected to: ${conn.connection.host}`)
    } catch (error) {
        console.log(`Error: ${error}`);
        process.exit(1);
    }
}

export default mongoDB;