const mongoose = require('mongoose')
const Schema = mongoose.Schema

//This is the main Trash schema
const TrashSchema = new Schema({
  reporterName: String,
  phoneNumber: Number,
  email: String,
  trashImage: String,
  trashQuantity: String,
  hazardnessLevel: String,
  longitude: Number,
  latitude: Number,
  submissionDate: Date,
  status: String
})

module.exports.Trash = mongoose.model('Trash', TrashSchema)
