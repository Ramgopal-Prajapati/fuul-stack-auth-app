import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ItemForm from '../components/ItemForm';

const Home = () => {
  const [items, setItems] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/items`);
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const handleAddItem = async (formData) => {
    try {
      const token = JSON.parse(localStorage.getItem('user')).token;
      await axios.post(`${import.meta.env.VITE_API_URL}/items`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      setShowForm(false);
      fetchItems();
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  const handleEditItem = async (formData) => {
    try {
      const token = JSON.parse(localStorage.getItem('user')).token;
      await axios.put(`${import.meta.env.VITE_API_URL}/items/${editingItem._id}`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      setEditingItem(null);
      fetchItems();
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      const token = JSON.parse(localStorage.getItem('user')).token;
      await axios.delete(`${import.meta.env.VITE_API_URL}/items/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      fetchItems();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  if (!user) {
    return (
      <div className="container">
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <h2>Please login to view products</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      {user && (
        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          <button 
            onClick={() => setShowForm(!showForm)} 
            className="form-button"
            style={{ maxWidth: '200px', margin: '0 auto' }}
          >
            {showForm ? 'Cancel' : 'Add New Item'}
          </button>
        </div>
      )}
      
      {showForm && (
        <ItemForm onSubmit={handleAddItem} />
      )}
      
      {editingItem && (
        <ItemForm 
          onSubmit={handleEditItem} 
          initialData={editingItem} 
        />
      )}
      
      <div className="items-grid">
        {items.map(item => (
          <div key={item._id} className="item-card">
            {item.image && (
              <img 
                src={`${import.meta.env.VITE_API_URL.replace('/api', '')}/${item.image}`} 
                alt={item.name} 
                className="item-image"
              />
            )}
            <div className="item-details">
              <h3 className="item-name">{item.name}</h3>
              <p className="item-category">{item.category}</p>
              <p className="item-price">${item.price}</p>
              <p className="item-description">{item.description}</p>
              
              {user && user._id === item.createdBy._id && (
                <div className="item-actions">
                  <button 
                    onClick={() => setEditingItem(item)}
                    className="btn btn-edit"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDeleteItem(item._id)}
                    className="btn btn-delete"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;