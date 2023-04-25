import React from 'react'
import {Navbar, Container, FormControl, Dropdown,Button} from "react-bootstrap"
import Badge from 'react-bootstrap/Badge';
import { AiFillDelete } from 'react-icons/ai'
import {FaShoppingCart} from 'react-icons/fa'
import {Link} from "react-router-dom"
import { CartState } from '../contexts/Context'
import { ACTIONS } from '../contexts/ReducerTypes';


// This components renders the page Header and all its tools

const Header = () => {
    const { state: { cart }, dispatch, productDispatch } = CartState();
  
    return (

        // Render the navigation bar

      <Navbar bg='dark' variant='dark' style={{ height: 80 }}>
        <Container>
          <Navbar.Brand>
            <Link to='/'>My Shopping Cart</Link>
          </Navbar.Brand>

          {/* Renders a search bar for filtering products */}

          <Navbar.Text className='search'>
            <FormControl
              style={{ width: 500 }}
              placeholder='Search a product'
              className='ml-auto'
              onChange={(e) => {

            // Dispatches the search filter action when the user types in the search bar

                productDispatch({
                  type: ACTIONS.FILTER_BY_SEARCH,
                  payload: e.target.value,
                });
              }}
            />
          </Navbar.Text>
  
          <Dropdown style={{ marginRight: '190px' }}>

            {/* Render the cart icon and badge */}

            <Dropdown.Toggle variant='success' id='dropdown-basic'>
              <FaShoppingCart fontSize='25' />
              <Badge bg='sucess'>{cart.length}</Badge>
            </Dropdown.Toggle>
  
            <Dropdown.Menu style={{ minWidth: 370 }}>
              {cart.length > 0 ? (

                // If the cart is not empty, renders each item in the cart

                <>
                  {cart.map((prod) => (
                    <span className='cartitem' key={prod.id}>
                      <img
                        src={prod.image}
                        className='cartItemImg'
                        alt={prod.name}
                      />
                      <div className='cartItemDetail'>
                        <span>{prod.name}</span>
                        <span>${prod.price}</span>
                      </div>

                      {/* Renders a delete button for each item */}

                      <AiFillDelete
                        fontSize='20px'
                        style={{ cursor: 'pointer' }}
                        onClick={() =>
                          dispatch({
                            type: ACTIONS.REMOVE_FROM_CART,
                            payload: prod,
                          })
                        }
                      />
                    </span>
                  ))}
                  <Link to='/cart'>
                    <Button style={{ width: '95%', margin: '0 10px' }}>
                      Go to Cart
                    </Button>
                  </Link>
                </>
              ) : (
                
                <span style={{ padding: 10 }}>Cart is empty!</span>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </Container>
      </Navbar>
    );
  };

export default Header