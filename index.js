const express = require("express")

const mongoose = require("mongoose")

const customermodel = require("./Model/customer")
const inventorymodel=require("./Model/inventory")
const ordermodel=require("./Model/order")


// inventory and customer ids

let inventoryid=500
let customerid=100




const app = express()

const bodyparser = require("body-parser")

app.use(bodyparser.json())


//  create customer

app.post("/createCustomer", async (req, res) => {

    try {

        if (req.body) {
            customerid++
            let cus = await customermodel.create({

                customer_id: `OD${customerid}`,
                customer_name: req.body.customer_name,
                email: req.body.email

            })

            res.status(200).json({
                status:"registed sucessfully",
                result: cus
            })

        }
        
        if(!req.body.customer_name){
            res.status(400).json({
                result:"enter details"
            })
        }


    }
    catch (e) {

        res.json({
            message:e.message
        })
        

    }


})



// create inventory



app.post("/createInventory", async (req, res) => {

    try {

        if (req.body) {
            inventoryid++
            let inv = await inventorymodel.create({
               

                inventory_id:`INTD${inventoryid}`,
                inventory_type: req.body.inventory_type,
                item_name:req.body.item_name,
                Quantity:req.body.Quantity

            })

            res.status(200).json({
                result: inv
            })

        }else{
            res.status(400).json({
                result:"enter details"
            })
        }


    }
    catch (e) {

        res.json({
            message:e.message
        })
        

    }


})


// create order

// after creating every order the available quantitle goes updated


app.post("/createOrders", async (req, res) => {
    let inventoryId=await inventorymodel.find({item_name:req.body.item_name})

    try {
       

        let quantitybyid=inventoryId[0].Quantity




        if (req.body&&quantitybyid>0) {

        

            // updating quantities
            
            let avaiquan=await inventorymodel.findByIdAndUpdate({_id:inventoryId[0]._id},{Quantity:quantitybyid-req.body.Quantity})



            // creating orders

            let ord = await ordermodel.create({

                customer_id:`OD${customerid}`,
                inventory_id:inventoryId[0].inventory_id,
                item_name:req.body.item_name,
                Quantity:req.body.Quantity

            })

            res.status(200).json({
                
                result: ord,
               Still_available_Quantity:inventoryId[0].Quantity
               
            })

        }
        
        if(!req.body){
            res.status(400).json({
                message:"enter details"
            })
        }


        
        //  OUT OF STOCK
        if(inventoryId[0].Quantity<=0){
            res.json({
                message:"ITEM IS OUT OF STOCK"
            })
        }
        


    }
    catch (e) {

        res.json({
            message:e.message
        })
        

    }


})


// get orders

app.get("/orders", async (req, res) => {

try{

    let getorders=await ordermodel.find({})


    res.status(200).json({

        result:getorders
    })



}
catch(e){

res.json({
    message:e.message
})

}

})


// get inventories




app.get("/inventory", async (req, res) => {

    try{
    
        let inventory=await inventorymodel.find({})
    
    
        res.status(200).json({
    
            result:inventory
        })
    
    
    
    }
    catch(e){
    
    res.json({
        message:e.message
    })
    
    }
    
    })
    

// get inventory by type


app.get("/inventory/:inventorytype", async (req, res) => {


   let type=req.params.inventorytype



    try{
    
        let inventorybytype=await inventorymodel.find({inventory_type:type})
    
    
        res.status(200).json({
    
            result:inventorybytype
        })
    
    
    
    }
    catch(e){
    
    res.json({
        message:e.message
    })
    
    }
    
    })




    // get customerDetails





app.get("/customerDetails", async (req, res) => {

    try{
    
        let customerdetails=await customermodel.find({})
    
    
        res.status(200).json({
    
            result:customerdetails
        })
    
    
    
    }
    catch(e){
    
    res.json({
        message:e.message
    })
    
    }
    
    })

// update the available quantity



app.post("/:itemName/:availableQuantity",async(req,res)=>{

    let availableQuantity=req.params.availableQuantity
    let itemName=req.params.itemName

    try{
        let inventoryId=await inventorymodel.find({item_name:itemName})

//    updating quantity

let avaiquan=await inventorymodel.findByIdAndUpdate({_id:inventoryId[0]._id},{Quantity:availableQuantity})



        res.json({
            BeforeAvailable_Quantity:inventoryId[0].Quantity
        })



    }
    catch(e){
        res.json({
            message:e.message
        })
    }



})















mongoose.connect("mongodb+srv://test-2:test-2@cluster0.bgdbs80.mongodb.net/?retryWrites=true&w=majority", () => {
    console.log("DB is connected")
})

app.listen(3005, () => { console.log("port is listening at port 5000") })