import mongoose from "mongoose";
import dotenv from "dotenv";

export default async function connectToDb() {
    dotenv.config();

    const userId = process.env.MONGO_USERID;
    const password = process.env.MONGO_DBPASSWORD;
    const host = process.env.MONGO_URL;
    const appName = process.env.MONGO_APPNAME;
    const dbName = process.env.MONGO_DBNAME;

    const url = `mongodb+srv://${userId}:${password}@${host}/${dbName}?retryWrites=true&w=majority`;
    const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };
    await mongoose.connect(url, options);
}