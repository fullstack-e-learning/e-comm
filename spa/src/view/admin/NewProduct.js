import React from 'react'
import Products from '../../component/Products';

const NewProduct = () => {
  const apiHost = process.env.REACT_APP_API_HOST;
  const [product, setProduct] = React.useState({
    name: '',
    description: '',
    price: 0,
    quantity: 0,
    category: ''
  });
  const [categories, setCategories] = React.useState([]);
  const [category, setCategory] = React.useState('');
  const [products, setProducts] = React.useState({});
  const [message, setMessage] = React.useState('');
  const [refresh, setRefresh] = React.useState(false)

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value
    });

    if (e.target.name === 'category') {
      setCategory(e.target.value);
    }
  }

  React.useEffect(() => {
    fetch(`${apiHost}/api/category`)
      .then(response => response.json())
      .then(data => setCategories(data))
      .catch(error => console.error(error));
  }, []);

  React.useEffect(() => {
    if (category && category !== '') {
      fetch(`${apiHost}/api/category/${category}/product`)
        .then(response => response.json())
        .then(data => setProducts(data))
        .catch(error => console.error(error));
    }
  }, [category, refresh]);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log(product);
    fetch(`${apiHost}/api/product`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product)
    })
    .then(response => response.json())
    .then(data => {
      //This is just to avoid making another API call to get the products
      setProducts({...products, products: [...products.products, data]});
      setMessage('Product created successfully');
      setProduct({
        name: '',
        description: '',
        price: 0,
        quantity: 0,
        category: ''
      });
    })
    .catch(error => setMessage('Error creating product'));
  }


  return (
    <div className='form product__new'>
      <h3>Product Management</h3>

      <form onSubmit={handleOnSubmit}>
        <fieldset>
          <legend>New Product : </legend>
          
          <div className="form_field_parent">
            <label >
              <select name='category'  value={product.category} onChange={handleChange} className="form_field_child">
                <option value='' disabled>Select a Category</option>
                {categories.map(category => <option key={category._id} value={category._id}>{category.name}</option>)}
              </select>
              <small>{products.description}</small>
            </label>
          </div>

          <div className="form_field_parent">
            <label className="form_field_child">
              <input type='text' name='name' placeholder='Name' value={product.name} onChange={handleChange} />
            </label>
            <label>
              <input type='text' name='description' placeholder='Description' value={product.description} onChange={handleChange} />
            </label>
          </div>
          
          <div className="form_field_parent">
            <label className="form_field_child">
              <input type='number' name='price' placeholder='Price' value={product.price} onChange={handleChange} />
              <br/><small>Price</small>
            </label>
            <label>
              <input type='quantity' name='quantity' placeholder='Quantity' value={product.quantity} onChange={handleChange} />
              <br/><small>Quantity</small>
            </label>
          </div>
          <br />
          <button type='submit'>Create</button>
          <button type='reset'>Reset</button>
        </fieldset>
      </form>
      <hr />
      <h3>{message}</h3>
      <hr/>
      { category && category !== '' ? (
        <>
          <p>Showing All Products Under Category: {products.name} </p>
          <small>{products.description}</small>
          <p>Total number of Products are : {products?.products?.length}</p>
          <Products products={products.products} admin={true} refrehParent={()=> setRefresh(!refresh)}/>
        </>
      ) : <p>Select a Category to see the Products</p>}
      
    </div>
  )
}

export default NewProduct