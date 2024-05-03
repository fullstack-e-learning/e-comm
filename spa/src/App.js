import { useState } from 'react';
import './App.css';
import { Outlet } from 'react-router-dom';


function App() {

  return (
    <div className="app">
      <h2>
        <i className="bi bi-house"></i>
        / E-com
      </h2>
      <hr />
      <Outlet />
    </div>
  );
}

export default App;
