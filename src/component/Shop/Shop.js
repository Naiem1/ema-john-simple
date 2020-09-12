import React, { useState, useEffect } from 'react';
import fakeData from '../../fakeData';
import Products from '../Products/Products';
import './Shop.css';
import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { Link } from 'react-router-dom';


const Shop = () => {

  const first10 = fakeData.slice(0, 10);
  const [products, setProducts] = useState(first10);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = getDatabaseCart();
    const productKeys = Object.keys(savedCart);
    const previousCart = productKeys.map(existingKey => {
      const product = fakeData.find(pd => pd.key === existingKey);
      product.quantity = savedCart[existingKey];
      return product;      

    })
    setCart(previousCart);

  }, [])

  const handleAddProduct = (products) => {
    const toBeaddedKey = products.key;
    const sameProduct = cart.find(pd => pd.key === toBeaddedKey);
    let count = 1;
    let newCart;
    if (sameProduct) {
      count = sameProduct.quantity + 1;
      sameProduct.quantity = count;
      const others = cart.filter(pd => pd.key !== toBeaddedKey);
      newCart = [...others, sameProduct];
    }
    else {
      products.quantity = 1;
      newCart = [...cart, products];
    }
    setCart(newCart);
    
    addToDatabaseCart(products.key, count)
  }

  

  return (
    <div className="twin-container">
      <div className="product-container">
      {
          products.map(product => <Products
            showAddToCart={true}
            product={product}
            key={product.key}
            handleAddProduct={handleAddProduct}
            ></Products>)

        }
      </div>
      <div className="cart-container">
        <Cart cart={cart}>
            <Link to="/review">
                <button className="btn">Review Order</button>
            </Link>
        </Cart>
      </div>
    </div>
  );
};

export default Shop;