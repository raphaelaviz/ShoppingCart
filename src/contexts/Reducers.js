import { ACTIONS } from '../contexts/ReducerTypes';

// In combination with the Context API, these Reducer functions
// handle the state management across the project


// Products Page Actions
export const productReducer = ( state, action ) => {

  switch ( action.type ) {

    case ACTIONS.SORT_BY_PRICE:
      return { ...state, sort: action.payload }

    case ACTIONS.FILTER_BY_STOCK:
      return { ...state, byStock: !state.byStock }

    case ACTIONS.FILTER_BY_DELIVERY:
      return { ...state, byFastDelivery: !state.byFastDelivery }

    case ACTIONS.FILTER_BY_RATING:
      return { ...state, byRating: action.payload }

    case ACTIONS.FILTER_BY_SEARCH:
      return { ...state, searchQuery: action.payload }

    case ACTIONS.CLEAR_FILTERS:
      return { byStock: false,
        byFastDelivery: false,
        byRating:0,
        searchQuery: "",
      };

    default:    
    return state;

  }
}  
// Cart Page Actions 
export const cartReducer = ( state, action ) => {

    switch ( action.type ) {

      case ACTIONS.ADD_TO_CART:
        return { ...state, cart: [ ...state.cart, { ...action.payload, qty: 1 }] };

      case ACTIONS.REMOVE_FROM_CART:
        return {
          ...state,
          cart: state.cart.filter((c) => c.id !== action.payload.id),
        };

      case ACTIONS.CHANGE_CART_QTY:
        return {
          ...state,
          cart: state.cart.filter((c) =>
            c.id === action.payload.id ? (c.qty = action.payload.qty) : c.qty),
        };

      default:
        return state;
    }
  };
