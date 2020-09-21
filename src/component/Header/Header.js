import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.png';

// Styling start
// ==============
const img = {
  height: '85px',
 
}

const header = {
  textAlign: 'center'
}

const nav = {
  background: '#333',
  width: '100%'
 
  
  
}

const ul = {
  display: 'flex',
  listStyle: 'none',
  justifyContent: 'space-around',
  width: '700px'
}

const a = {
  padding: '15px 15px',
  display: 'block',
  color: '#fff',
  textDecoration: 'none',
  fontWeight: '500',
  fontSize: '18px',
  letterSpacing: '2px'
}

// ==========/Styling End==========

const addHover = (event) => {
  event.target.style.background = '#000';
}
 
const outHover = (event) => {
  event.target.style.background = "";
}




const Header = () => {
  return (
    <div>
      <header style={header}>
        <img style={img} src={logo} alt="" />
        <nav style={nav}>
          <ul style={ul}>
            <Link to="/shop"><li><a onMouseOver={addHover} onMouseOut={outHover} style={a} >Shop</a></li></Link>
            <Link to="/review"> <li><a onMouseOver={addHover} onMouseOut={outHover} style={a} >Order Review</a></li></Link>
            <Link to="/inventory"><li><a onMouseOver={addHover} onMouseOut={outHover} style={a} >Manage Inventory</a></li></Link>
          </ul>
        </nav>

      </header>
    </div>
  );
};

export default Header;