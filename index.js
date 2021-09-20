#!/usr/bin/env node

const { info } = require('console');
const http = require('http');
const mongoose = require('mongoose');
const { nextTick } = require('process');
const { db, find } = require('./model/customer');
mongoose.connect('mongodb://localhost:27017/test');

const Customer_Model = require("./model/customer");

// async function addCustomer(fn,sn,pno,email){
//     console.log(fn,sn,pno,email);
//     let customer =Customer_Model.create({firstName:fn,secondName:sn,phone:pno,email:email})
//     await customer.save();
// }

function findCustomer(name) {
    const search = RegExp(name,'i');

    Customer_Model.find({$or: [{firstName : search},{secondName : search}]})
    .then(result=>{
        console.info(result);
        console.info(`${result.length} matches`);
        db.close();
    });
    // Customer_Model.find({}).then(result=>{
    //     console.log(result);
    // });
}

function deletAll(){
    Customer_Model.find({})
    .then(result=>{
       result.map(i=>{
        Customer_Model.findByIdAndDelete({_id:`${i._id}`})
        .then(j=>console.log(j))
       })
    })
}

function findAll() {
    Customer_Model.find({})
    .then(i=>{
        console.log(i);
        db.close();
    })
    
}

async function addCustomer(inputs){
    Customer_Model.create(inputs)
    .then(i=>{
        console.log('Result',i)
        db.close();
    })
    
}

function updateCustomer(id,updatedData) {
    Customer_Model.replaceOne({id},updatedData)
        .then(result => {
            console.log(result)
            console.log('Updated');
            db.close();

        } )
}

function deleteCustomer(id){
    Customer_Model.deleteOne({_id:id})
        .then(result => {
            console.log(result);
            db.close();
        })
}

//addCustomer({firstName:'John',secondName:'Doe',phone:12345,email:`jn2@gmail.com`});
//findAll();
//addCustomer('John','Doe',1234,`jn@gmail.com`);
//findCustomer('John')

module.exports={addCustomer,findCustomer,updateCustomer,deleteCustomer,findAll}

