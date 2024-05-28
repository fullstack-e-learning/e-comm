import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const Admin = () => {

  return (
    <div className="admin">
        <h2>
            <i className="bi bi-person-arms-up"></i>
             / E-com / Admin Space 
        </h2>
        <nav>
            <Link className='nav__item' to="/admin">Home</Link>
            <Link className='nav__item' to="/admin/category">Category</Link>
            <Link className='nav__item' to="/admin/product">Product</Link>
            <Link className='nav__item' to="/admin/order">Order</Link>
        </nav>
      <hr />
      <Outlet />
    </div>
  )
}

export default Admin