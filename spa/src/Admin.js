import React from 'react'
import { Outlet } from 'react-router-dom'

const Admin = () => {
  return (
    <div className="admin">
        <h2>
            <i className="bi bi-person-arms-up"></i>
             / E-com / Admin Space
        </h2>
      <hr />
      <Outlet />
    </div>
  )
}

export default Admin