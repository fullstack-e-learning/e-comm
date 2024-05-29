import React from 'react'
import { redirect, useNavigate, useParams } from 'react-router-dom';
import Product from '../../component/Product';
import Products from '../../component/Products';

const ProductsByCategory = () => {
  const params = useParams();
  const apiHost = process.env.REACT_APP_API_HOST;
  const [category, setCategory] = React.useState([]);
  const navigate = useNavigate();
  const [refresh, setRefresh] = React.useState(false);

  React.useEffect(() => {

    fetch(`${apiHost}/api/category/${params.categoryId}/product`)
      .then(response => response.json())
      .then(data => setCategory(data))
      .catch(error => console.error(error));

  },[params.categoryId, refresh]);

  return (
    <div>
        <i className="bi bi-skip-backward custom__link" onClick={() => navigate('/admin/category')}></i>
        <h3>{category.name} Product</h3>
        <small>{category.description}</small>
        {category?.products?.length > 0 
          ? 
            <Products products={category.products} admin={true} refrehParent={()=> setRefresh(!refresh)}/>
          : 
            <p>No products found</p>
        }

    </div>
  )
}

export default ProductsByCategory