const mongoose = require('mongoose');

const history = new mongoose.Schema({
  hospitalid:{type:String, required:true},

    date: { type: String, required: true },
  productid: { type: String, required: true },
  quantity: { type: String, required: true },
  type: { type: String, required: true },
  
 

});

const History = mongoose.model('History', history);
module.exports = History;