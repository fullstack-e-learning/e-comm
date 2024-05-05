import React from 'react'

const Product = ({product, refrehParent=()=>{}}) => {
    const apiHost = process.env.REACT_APP_API_HOST;
    const [isEdit, setIsEdit] = React.useState(true);
    const [editableProduct, setEditableProduct] = React.useState({});
    
    React.useEffect(() => {
        setEditableProduct(product);
    }, [product]);

    const handleChange = (e) => {
        setEditableProduct({
            ...editableProduct,
            [e.target.name]: e.target.value
        });
    }

    const deleteProduct = () => {
        fetch(`${apiHost}/api/product/${product._id}`, { method: 'DELETE' })
            .then(response => response.json())
            .then(data => {
                console.log(data);
            })
            .catch(error => console.error(error));
    }

    const updateProduct = () => {
        fetch(`${apiHost}/api/product/${product._id}`, 
        { 
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(editableProduct)
        })
            .then(response => response.json())
            .then(data => {
                setEditableProduct({});
                setIsEdit(!isEdit);
                refrehParent();
            })
            .catch(error => console.error(error));
    }

    return (
        <div className='result_container__item'>
            {isEdit ? <h4>{product.name}</h4> : <label>Name<input type="text" name="name" onChange={handleChange} value={editableProduct.name} /></label>}
            {isEdit ? <p>{product.description}</p> : <label>Description<textarea type="text" name="description" onChange={handleChange} value={editableProduct.description} /></label>}
            {isEdit ? <small>{product.price}</small> : <label>Price <input type="number" name="price" onChange={handleChange} value={editableProduct.price} /></label>}
            <hr/>
            <i className="bi bi-trash" onClick={deleteProduct}></i>
            {isEdit ? <i className="bi bi-pencil-square" onClick={() => setIsEdit(!isEdit)}></i> : <i className="bi bi-floppy" onClick={updateProduct}></i>}
        </div>
    )
}

export default Product