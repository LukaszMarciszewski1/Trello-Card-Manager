import dotenv from 'dotenv'
import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import path from 'path'
import { connectDB } from './db/mongoose.js'

import cardRouters from './routes/cards.js'
import { errorHandler, notFound } from './middlewares/errorHandler .js'

dotenv.config()
const app = express()

//connection to database mongoDB
connectDB()

//middlewares
app.use(helmet())
app.use(cors())
app.use(express.json())

//routes
app.use('/cards', cardRouters)
app.use(errorHandler)
app.use(notFound)

app.get('/', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Max-Age', '1800')
  res.setHeader('Access-Control-Allow-Headers', 'content-type')
  res.setHeader(
    'Access-Control-Allow-Methods',
    'PUT, POST, GET, DELETE, PATCH, OPTIONS'
  )
})

app.listen(process.env.PORT, () => {
  console.log(`server is running on ${process.env.PORT}`)
})
