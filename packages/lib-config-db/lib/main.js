import mongoose from "mongoose";

export default async function connectToDb() {
  const url = process.env.MONGODB_URL;
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 20000,
  };
  await mongoose.connect(url, options);
}
