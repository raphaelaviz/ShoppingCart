import React from 'react'
import { Button, Form} from 'react-bootstrap';
import Rating from './Rating';
import { CartState } from '../contexts/Context';
import { ACTIONS } from '../contexts/ReducerTypes';

// This component handles the filtering feature, and consists in various Forms
// and Buttons that when checked/pressed, dispatch different action types and
// payloads to manage state across components via the Context API and useReducer combo.
// The actions are properly explained inside each productDispatch call.

const Filters = () => {
    
    const {productState: { byStock, byFastDelivery, sort, byRating}, productDispatch,} = CartState();
  
  return (
    <div className="filters">
      <span className="title">
        Filter Products
      </span>
      <span>
        <Form.Check
          inline
          label="Ascending Price"
          name="group1"
          type="radio"
          id={`inline-1`}
          onChange={() => 
          productDispatch({
            type: ACTIONS.SORT_BY_PRICE,
            payload: "lowToHigh",
          }) 
        }
        checked={sort === 'lowToHigh'? true: false}
        />
      </span>
      <span>
        <Form.Check
          inline
          label="Descending Price"
          name="group1"
          type="radio"
          id={`inline-2`}
          onChange={() => 
            productDispatch({
              type: ACTIONS.SORT_BY_PRICE,
              payload: "HighToLow",
            }) 
          }
          checked={sort === 'HighToLow'? true: false}
        />
      </span>
      <span>
        <Form.Check
          inline
          label="Show out of stock products"
          name="group1"
          type="checkbox"
          id={`inline-3`}
          onChange={() => 
            productDispatch({
              type: ACTIONS.FILTER_BY_STOCK,
            }) 
          }
          checked={byStock}
        />
      </span>
      <span>
        <Form.Check
          inline
          label="Fast delivery only"
          name="group1"
          type="checkbox"
          id={`inline-4`}
          onChange={() => 
            productDispatch({
              type: ACTIONS.FILTER_BY_DELIVERY,
            }) 
          }
          checked={byFastDelivery}
        />
      </span>
      <span>
        <label style={{ paddingRight: 10 }}>Minimum Rating: </label>
        <Rating
          rating={byRating}
          onClick={(index) => 
            productDispatch({
              type: ACTIONS.FILTER_BY_RATING,
              payload: index + 1})}
          style={{ cursor: "pointer" }}
        />
      </span>
      <Button
        variant="light"
        onClick={() => 
          productDispatch({
            type: ACTIONS.CLEAR_FILTERS,
          })}
      >
        Clear Filters
      </Button>
    </div>
  );
};

export default Filters;
