import React from 'react'
import { Button, Col, Image, ListGroup, Row } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import { AiFillDelete } from "react-icons/ai";
import Rating from "./Rating";
import { useState,useEffect } from 'react';
import { CartState } from '../contexts/Context'
import { ACTIONS } from '../contexts/ReducerTypes'; 


// This component renders the Cart page

const Cart = () => {

  const {state:{cart},dispatch} = CartState()

  const [total, setTotal] = useState()


// useEffect hook used to update the price sum of the selected products and quantities

useEffect(() => {
  setTotal(cart.reduce((accumulator,current) => accumulator + Number(current.price*current.qty),0 ))
}, [cart])


return (
  <div className="home">
    <div className="productContainer">
      <ListGroup>
        {cart.map((prod) => (
          <ListGroup.Item
            key={ prod.id }
          >
            <Row>
              <Col md={ 2 }>
                <Image
                  src={ prod.image }
                  alt={ prod.name }
                  fluid rounded
                />
              </Col>
              <Col md={2}>
                <span>
                  { prod.name }
                </span>
              </Col>
              <Col md={ 2 }>
                $ { prod.price }
              </Col>
              <Col md={ 2 }>
                <Rating
                 rating={ prod.ratings } 
                />
              </Col>
              <Col md={ 2 }>
                <Form.Select
                  as="select"
                  value={prod.qty}
                  onChange={(e) =>
                    dispatch({
                      type: ACTIONS.CHANGE_CART_QTY,
                      payload: {
                        id: prod.id,
                        qty: e.target.value,
                      },
                    })
                  }
                >
                  {[...Array(prod.inStock).keys()].map((x) => (
                    <option key={x + 1}>{x + 1}</option>
                  ))}
                </Form.Select>
              </Col>
              <Col md={ 2 }>
                <Button
                  type="button"
                  variant="light"
                  onClick={() =>
                    dispatch({
                      type: ACTIONS.REMOVE_FROM_CART,
                      payload: prod,
                    })
                  }
                >
                  <AiFillDelete fontSize="20px" />
                </Button>
              </Col>
            </Row>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
    <div className="filters summary">
      <span className="title">
        Subtotal ({ cart.length }) items
      </span>
      <span style={{ fontWeight: 700, fontSize: 20 }}>
        Total: $ { total }
      </span>
      <Button
        type="button"
        disabled= { cart.length === 0 }
      >
        Proceed to checkout
      </Button>
    </div>
  </div>
);
};

export default Cart;