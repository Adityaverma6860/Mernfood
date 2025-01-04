// const express = require("express")
// const router = express.Router()
// const Order =require ('../models/Oders')

// router.post('/OrderData', async (req,res) =>{
//     let data = req.body.order_data 
//     await data.splice(0,0, {order_data:req.body.order_data})

//     let eId = await Order.findOne({'email':req.body.email})
//     console.log(eId)
//     if(eId === null) {
//         try {
//             await Order.create({
//                 email:req.body.email,
//                 order_data:[data]
//             }).then(()=>{
//                 res.json({success: true })
//             })
//         } catch (error) {
//             console.log(error.message)
//             res.send("Server Error",error.message)
//         }
//     } 
//     else{
//         try {
//             await Order.findOneAndUpdate({email:req.body.email},
//                 {$push:{order_data:data}}).then(()=> {
//                     res.json({ success:true })
//                 })
//         } catch (error){
//             res.send("Server Error ", error.message )
//         }
//     }
// })

// router.post('/myOrderData', async (req,res) =>{
//     try {
//         let myData = await Order.findOne({'email': req.body.email})
//         res.json({ orderData: myData})
    
//     } catch(error){
//         res.send("Server Error",error.message)
//     }
// })
// module.exports = router;

const express = require("express");
const router = express.Router();

// Endpoint to fetch food data
router.post('/foodData', async (req, res) => {
  try {
    // Log the global variables for debugging purposes
    console.log(global.food_item);
    console.log(global.foodCategory);

    // Check if the required global variables are set
    if (!global.food_item || !global.foodCategory) {
      return res.status(400).json({ error: "Food data or categories not found" });
    }

    // Send the food item and category data as response
    res.status(200).json([global.food_item, global.foodCategory]);

  } catch (error) {
    // Log the error for debugging
    console.error("Error in foodData route:", error.message);
    
    // Send error response with status code 500
    res.status(500).send("Server Error");
  }
});

module.exports = router;
