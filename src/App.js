import React from 'react';
import Header from './component/Header/Header';
import Shop from './component/Shop/Shop';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Review from './component/Review/Review';
import Inventory from './component/Inventory/Inventory';
import NotFound from './component/NotFound/NotFound';
import Products from './component/Products/Products';
import ProductDetails from './component/ProductDetails/ProductDetails';
import Shipment from './Shipment/Shipment';
import Login from './Login/Login';



function App() {
 
  return (
    <div>
    <Header></Header>
      <Router>
      
        <Switch>
          <Route path="/shop">
            <Shop></Shop>
          </Route>
          <Route path="/review">
            <Review></Review>
          </Route>
          <Route path="/login">
            <Login></Login>
          </Route>
          <Route path="/shipment">
            <Shipment></Shipment>
          </Route>
          <Route path="/inventory">
            <Inventory></Inventory>
          </Route>
          <Route exact path="/">
            <Shop></Shop>
          </Route>
          <Route path="/product/:productKey">
            
            <ProductDetails></ProductDetails>
          </Route>
          <Route path="*">
            <NotFound></NotFound>
          </Route>
        </Switch>
      </Router>
     
     
    </div>
  );
}

export default App;
