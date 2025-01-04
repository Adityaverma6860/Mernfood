// import React,{createContext,useReducer,useContext} from "react";

// const CartStateContext = createContext();
// const CartDispatchContext = createContext();
// const reducer = (state, action) => {
//         switch (action.type) {
//             case "ADD":
//                 return [...state, { id: action.id, name: action.name, qty: action.qty, size: action.size, price: action.price, img: action.img }]
//                   case "REMOVE":
//                         let newArr =[...State]
//                         newArr.splice(action.index,1)
//                         return newArr;
//                  case "UPDATE":
//                         let arr =[...state]
//                         arr.find((food,index)=>{

//                        if(food.id===action.id){
//                   console.log(food.qty,parseInt(action.qty), action.price + food.price)
//                   arr[index]={...food, qty: parseInt(action.qty)+food.qty, price: action.price + food.price}
//                        }
//                        return arr
//                 })
//                 return arr
//                 case "DROP":
//                       let empArray = []
//                       return empArray  
//                 default:
//                     console.log("Error in Reducer");
//             }
    
//     };
// export const CartProvider =({children})=>{
// const [state, dispatch] = useReducer(reducer, [])
//   return(
//     <CartDispatchContext.Provider value={dispatch}>
//     <CartStateContext.Provider value={state}>
//             {children}  
//     </CartStateContext.Provider>
//     </CartDispatchContext.Provider>
//    ) 
// }

// export const useCart = () => useContext(CartStateContext);
// export const useDispatchCart = () => useContext(CartDispatchContext);

// UPDATE 
import React, { createContext, useReducer, useContext } from "react";

// Create Contexts
const CartStateContext = createContext();
const CartDispatchContext = createContext();

// Reducer Function
const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return [
        ...state,
        {
          id: action.id,
          name: action.name,
          qty: action.qty,
          size: action.size,
          price: action.price,
          img: action.img,
        },
      ];

    case "REMOVE":
      return state.filter((_, index) => index !== action.index);

    case "UPDATE":
      return state.map((food) => {
        if (food.id === action.id) {
          return {
            ...food,
            qty: food.qty + parseInt(action.qty),
            price: food.price + action.price,
          };
        }
        return food;
      });

    case "DROP":
      return []; // Reset the cart to an empty array

    default:
      console.error("Invalid action type in reducer:", action.type);
      return state;
  }
};

// Cart Provider Component
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, []);
  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>
        {children}
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  );
};

// Custom Hooks
export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);
