// const express = require("express")
// const router = express.Router()


// router.post('/foodData' ,(req, res) => {
// try{
//     console.log(global.food_item)
//    res.send([global.food_item,global.foodCategory])
// } catch (error) {
//     console.error(error.message)
//     res.send("Server Error")

// }
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
