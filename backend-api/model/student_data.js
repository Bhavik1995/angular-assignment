const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let Student_data = new Schema({
  name: {
    type: String
  },

  age: {
    type: Number,
  },

  email:{
    type: String,
    unique: true
  },

  gender: String,

  phone:{
    type: Number,
  },

  std: {
    type: String,
  },

  address: {
    type: String,
  },

}, {
  collection: 'students'
})
module.exports = mongoose.model('student_data', Student_data)