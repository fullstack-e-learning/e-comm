import React, { useEffect } from 'react'
import Products from '../../component/Products';

const Dashboard = () => {
  const apiHost = process.env.REACT_APP_API_HOST;
  const [categories, setCategories] = React.useState([]);
  const [category, setCategory] = React.useState('all');
  const [products, setProducts] = React.useState([]);

  const allCategory = () => {
    fetch(`${apiHost}/api/category`)
      .then(response => response.json())
      .then(data => setCategories(data))
      .catch(error => console.error(error));
  }

  const productsByCategory = (categoryId) => {
    fetch(`${apiHost}/api/category/${categoryId}/product`)
      .then(response => response.json())
      .then(data => setProducts(data?.products))
      .catch(error => console.error(error));
  }

  const allProducts = () => {
    fetch(`${apiHost}/api/product`)
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error(error));
  }

  //Fetch all the Category and products
  useEffect(() => {
    allCategory()
  },[])

  useEffect(() => {
    if(category === 'all') {
      allProducts()
    } else{
      productsByCategory(category)
    }
  },[category])


  return (
    <div className='customer__dashboard'>
      <small>Product Filter By</small> <br/>
      <button onClick={() => setCategory('all')}>All</button>
      {
        categories 
        ? 
          categories.map(category => <button key={category._id} onClick={() => setCategory(category._id)}>{category.name}</button>) 
        : 
          <p>No Catogery Found!</p>
      }
      <input type='text' placeholder='Seach Product...' disabled/>
      
      <hr/>
      { products && products.length > 0
        ?
          <Products products={products} />
        :
          <p>No Products Found!</p>
      }
    </div>
  )
}

export default Dashboard