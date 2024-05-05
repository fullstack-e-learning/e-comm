import React from 'react'
import { redirect, useNavigate } from "react-router-dom";

const Category = ({category={}, reloadParent=()=>{}}) => {
    const [isEdit, setIsEdit] = React.useState(true);
    const [editableCategory, setEditableCategory] = React.useState({});
    const apiHost = process.env.REACT_APP_API_HOST;
    const navigate = useNavigate();

    React.useEffect(() => {
        setEditableCategory(category);
    }, [category]);

    const handleChange = (e) => {
        setEditableCategory({
            ...editableCategory,
            [e.target.name]: e.target.value
        });
    }
    const deleteCategory = () => {
        fetch(`${apiHost}/api/category/${category._id}`, { method: 'DELETE' })
            .then(response => response.json())
            .then(data => {
                reloadParent()
            })
            .catch(error => console.error(error));
    }

    const updateCategory = () => {
        fetch(`${apiHost}/api/category/${category._id}`, 
        { 
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(editableCategory)
        })
            .then(response => response.json())
            .then(data => {
                setEditableCategory({});
                setIsEdit(!isEdit);
                reloadParent();
            })
            .catch(error => console.error(error));
    }

    return (
        <div className='result_container__item'>
            {isEdit ? <h4>{category.name}</h4> : <input type="text" name="name" onChange={handleChange} value={editableCategory.name} />}
            <small>description</small>
            {isEdit ? <p>{category.description}</p> : <textarea name='description' onChange={handleChange} value={editableCategory.description}></textarea>}
            <hr/>
            <i className="bi bi-trash" onClick={deleteCategory}></i>
            {isEdit ? <i className="bi bi-pencil-square" onClick={() => setIsEdit(!isEdit)}></i> : <i className="bi bi-floppy" onClick={updateCategory}></i>}
            <i className="bi bi-three-dots" onClick={() => navigate(`/admin/category/${category._id}`)}></i>
        </div>
    )
}

export default Category