// const mongoose = require('mongoose');
// // const mongoURI ='mongodb://Aditya_6860:Aditya6860@ac-vgu2s7a-shard-00-00.xvquyxq.mongodb.net:27017,ac-vgu2s7a-shard-00-01.xvquyxq.mongodb.net:27017,ac-vgu2s7a-shard-00-02.xvquyxq.mongodb.net:27017/gofoodmern?ssl=true&replicaSet=atlas-10uymd-shard-0&authSource=admin&retryWrites=true&w=majority'
// mongoose.connect("mongodb://127.0.0.1:27017/mernfood");
// const mongoDB =async() =>{
//   await mongoose.connect(mongoURI,{useNewURlParser: true },async(err,result)=>{
//     if(err) console.log("---",err)
//     else{
//         console.log("connected successfully");
        
//         const fetched_data = await mongoose.connection.db.collection("food_item");
//         fetched_data.find({}).toArray( async function( err, data){
//            const foodCategory = await mongoose.connection.db.collection("foodCategory");    
//            foodCategory.find({}).toArray(function (err,catData){
            
//            if(err) console.log(err);
//             else{
//                 global.food_item = data;
//                 global.foodCategory = catData;
//             }
//         }) 
//            if(err) console.log(err);
//              else{
//                  global.food_item = data;
                
//             } 
            
//         })
//     }
// });
// }
// module.exports = mongoDB;

// Update code 

const mongoose = require('mongoose');

// Replace with your actual MongoDB connection URI

// const mongoURI ='mongodb+srv://mernfood:Aditya6860@cluster0.mt3mr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
const mongoURI = 'mongodb://127.0.0.1:27017/mernfood'; 

const mongoDB = async () => {
  try {
    // Connect to the database
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,  
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB successfully");

    // Fetching data from "food_item" collection
    const fetchedData = await mongoose.connection.db.collection("food_item").find({}).toArray();

    // Fetching data from "foodCategory" collection
    const fetchedCategories = await mongoose.connection.db.collection("foodCategory").find({}).toArray();

    // Setting global variables (optional but not recommended)
    global.food_item = fetchedData;
    global.foodCategory = fetchedCategories;

    console.log("Data fetched and stored globally");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
};

module.exports = mongoDB;


