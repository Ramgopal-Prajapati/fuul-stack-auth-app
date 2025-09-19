import React, { useState } from 'react';

const ItemForm = ({ onSubmit, initialData = {} }) => {
  const [formData, setFormData] = useState({
    name: initialData.name || '',
    category: initialData.category || '',
    price: initialData.price || '',
    description: initialData.description || '',
    image: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const submitData = new FormData();
    submitData.append('name', formData.name);
    submitData.append('category', formData.category);
    submitData.append('price', formData.price);
    submitData.append('description', formData.description);
    if (formData.image) {
      submitData.append('image', formData.image);
    }
    
    onSubmit(submitData);
  };

  return (
    <form onSubmit={handleSubmit} className="add-item-form">
      <h2>{initialData._id ? 'Edit Item' : 'Add New Item'}</h2>
      
      <div className="form-group">
        <label className="form-label">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="form-input"
          required
        />
      </div>
      
      <div className="form-group">
        <label className="form-label">Category</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="form-input"
          required
        >
          <option value="">Select Category</option>
          <option value="TV">TV</option>
          <option value="Refrigerator">Refrigerator</option>
          <option value="Laptop">Laptop</option>
          <option value="Mobile">Mobile</option>
          <option value="AC">AC</option>
          <option value="Washing Machine">Washing Machine</option>
        </select>
      </div>
      
      <div className="form-group">
        <label className="form-label">Price ($)</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="form-input"
          required
        />
      </div>
      
      <div className="form-group">
        <label className="form-label">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="form-input"
          rows="3"
        />
      </div>
      
      <div className="form-group">
        <label className="form-label">Image</label>
        <input
          type="file"
          name="image"
          onChange={handleFileChange}
          className="form-input"
        />
      </div>
      
      <button type="submit" className="form-button">
        {initialData._id ? 'Update Item' : 'Add Item'}
      </button>
    </form>
  );
};

export default ItemForm;