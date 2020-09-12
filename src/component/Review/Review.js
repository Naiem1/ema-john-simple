 import React, { useEffect, useState } from 'react';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import happyImage from '../../images/giphy.gif'

const Review = () => {
  const [cart, setCart] = useState([]);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handlePlaceOrder = () => {
    setCart([]);
    setOrderPlaced(true);
    processOrder();
  }

  
  const handleRemoveProduct = (productKey) => {
    const newCart = cart.filter(pd => pd.key !== productKey);
    setCart(newCart);
    removeFromDatabaseCart(productKey);
  }
  useEffect(() => {
    const savedCart = getDatabaseCart();
    const productKeys = Object.keys(savedCart);
    const cartProduct = productKeys.map(key => {
      const product = fakeData.find(pd => pd.key === key);
      product.quantity = savedCart[key]
     
      return product;
      
    })
    
    setCart( cartProduct)
  }, [])

  let thanKyou;
  if (orderPlaced) {
    thanKyou = <img src={happyImage} />
  }
  return (
    <div className="twin-container">
      <div className="product-container">
        {
          
          cart.map(pd => <ReviewItem
            key={pd.key}
            removeProduct={handleRemoveProduct}
            product={pd}></ReviewItem>)
        }
        
        {
          thanKyou
        }

      </div>
      <div className="cart-container">
        <Cart cart={cart}>
          <button onClick={handlePlaceOrder} className="btn">Place Order</button>
        </Cart>
      </div>
    </div>
  );
};

export default Review;