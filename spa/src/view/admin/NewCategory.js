import React from 'react'
import Categories from '../../component/Categories';

const NewCategory = () => {
  const [category, setCategory] = React.useState({
    name: '',
    description: ''
  });
  const [refresh, setRefresh] = React.useState(false);

  const apiHost = process.env.REACT_APP_API_HOST;

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${apiHost}/api/category`, 
    { 
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(category)
    })
      .then(response => response.json())
      .then(data => {
        setCategory({
          name: '',
          description: ''
        });
        setRefresh(!refresh);        
      })
      .catch(error => console.error(error));
  }

  const handleInputChange = (e) => {
    setCategory({
      ...category,
      [e.target.name]: e.target.value
    });
  }

  return (
    <div className="admin__category">
      <h3>Category Management</h3>
      <form onSubmit={handleSubmit} className='form'>
        <fieldset>
          <legend>New Category :</legend>
          <label>
            <input type="text" name="name" placeholder="Name" value={category.name} onChange={handleInputChange} />
          </label>
          <br />
          <label>
            <input type="text" name="description" placeholder="Description" value={category.description} onChange={handleInputChange} />
          </label>
          <br />
          <button type="submit">Create</button>
          <button type="reset">Reset</button>
        </fieldset>
      </form>

      <Categories refresh={refresh} />

    </div>
  )
}

export default NewCategory