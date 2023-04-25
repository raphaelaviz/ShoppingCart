import React, { createContext, useContext, useReducer} from 'react'
import { faker } from '@faker-js/faker';
import { cartReducer, productReducer } from './Reducers';


// In combination with the useReducer hooks and reducer functions, 
// the Context API in this file handles the state management across the project

const Cart = createContext();

const Context = ({ children }) => {

    // Generates dummy data via the Faker library

    const products = [...Array(20)].map(() => ({

    id: faker.datatype.uuid(),
    name: faker.commerce.productName(),
    price: faker.commerce.price(),
    image: faker.image.image(),
    fastDelivery: faker.datatype.boolean(),
    inStock: faker.helpers.arrayElement([0,3,5,6,7]),    
    ratings: faker.helpers.arrayElement([1,2,3,4,5]),    
    
    }));
        
    const [state, dispatch] = useReducer(cartReducer, {
        products: products,
        cart: []
    });

    // Defines the  initial state of the filters
    const [productState, productDispatch] = useReducer(productReducer, {
        byStock: false,
        byFastDelivery: false,
        byRating:0,
        searchQuery: "",

    })



  return <Cart.Provider value={{ state,dispatch, productState, productDispatch}}>{ children }</Cart.Provider>
}

export default Context;

export const CartState = () => {
    return useContext(Cart)
}