// import React,{useState, useRef, useEffect} from "react";
// import { useDispatchCart,useCart } from '../ContextReducer'

// export default function Card(props) {
//   let dispatch = useDispatchCart();
//     let data = useCart();
//    const priceRef =useRef();
//    let options = props.options; 
//    let priceOptions = Object.keys(options);  
//   //  let foodItem = props.foodItems;
//    const [qty, setQty] = useState(1)
//    const [size, setSize] = useState("")
//    const handleAddToCart =  async () => {
//     let food =[]
//     for (const item of data){
//      if (item.id === props.foodItem._id) {
//       food = item;
//       break;
//      }
//     }
//     if (food!= []) {  //     if (food!== []) 

//       if(food.size===size){
//         await dispatch({type:"UPDATE",id:props.foodItem._id,price: finalPrice,qty:qty})
//       return
//       }
//       else if (food.size !==size){
//     await dispatch({ type: "ADD", id:props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size })
//      }   //console.log(data)
//    }
//   }
//   let finalPrice = qty * parseInt(options[size]);
//   useEffect(() =>{
//     setSize(priceRef.current.value)

//   },[]) 

//   return (
//     <div>
//       <div>
//         <div className="card mt-3" style={{ "width": "16rem", "maxHeight": "360px" }}>
//           <img src={props.foodItem.img} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }}/>
//           <div className="card-body">
//             <h5 className="card-title">{props.foodItem.name}</h5>
//             <div className="container w-100"></div>
//             <select className="m-2 h-100  bg-success" onChange={(e)=> setQty(e.target.value)}>
//               {Array.from(Array(6), (e, i) => {
//                 return (
//                   <option key={i + 1} value={i + 1}>
//                     {i + 1}
//                   </option>
//                 );
//               })}
//             </select> 
//             <select className='m-2 h-100 bg-success rounded' ref={priceRef} onChange={(e)=> setSize(e.target.value)}>

//              {priceOptions.map((data) => {
//                 return <option key={data} value={data}>{data}</option> 
//             })}

//             </select>
//             <div className="d-inline h-100 fs-5"> ₹{finalPrice}/-
//         </div>
//           </div>
//         </div>
//         <hr></hr>
//         <button className={`btn btn-success justify-center ms-2 `} onClick={handleAddToCart}>Add to Cart</button>
//       </div>
//     </div>
//   );
// }

// update code

import React, { useState, useRef, useEffect } from "react";
import { useDispatchCart, useCart } from "../ContextReducer";

export default function Card(props) {
  const dispatch = useDispatchCart();
  const data = useCart();
  const priceRef = useRef();

  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");

  const options = props.options;
  const priceOptions = Object.keys(options);

  const finalPrice = qty * parseInt(options[size]);

  const handleAddToCart = async () => {
    const existingFoodItem = data.find(
      (item) => item.id === props.foodItem._id && item.size === size
    );

    if (existingFoodItem) {
      // Update quantity and price if the item exists and size matches
      await dispatch({
        type: "UPDATE",
        id: props.foodItem._id,
        price: finalPrice,
        qty: qty,
      });
    } else {
      // Add new item to the cart
      await dispatch({
        type: "ADD",
        id: props.foodItem._id,
        name: props.foodItem.name,
        price: finalPrice,
        qty: qty,
        size: size,
      });
    }
  };

  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);

  return (
    <div>
      <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
        <img
          src={props.foodItem.img}
          className="card-img-top"
          alt={props.foodItem.name}
          style={{ height: "120px", objectFit: "fill" }}
        />
        <div className="card-body">
          <h5 className="card-title">{props.foodItem.name}</h5>
          <div className="container w-100">
            <select
              className="m-2 h-100 bg-success"
              onChange={(e) => setQty(e.target.value)}
            >
              {Array.from({ length: 6 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
            <select
              className="m-2 h-100 bg-success rounded"
              ref={priceRef}
              onChange={(e) => setSize(e.target.value)}
            >
              {priceOptions.map((data) => (
                <option key={data} value={data}>
                  {data}
                </option>
              ))}
            </select>
            <div className="d-inline h-100 fs-5">₹{finalPrice}/-</div>
          </div>
        </div>
        <button
          className="btn btn-success justify-center ms-2"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

