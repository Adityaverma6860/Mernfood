// import React, { useState }  from 'react'
// import {Link ,useNavigate} from 'react-router-dom'



// export default function Login() {
//     const [credentials, setCredentials] = useState ({email:"",password:""})
//     const navigate = useNavigate()
//     const handleSubmit = async (e) => {
//      e.preventDefault();
//      const response = await fetch("http://localhost:5000/api/loginuser", {
//          method: 'POST',
//          headers: {
//            'Content-Type':'application/json'
//          },
//          body: JSON.stringify({email: credentials.email, password: credentials.password})
//        });  
//      const json = await response.json()
//      console.log(json);
//      if (!json.success){
//        alert("Enter Valid Credentials")
//        }
//        if (!json.success){
//          localStorage.setItem("userEmail", credentials.email);
//         localStorage.setItem("authToken", json.authToken);
//         console.log(localStorage.getItem("authToken"))
//         navigate("/");

//       }

//      }
//     const onChange = (event) => { 
//      setCredentials({ ...credentials,[event.target.name]:event.target.value })
//     }
//     return(
        
//         <div>
//    <div className='container'/>
//     <form onSubmit={handleSubmit}>
        
//   <div className="mb-3">
//     <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
//     <input type="email" className="form-control" name= 'email' value={credentials.email} onChange={onChange}  id="exampleInputEmail1" aria-describedby="emailHelp"/>
//     <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
//   </div>
//   <div className="mb-3">
//     <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
//     <input type="password" className="form-control" name= 'password' value={credentials.password} onChange={onChange}  id="exampleInputPassword1"/>
//     </div>
//    <button type="submit" className="m-3 btn btn-success">Submit</button>
//    <Link to="/createuser" className="m-3 btn btn-danger">I am a new user</Link>
//   </form>
//   </div>
  
//     )
// }

// Update code 

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/loginuser", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });

      const json = await response.json();
      console.log(json);

      if (!json.success) {
        alert("Invalid Credentials. Please try again.");
      } else {
        localStorage.setItem("userEmail", credentials.email);
        localStorage.setItem("authToken", json.authToken);
        console.log("Auth Token:", localStorage.getItem("authToken"));
        navigate("/");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred while logging in. Please try again later.");
    }
  };

  const handleChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <div className="container mt-5">
      <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm">
        <h2 className="text-center mb-4">Login</h2>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email Address</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            id="email"
            aria-describedby="emailHelp"
            required
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            id="password"
            required
          />
        </div>

        <button type="submit" className="btn btn-success w-100 mb-3">
          Login
        </button>

        <Link to="/createuser" className="btn btn-danger w-100">
          I am a new user
        </Link>
      </form>
    </div>
  );
}
