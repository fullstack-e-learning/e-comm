import React from 'react'

const Product = ({product, refrehParent=()=>{}, admin=false}) => {
    const apiHost = process.env.REACT_APP_API_HOST;
    
    const [isEdit, setIsEdit] = React.useState(true);
    const [editableProduct, setEditableProduct] = React.useState({});
    const [quantity, setQuantity] = React.useState(1);
    
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
                refrehParent();
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

    const addToCart = () => {
        // const quantity = document.querySelector('.quantity').value;
        // const cart = JSON.parse(localStorage.getItem('cart'));
        // const productIndex = cart.findIndex(item => item._id === product._id);
        // if(productIndex === -1) {
        //     cart.push({
        //         ...product,
        //         quantity
        //     });
        // } else {
        //     cart[productIndex].quantity = parseInt(cart[productIndex].quantity) + parseInt(quantity);
        // }
        // localStorage.setItem('cart', JSON.stringify(cart));
        console.log({...product, quantity})
    }

    const addToFavorite = () => {
        const favorite = JSON.parse(localStorage.getItem('favorite'));
        const productIndex = favorite.findIndex(item => item._id === product._id);
        if(productIndex === -1) {
            favorite.push(product);
        }
        localStorage.setItem('favorite', JSON.stringify(favorite));
    }
    
    if(admin) {
        return (
            <div className='result_container__item'>
                {isEdit ? <h4>{product.name}</h4> : <label>Name<input className='editBox' type="text" name="name" onChange={handleChange} value={editableProduct.name} /></label>}
                {isEdit ? <p>{product.description}</p> : <label>Description<textarea type="text" name="description" onChange={handleChange} value={editableProduct.description} /></label>}
                {isEdit ? <p><small>Price: </small>{product.price}</p>: <label>Price <input className='editBox' type="number" name="price" onChange={handleChange} value={editableProduct.price} /></label>}
                {isEdit ? <p><small>Quantity: </small>{product.quantity}</p> : <label>Quantity <input className='editBox' type="number" name="quantity" onChange={handleChange} value={editableProduct.quantity} /></label>}
                <hr/>
                <i className="bi bi-trash" onClick={deleteProduct}></i>
                {isEdit ? <i className="bi bi-pencil-square" onClick={() => setIsEdit(!isEdit)}></i> : <i className="bi bi-floppy" onClick={updateProduct}></i>}
            </div>
        )
    } else {
        return (
            <div className='result_container__item'>
                <h4>{product.name}</h4>
                <p>{product.description}</p>
                <small>Price: {product.price}</small>
                <br/>
                <small>Quantity: </small>
                <input type='number' className='quantity' name='quantity' defaultValue={1} min={1} max={product.quantity} onChange={(e) => setQuantity(e.target.value)} />
                <br/><small>Hurry , Only {product.quantity } left!</small>
                <hr/>
                <i className="bi bi-cart" onClick={addToCart}></i>
                <i className="bi bi-heart" onClick={addToFavorite}></i>
            </div>
        )
    }
    
}

export default Product