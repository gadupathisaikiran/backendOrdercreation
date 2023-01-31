const mongoose=require("mongoose")

const orderschema=mongoose.Schema

const customermodel=new orderschema({
customer_id:{type:String},
customer_name:{type:String,required:true},
email:{type:String,unique:true}
   
})


const customerModel=mongoose.model("customers",customermodel)

module.exports=customerModel