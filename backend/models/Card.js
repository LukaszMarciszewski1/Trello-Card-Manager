import mongoose from 'mongoose'
const { Schema } = mongoose

const CardSchema = mongoose.Schema(
  {
    trelloCardId: String,
    title: String,
    member: String,
    department: String,
    startDate: String,
    endDate: String,
    orderPrice: Number,
    orderCost: Number,
  },
  {
    timestamps: true,
  }
)

const Card = mongoose.model('Card', CardSchema)

export default Card
