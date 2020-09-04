import React from 'react';
import './Products.css'

const Products = (props) => {
  const product = props.product;
  const handleAddProduct = props.handleAddProduct;
  const {name, img, seller, price, stoke  } = product;

  return (
    <div className="product">
      <div className="img">
        <img src={img} alt=""/>
      </div>
      <div className="products-name">
        <h4>{name}</h4>
        <p><small>by: {seller}</small></p>
        <p>price: ${price}</p>
        <p>Only {stoke} let in stoke - Order soon</p>
        <br />
        <button className="btn"
          onClick={() => handleAddProduct(product)}
        >Buy Now</button>

      </div>
    </div>
  );
};

export default Products;