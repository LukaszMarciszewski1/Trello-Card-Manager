import express from 'express'
import mongoose from 'mongoose'
import Card from '../models/Card.js'
import dotenv from 'dotenv'
dotenv.config()

const router = express.Router()

export const getCards = async (req, res) => {
  try {
    const card = await Card.find().sort({ timestamp: -1 })
    res.status(200).json(card)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const getCard = async (req, res) => {
  const { id } = req.params
  try {
    const card = await Card.findById(id)
    res.status(200).json(card)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const createCard = async (req, res) => {
  try {
    const card = await new Card(req.body).save()
    res.status(201).json(card)
  } catch (error) {
    res.status(409).json({ message: error.message })
  }
}

export const updateCard = async (req, res) => {
  const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No card with id: ${id}`)
    const updateCard = await Card.findByIdAndUpdate(id, req.body, { new: true })
    res.json(updateCard)
}

export const deleteCard = async (req, res) => {
  const { id } = req.params
  try {
    await Card.findByIdAndRemove(id)
    res.json({ message: 'Card deleted successfully.' })
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}
