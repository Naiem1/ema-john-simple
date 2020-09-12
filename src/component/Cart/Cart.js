 import React from 'react';
import './Cart.css'
const Cart = (props) => {
  const cart = props.cart;
 
 
  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    const products = cart[i];
    total = (total + products.price * products.quantity).toFixed(2);
    total = Number(total);
    
  }

  // const total = cart.reduce((total, prd) => total + prd.price, 0);
  // console.log(total)
  
  const tax = Math.round(total / 10);
  
  let shipping = 0;
  if (total > 35) {
    shipping = 0;
  }
  else if (total > 15) {
    shipping = 4.99;
  }
  else if (total> 0) {
    shipping = 12.99;
  }

  const grandTotal = (total + tax + (shipping)).toFixed(2)

  return (
    <div className="cart">
      <h4>Order Summary</h4>
      <p>Items Orders: <span style={{ fontWeight: 'bold' }}>{cart.length}</span> </p>
      <p>Product Price: <span style={{ fontWeight: 'bold' }}>{total}</span> </p>
      <p>tex + VAT: <span style={{ fontWeight: 'bold' }}>{tax}</span> </p>
      <p>Shipping Cost: <span style={{ fontWeight: 'bold'}}>{shipping}</span> </p>
      <h3>Grand Total: <span style={{ fontWeight: 'bold'}}>{grandTotal}</span> </h3>
      { props.children}
    </div>
  );
};

export default Cart;