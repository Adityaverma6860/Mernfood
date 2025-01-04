// import React,{useEffect,useState} from 'react'
// import Navbar from '../components/Navbar'
// import Footer from '../components/Footer'
// import Card from '../components/Card'

// export default function Home() {
//   const [search,setSearch]=useState('');
//   const [foodCat, setFoodCat] = useState([]);
//   const [foodItem, setFoodItem] = useState([]);
//   const loadData = async () => {
//     let response = await fetch("http://localhost:5000/api/foodData",{
//       method: "POST",
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     });
//     response = await response.json();
//     setFoodItem(response[0])
//     setFoodCat(response[1])
//     // console.log(response[0],response[1]);

//   }
//   useEffect(() => {
//     loadData()
//   },[])
//     return(
//         <div>
//           <div><Navbar/></div>
//           <div>

//         <div id="carouselExampleFade" className="carousel slide carousel-fade " data-bs-ride="carousel" style={{objectFit:"contain !important"}}>

//                 <div className="carousel-inner " id='carousel'>
//                     <div className=" carousel-caption  " style={{ zIndex: "10" }}>
           
//                        <div className=" d-flex justify-content-center">  
//                             <input className="form-control me-2" type="search" placeholder="Search..." aria-label="Search" 
//                             value={search} onChange={(e)=>{setSearch(e.target.value)}} /> 
//                          </div>                                                                                                                                             
//                     </div>
//                     <div className="carousel-item active" >
//                         <img src="https://source.unsplash.com/random/900x700/?burger" className="d-block w-100  " style={{ filter: "brightness(30%)" }} alt="..." />
//                     </div>
//                     <div className="carousel-item">
//                         <img src="https://source.unsplash.com/random/900x700/?pastry" className="d-block w-100 " style={{ filter: "brightness(30%)" }} alt="..." />
//                     </div>
//                     <div className="carousel-item">
//                         <img src="https://source.unsplash.com/random/900x700/?barbeque" className="d-block w-100 " style={{ filter: "brightness(30%)" }} alt="..." />
//                     </div>
//                 </div>
//                 <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
//                     <span className="carousel-control-prev-icon" aria-hidden="true"></span>
//                     <span className="visually-hidden">Previous</span>
//                 </button>
//                 <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
//                     <span className="carousel-control-next-icon" aria-hidden="true"></span>
//                     <span className="visually-hidden">Next</span>
//                 </button>
//             </div>
//             </div>
          

//         <div className='contain'>
//           {
//             foodCat !==[]
//             ? foodCat.map((data) =>{
//               return (<div className='row mb-3'>
//               <div key={data._id} className='fs-3 m-3' >
//               {data.CategoryName}
//               </div>
//               <hr />
//               {foodItem !== [] 
//                  ?
//                foodItem.filter(
//                     (item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLowerCase())))
//                     .map(filterItems => {
//                       return(
//                          <div key={filterItems._id}
//                           className='col-12 col-md-6 col-lg-3'>
//                          <Card foodItem={filterItems}  
//                          options={filterItems.options[0]}
                         
//                          ></Card>

//                         </div>                        
//                       )
//                     }
                  
//                   ): <div> No Such Data Found </div>}
//                     </div>
//               )
//             })
//             : ""}
//       </div>
//        <div><Footer/></div>
//         </div>
//     )
// }

// UPDATE CODE 
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card.';


export default function Home() {
  const [search, setSearch] = useState('');
  const [foodCategories, setFoodCategories] = useState([]);
  const [foodItems, setFoodItems] = useState([]);

  const loadData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/foodData", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      setFoodItems(data[0]);
      setFoodCategories(data[1]);
    } catch (error) {
      console.error("Error loading food data:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      {/* Navbar */}
      <Navbar />

      {/* Carousel */}
      <div
        id="carouselExampleFade"
        className="carousel slide carousel-fade"
        data-bs-ride="carousel"
        style={{ objectFit: "contain !important" }}
      >
        <div className="carousel-inner" id="carousel">
          <div className="carousel-caption" style={{ zIndex: "10" }}>
            <div className="d-flex justify-content-center">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search..."
                aria-label="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          {["burger", "pastry", "barbeque"].map((item, index) => (
            <div
              className={`carousel-item ${index === 0 ? "active" : ""}`}
              key={item}
            >
              <img
                src={`https://source.unsplash.com/random/900x700/?${item}`}
                className="d-block w-100"
                style={{ filter: "brightness(30%)" }}
                alt={item}
              />
            </div>
          ))}
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* Food Items */}
      <div className="container">
        {foodCategories.length > 0 ? (
          foodCategories.map((category) => (
            <div key={category._id} className="mb-4">
              <div className="fs-3 m-3">{category.CategoryName}</div>
              <hr />
              <div className="row">
                {foodItems
                  .filter(
                    (item) =>
                      item.CategoryName === category.CategoryName &&
                      item.name.toLowerCase().includes(search.toLowerCase())
                  )
                  .map((filteredItem) => (
                    <div
                      key={filteredItem._id}
                      className="col-12 col-md-6 col-lg-3 mb-4"
                    >
                      <Card
                        foodItem={filteredItem}
                        options={filteredItem.options[0]}
                      />
                    </div>
                  ))}
              </div>
            </div>
          ))
        ) : (
          <div>No Data Found</div>
        )}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
