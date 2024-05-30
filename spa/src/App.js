import React, { useState } from 'react';
import './App.css';
import { Outlet } from 'react-router-dom';


function App() {

  const [cartCount, setCartCount] = useState(0);
  const [favoriteCount, setFavoriteCount] = useState(0);
  
  React.useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart'));
    const favorite = JSON.parse(localStorage.getItem('favorite'));
    setCartCount(cart.length);
    setFavoriteCount(favorite.length);
  },[])

  return (
    <div className="app">
      <h2>
        <i className="bi bi-house"></i>/ E-com
      </h2>
      <div className='app__oprtation'>
        <i className="app__oprtation__icon bi bi-heart">({favoriteCount})</i>
        <i className="app__oprtation__icon bi bi-cart">({cartCount})</i>
      </div>
      <hr />
      <Outlet />
    </div>
  );
}

export default App;
