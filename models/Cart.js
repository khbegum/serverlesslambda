const mongoose=require('mongoose');

const CartSchema=new mongoose.Schema({
   
name:String,
type:String,
colour:String,
cost:Number,
poster:String,
description:String,
productCount:Number
    

});

module.exports = mongoose.model('Cart', CartSchema);