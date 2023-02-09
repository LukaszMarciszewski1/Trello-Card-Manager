import mongoose from 'mongoose'
const { Schema } = mongoose

const CardSchema = mongoose.Schema(
  {
    title: String,
    member: String,
    department: String,
    startDate: String,
    endDate: String,
  },
  {
    timestamps: true,
  }
)

const Card = mongoose.model('Card', CardSchema)

export default Card
