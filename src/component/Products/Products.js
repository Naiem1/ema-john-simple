import React from 'react';
import './Products.css'
import { Link } from 'react-router-dom';

const Products = (props) => {
 
  const product = props.product;
  const handleAddProduct = props.handleAddProduct;
  const {name, img, seller, price, stoke, key  } = product;
  return (
    <div className="product">
      <div className="img">
        <img src={img} alt=""/>
      </div>
      <div className="products-name">
        <h4><Link to={"/product/" + key}>{name}</Link></h4>
        <p><small>by: {seller}</small></p>
        <p>price: ${price}</p>
        <p>Only {stoke} let in stoke - Order soon</p>
        <br />
       { props.showAddToCart=== true && <button className="btn"
          onClick={() => handleAddProduct(product)}
        >Buy Now</button>}

      </div>
    </div>
  );
};

export default Products;