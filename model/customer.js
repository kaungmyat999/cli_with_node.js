const mongoose =require('mongoose');


const Customer_Schema = mongoose.Schema({
    firstName:String,
    secondName:String,
    phone:Number,
    email:String
})
const Customer_Model = mongoose.model('Customer_Model',Customer_Schema);

module.exports =Customer_Model;