import React from 'react'
import { Button, Card } from 'react-bootstrap'
import { CartState } from '../contexts/Context'
import Rating from './Rating'
import { ACTIONS } from '../contexts/ReducerTypes';


// This component renders each product's card and its variations

const SingleProducts = ({ prod }) => {

const { state: {cart}, dispatch,} = CartState();

return (
  <div className='products'>
    <Card>
      <Card.Img variant='top' src={prod.image} alt={prod.name} />
      <Card.Body>
        <Card.Title>{prod.name}</Card.Title>
        <Card.Subtitle style={{ paddingBottom: 10 }}>
          <span>${prod.price}</span>

          {/* Displays 'Fast Delivery' if fastDelivery prop is true, otherwise display '6 days delivery' */}

          {prod.fastDelivery ? (
            <div>Fast Delivery</div>
          ) : (
            <div>6 days delivery</div>
          )}

          {/* Displays the product's rating based on the Rating component */}

          <Rating rating={prod.ratings} />
        </Card.Subtitle>

        { /* If the product is already in the cart, shows a 'Remove from cart' button */}

        {cart.some((p) => p.id === prod.id) ? (
          <Button
            onClick={() => {
              dispatch({
                type: ACTIONS.REMOVE_FROM_CART,
                payload: prod,
              });
            }}
            variant='danger'
          >
            Remove from cart
          </Button>
        ) : (

          // If the product is not in the cart, shows an 'Add to cart' button
          // Add to cart button is disabled if the product is out of stock

          <Button
            onClick={() => {
              dispatch({
                type: ACTIONS.ADD_TO_CART,
                payload: prod,
              });
            }}
            disabled={!prod.inStock}
          >
            {/* Display 'Out of Stock' if the product is out of stock, otherwise displays 'Add to cart' */}

            {!prod.inStock ? 'Out of Stock' : 'Add to cart'}
          </Button>
        )}
      </Card.Body>
    </Card>
  </div>
)
  
}

export default SingleProducts