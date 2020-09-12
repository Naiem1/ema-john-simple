import React from 'react';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData';
import Products from '../Products/Products';

const ProduceDetails = () => {

  const { productKey } = useParams()
  const product = fakeData.find(pd => pd.key === productKey);
  
  return (
    <div>
      <h1>Your Product Details</h1>
      <Products
        showAddToCart={false}
        product={product}></Products>
    </div>
  );
};

export default ProduceDetails;