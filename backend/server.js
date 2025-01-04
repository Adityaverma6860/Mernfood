// const express = require('express')
// const app = express()
// const port = 5000
// const mongoDB = require("./db")
// mongoDB();  
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// })
// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })
//  app.use(express.json())
//  app.use('/api', require("./Routes/CreateUser"));
//  app.use('/api', require("./Routes/DisplayData"));
//  app.use('/api', require("./Routes/OrderData"));


// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })
 
const express = require('express');
const app = express();
const port = 5000;
const mongoDB = require("./db");

// Initialize MongoDB connection
mongoDB();

// Middleware for Cross-Origin Resource Sharing (CORS)
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

// Middleware to parse JSON
app.use(express.json());

// Basic route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// // API Routes
app.use('/api', require("./Routes/CreateUser"));
app.use('/api', require("./Routes/DisplayData"));
app.use('/api', require("./Routes/OrderData"));

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});




