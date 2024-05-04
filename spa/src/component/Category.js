import React from 'react'

const Category = ({category={}}) => {
    const [isEdit, setIsEdit] = React.useState(true);
    const [editableCategory, setEditableCategory] = React.useState({});
    const apiHost = process.env.REACT_APP_API_HOST;
    const handleChange = (e) => {
        setEditableCategory({
            ...editableCategory,
            [e.target.name]: e.target.value
        });
    }

    return (
        <div className='categories__result__item'>
            {isEdit ? <h4>{category.name}</h4> : <input type="text" onChange={handleChange} value={category.name} />}
            <small>description</small>
            {isEdit ? <p>{category.description}</p> : <textarea onChange={handleChange} value={category.description}></textarea>}
            <hr/>
            <i className="bi bi-trash"></i>
            {isEdit ? <i className="bi bi-pencil-square" onClick={() => setIsEdit(!isEdit)}></i> : <i className="bi bi-floppy" onClick={() => setIsEdit(!isEdit)}></i>}
            <i className="bi bi-three-dots"></i>
        </div>
    )
}

export default Category