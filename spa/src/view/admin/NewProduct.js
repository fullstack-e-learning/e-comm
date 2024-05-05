import React from 'react'

const NewProduct = () => {
  return (
    <div className='form product__new'>
      <h3>Organise Product</h3>
      <form>
        <fieldset>
          <legend>New Product:</legend>
          <label>
            <input type='text' name='name' placeholder='Name' />
          </label>
          <br />
          <label>
            <input type='text' name='description' placeholder='Description' />
          </label>
          <br />
          <label>
            <input type='number' name='price' placeholder='Price' />
          </label>
          <br />
          <label>
            <select name='category'>
              <option value=''>Select a Category</option>
            </select>
          </label>
          <br />
          <button type='submit'>Create</button>
          <button type='reset'>Reset</button>
        </fieldset>
      </form>
    </div>
  )
}

export default NewProduct