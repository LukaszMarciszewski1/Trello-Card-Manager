import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

export const connectDB = async () => {
  await mongoose
    .connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((res) => {
      console.log('connected to mongoDB')
    })
    .catch((error) => {
      console.log(`${error} did not connect`)
      process.exit(1)
    })
}

