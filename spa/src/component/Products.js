import React from 'react'
import Product from './Product'

const Products = ({ products=[], admin=false }) => {
    return (
        <div className='result_container'>
            { products?.length > 0 
                ? 
                    products.map(product => <Product admin={admin} key={product._id} product={product} refrehParent={() => console.log("REFRESH EVENT")} />) 
                : 
                    <p>No products found</p> 
            }
        </div>
    )
}

export default Products