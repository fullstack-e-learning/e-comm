import { useState } from 'react';
import './App.css';
import { Outlet } from 'react-router-dom';


function App() {

  return (
    <div className="app">
      <h2>
        <i className="bi bi-house"></i>/ E-com
      </h2>
      <div className='app__oprtation'>
        <i className="app__oprtation__icon bi bi-heart"></i>
        <small>(0)</small>
        <i className="app__oprtation__icon bi bi-cart"></i>
        <small>(0)</small>
      </div>
      <hr />
      <Outlet />
    </div>
  );
}

export default App;
