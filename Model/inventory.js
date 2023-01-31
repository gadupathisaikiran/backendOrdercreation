const mongoose=require("mongoose")

const orderschema=mongoose.Schema

const inventorymodel=new orderschema({
inventory_id:{type:String,unique:true},
inventory_type:{type:String},
item_name:{type:String,unique:true},
Quantity:{type:Number}
   
})


const inventoryModel=mongoose.model("inventory",inventorymodel)

module.exports=inventoryModel