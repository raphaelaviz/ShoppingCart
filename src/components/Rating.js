import React from 'react'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'

// This component is responsible for the rating system. It maps over
// an array of 5 to render stars that are either filled or outlined depending
// on the index of the clicked star.
// In the Filters.js component, the clicked stars dispatch actions through the reducer functions.

const Rating = ({ rating, onClick, style }) => {

  return <>
    { [...Array(5)].map((_,index) => (
        <span key={ index } onClick={() => onClick(index)} style={ style }>

            { rating > index ? (

                <AiFillStar fontSize="15px"/>
            ) : ( 
                <AiOutlineStar fontSize="15px"/> 
            )}
        </span>
    ))}
        </>
  
}

export default Rating