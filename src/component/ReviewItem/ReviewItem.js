import React from 'react';

const ReviewItem = (props) => {
 
  const { name, quantity, key, price } = props.product;
  const productStyle = {
    borderBottom: '1px solid lightgrey',
    marginBottom: '5px',
    paddingBottom: '5px',
    marginLeft: '200px'
  }

  return (
    <div style={productStyle} className="review-item">
      <h4 className="product-name">{name}</h4>
      <p>Quantity: {quantity}</p>
      <p><small>${price}</small></p>
      <br />
      <button
        className="btn"
        onClick = {() => props.removeProduct(key)}
      >Remove</button>
    </div>
  );
};

export default ReviewItem;