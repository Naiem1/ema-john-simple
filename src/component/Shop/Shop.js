import React, { useState } from 'react';
import fakeData from '../../fakeData';
import Products from '../Products/Products';
import './Shop.css';
import Cart from '../Cart/Cart';


const Shop = () => {

  const first10 = fakeData.slice(0, 10);
  const [products, setProducts] = useState(first10);
  const [cart, setCart] = useState([]);

  const handleAddProduct = (products) => {
    const newCart = [...cart, products];
    setCart(newCart);
  }

  

  return (
    <div className="shop">
      <div className="product-container">
      {
        products.map(product => <Products
            product={product}
            key={product.key}
            handleAddProduct={handleAddProduct}
            >
            </Products>)

        }
      </div>
      <div className="cart-container">
        <Cart
        cart={cart}
        ></Cart>
      </div>
    </div>
  );
};

export default Shop;