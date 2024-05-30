import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {

    return (
        <div>
            <h2>Admin Space</h2>
            <p>Here you can manage your products and categories</p>
            <p>To manage , Click on below links or above tabs</p>
            <small>is Under construction</small>
            <p>Total available Categories : 0, To manage <Link to="/admin/category">click</Link> here!</p>
            <p>Total available Products: 0, To manage <Link to="/admin/product">click</Link> here!</p>
            <p>Total available Orders: 0, To manage <Link to="/admin/order">click</Link> here!</p>
             
        </div>
    )
}

export default Home