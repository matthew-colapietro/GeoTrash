const mongoose = require('mongoose')
const Schema = mongoose.Schema


const TrashSchema = new Schema({
  reporterName: String,
  phoneNumber: Number,
  email: String,
  trashImage: String,
  trashQuantity: String,
  hazardnessLevel: String,
  longitude: Number,
  latitude: Number
})



module.exports.Trash = mongoose.model('Trash', TrashSchema)