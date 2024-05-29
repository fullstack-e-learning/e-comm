import React from 'react'
import Product from './Product'

const Products = ({ products=[], admin=false , refrehParent=()=>{}}) => {
    return (
        <div className='result_container'>
            { products?.length > 0 
                ? 
                    products.map(product => <Product admin={admin} key={product._id} product={product} refrehParent={refrehParent} />) 
                : 
                    <p>No products found</p> 
            }
        </div>
    )
}

export default Products