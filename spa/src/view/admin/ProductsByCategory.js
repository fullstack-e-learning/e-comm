import React from 'react'
import { redirect, useNavigate, useParams } from 'react-router-dom';
import Product from '../../component/Product';

const ProductsByCategory = () => {
  const params = useParams();
  const apiHost = process.env.REACT_APP_API_HOST;
  const [category, setCategory] = React.useState([]);
  const navigate = useNavigate();
  const [reload, setReload] = React.useState(false);

  React.useEffect(() => {

    fetch(`${apiHost}/api/category/${params.categoryId}/product`)
      .then(response => response.json())
      .then(data => setCategory(data))
      .catch(error => console.error(error));

  },[params.categoryId, reload]);

  return (
    <div>
        <i className="bi bi-skip-backward custom__link" onClick={() => navigate('/admin/category')}></i>
        <h3>{category.name} Product</h3>
        <small>{category.description}</small>
        <div className='result_container'>
          { category?.products?.length > 0 ? 
              category?.products.map(product => <Product admin={true} key={product._id} product={product} refrehParent={() => setReload(!reload)} />) : 
              <p>No products found</p> }
        </div>
    </div>
  )
}

export default ProductsByCategory