// const express = require("express");
// const router = express.Router();
// const User = require("../models/User");
// const { body, validationResult } = require("express-validator");
// var jwt = require('jsonwebtoken');
// const bcrypt = require("bcryptjs");
// const jwtSecret = "Bhigi Bhigi sadko pe tera intejar kru"



// router.post(
//   "/createuser",
//   [
//     body("email").isEmail(),
//     body("name").isLength({ min: 5 }),
//     body("password", "Incorrect Password").isLength({ min: 5 }),
//   ],
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }
//     const salt = await bcrypt.genSalt(10);
//     let secPassword = await bcrypt.hash(req.body.password, salt);
//     try {
//       await User.create({
//         name: req.body.name,
//         password: secPassword,
//         email: req.body.email,
//         location: req.body.location
//       });
//       res.json({ success: true });
//     } catch (error) {
//       console.log(error);
//       res.json({ success: false });
//     }
//   }
// );

// router.post(
// "/loginuser",
//   [
//     body("email").isEmail(),
//     body("password", "Incorrect Password").isLength({ min: 5 }),
//   ],
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }
//     let email = req.body.email;
//     try {
//       let userData = await User.findOne({ email });
//       if (!userData) {
//         return res
//           .status(400)
//           .json({ errors: "Try logging with correct credentials" });
//       }
//       const pwdCompare = await bcrypt.compare(req.body.password,userData.password); 
//       if (!pwdCompare) {
//       // if (req.body.password !== userData.password) {
//         return res
//           .status(400)
//           .json({ errors: "Try logging with correct credentials" });
//       }
//       const data = {
//         user: {
//             id: userData.id
//         }
//       }
//     const authToken = jwt.sign(data, jwtSecret);  
//     return res.json({ success: true,authToken });
//     } catch (error) {
//       console.log(error);
//       res.json({ success: false });
//     }
//   }
// );  

// module.exports = router;


const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");

// You should store the jwtSecret in environment variables for better security.
const jwtSecret = process.env.JWT_SECRET || "Bhigi Bhigi sadko pe tera intejar kru";

// Route to create a new user
router.post(
  "/createuser",
  [
    body("email").isEmail().withMessage("Invalid email address"),
    body("name").isLength({ min: 5 }).withMessage("Name must be at least 5 characters long"),
    body("password", "Password must be at least 5 characters long").isLength({ min: 5 }),
    body("location").notEmpty().withMessage("Location is required") // Added location validation
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const salt = await bcrypt.genSalt(10);
    let secPassword = await bcrypt.hash(req.body.password, salt);

    try {
      const user = await User.create({
        name: req.body.name,
        password: secPassword,
        email: req.body.email,
        location: req.body.location
      });
      res.json({ success: true, user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  }
);

// Route for user login
router.post(
  "/loginuser",
  [
    body("email").isEmail().withMessage("Invalid email address"),
    body("password", "Password must be at least 5 characters long").isLength({ min: 5 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let email = req.body.email;
    try {
      let userData = await User.findOne({ email });
      if (!userData) {
        return res.status(400).json({ errors: "Invalid credentials" });
      }

      const pwdCompare = await bcrypt.compare(req.body.password, userData.password);
      if (!pwdCompare) {
        return res.status(400).json({ errors: "Invalid credentials" });
      }

      const data = {
        user: {
          id: userData.id
        }
      };

      // Generate JWT token
      const authToken = jwt.sign(data, jwtSecret, { expiresIn: "1h" }); // Set token expiration time (1 hour)

      res.json({ success: true, authToken });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  }
);

module.exports = router;
