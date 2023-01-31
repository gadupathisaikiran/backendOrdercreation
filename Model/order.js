const mongoose=require("mongoose")

const orderschema=mongoose.Schema

const ordermodel=new orderschema({

    customer_id:{type:String,unique:true},
    inventory_id:{type:String},
    item_name:{type:String},
    Quantity:{type:Number}
})


const orderModel=mongoose.model("orders",ordermodel)

module.exports=orderModel