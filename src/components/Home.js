import React from 'react'
import { CartState } from '../contexts/Context'
import SingleProducts from './SingleProducts';
import "./styles.css";
import Filters from './Filters';

// This component renders the Filter and SingleProduct component below the Header.
// It also applies the logic responsible for resorting the product lists
// according to which filters are applied.

const Home = () => {
  const {
    state: { products },
    productState: { sort, byStock, byFastDelivery, byRating, searchQuery },
  } = CartState();

  const filterProducts = () => {
    let sortedProducts = products;

    if (sort) {
      sortedProducts = sortedProducts.sort((a, b) =>
        sort === "lowToHigh" ? a.price - b.price : b.price - a.price
      );
    }

    if (!byStock) {
      sortedProducts = sortedProducts.filter((prod) => prod.inStock);
    }

    if (byFastDelivery) {
      sortedProducts = sortedProducts.filter((prod) => prod.fastDelivery);
    }

    if (byRating) {
      sortedProducts = sortedProducts.filter(
        (prod) => prod.ratings >= byRating
      );
    }

    if (searchQuery) {
      sortedProducts = sortedProducts.filter((prod) =>
        prod.name.toLowerCase().includes(searchQuery)
      );
    }

    return sortedProducts;
  };

  return (
    <div className="home">
      <Filters />
      <div className="productContainer">
        {filterProducts().map((prod) => (
          <SingleProducts
            prod={prod}
            key={prod.id}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;