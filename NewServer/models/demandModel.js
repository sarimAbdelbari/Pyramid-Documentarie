const mongoose = require('mongoose');

const demandSchema = new mongoose.Schema({
    UserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, 
    type:{type:String , required: true,},
    message:{type:String , required:false},
    seen :{type:Boolean , default:false}
  }, { timestamps: true });
  
  const Demand = mongoose.model('Demand', demandSchema);
  module.exports = Demand;