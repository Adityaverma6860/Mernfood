// import React, { useState } from "react";
// import {Link}from "react-router-dom"


// export default function SignUp(){
//     const [credentials, setCredentials] = useState({name:"",email:"",password:"",geolocation:""})

//    const handleSubmit = async(e)=>{
//     e.preventDefault();
//     const response = await fetch("http://localhost:5000/api/createuser",{
//         method: 'POST',
//         headers: {
//           'Content-Type':'application/json'
//         },
//         body: JSON.stringify({name: credentials.name, email: credentials.email, password: credentials.password, location: credentials.geolocation})
//       });  
//     const json = await response.json()
//     console.log(json);
//     if (!json.success){
//       alert("Enter Valid Credentials")
//       }
//     }
//    const onChange = (event) => {
//     setCredentials({ ...credentials,[event.target.name]:event.target.value })
//    }
//     return(
//     <>
//   <div className='container' >
//   <form onSubmit={handleSubmit}>
//   <div className="mb-3">
//     <label htmlFor="name" className="form-label">Name</label>
//     <input type="text" className="form-control" name= 'name' value={credentials.name} onChange={onChange}  />
//   </div>
//   <div className="mb-3">
//     <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
//     <input type="email" className="form-control" name= 'email' value={credentials.email} onChange={onChange}  id="exampleInputEmail1" aria-describedby="emailHelp"/>
//     <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
//   </div>
//   <div className="mb-3">
//     <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
//     <input type="password" className="form-control" name= 'password' value={credentials.password} onChange={onChange}  id="exampleInputPassword1"/>
//   </div>
//   <div className="mb-3">
//     <label htmlFor="exampleInputPassword1" className="form-label">Address</label>
//     <input type="text" className="form-control" name= 'geolocation' value={credentials.geolocation} onChange={onChange}  id="exampleInputPassword1"/>
//   </div>
//   <button type="submit" className="m-3 btn btn-success">Submit</button>
//   <Link to="/login" className="m-3 btn btn-danger">Already a user</Link>

// </form>
// </div>
// </>
// )

// }

// UPDATE 
import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function SignUp() {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    geolocation: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Input validation
    if (!credentials.name || !credentials.email || !credentials.password || !credentials.geolocation) {
      alert("All fields are required!");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(credentials.email)) {
      alert("Please enter a valid email address!");
      return;
    }

    setLoading(true); // Start loading
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/createuser`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: credentials.name,
            email: credentials.email,
            password: credentials.password,
            location: credentials.geolocation,
          }),
        }
      );

      const json = await response.json();
      console.log(json);

      if (json.success) {
        alert("User registered successfully!");
        setCredentials({ name: "", email: "", password: "", geolocation: "" }); // Reset form
      } else {
        alert("Error: " + json.message || "Enter valid credentials.");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      alert("Something went wrong. Please try again later.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={credentials.name}
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={credentials.email}
              onChange={onChange}
              id="email"
              aria-describedby="emailHelp"
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={credentials.password}
              onChange={onChange}
              id="password"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="geolocation" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control"
              name="geolocation"
              value={credentials.geolocation}
              onChange={onChange}
              id="geolocation"
            />
          </div>
          <button type="submit" className="m-3 btn btn-success" disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </button>
          <Link to="/login" className="m-3 btn btn-danger">
            Already a user
          </Link>
        </form>
      </div>
    </>
  );
}
