import React, { useState, useEffect } from 'react';
import './App.css'; 

function App() {
  // State for Restaurants
  const [restaurants, setRestaurants] = useState([]);
  const [restForm, setRestForm] = useState({ id: '', name: '', location: '', rating: '', adminId: '' });

  // State for Food Items
  const [foodItems, setFoodItems] = useState([]);
  const [foodForm, setFoodForm] = useState({ id: '', name: '', price: '', category: '', restaurantId: '' });

  // Fetch Data
  const fetchData = async () => {
    const restRes = await fetch('http://localhost:5001/api/restaurants');
    setRestaurants(await restRes.json());

    const foodRes = await fetch('http://localhost:5001/api/food');
    setFoodItems(await foodRes.json());
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Submit Handlers
  const handleRestSubmit = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:5001/api/restaurants', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(restForm)
    });
    fetchData(); 
    setRestForm({ id: '', name: '', location: '', rating: '', adminId: '' }); 
  };

  const handleFoodSubmit = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:5001/api/food', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(foodForm)
    });
    fetchData(); 
    setFoodForm({ id: '', name: '', price: '', category: '', restaurantId: '' }); 
  };

  return (
    <div className="container">
      <h1>Food Delivery Admin Panel</h1>
      
      {/* RESTAURANT SECTION */}
      <div className="card">
        <h2>Add New Restaurant</h2>
        <form onSubmit={handleRestSubmit} className="form-grid">
          <input type="number" placeholder="Restaurant ID" value={restForm.id} onChange={e => setRestForm({...restForm, id: e.target.value})} required />
          <input type="text" placeholder="Name" value={restForm.name} onChange={e => setRestForm({...restForm, name: e.target.value})} required />
          <input type="text" placeholder="Location" value={restForm.location} onChange={e => setRestForm({...restForm, location: e.target.value})} required />
          <input type="number" step="0.1" placeholder="Rating" value={restForm.rating} onChange={e => setRestForm({...restForm, rating: e.target.value})} required />
          <input type="number" placeholder="Admin ID" value={restForm.adminId} onChange={e => setRestForm({...restForm, adminId: e.target.value})} required />
          <button type="submit">Insert Restaurant</button>
        </form>

        <h3>Current Restaurants</h3>
        <table>
          <thead>
            <tr><th>ID</th><th>Name</th><th>Location</th><th>Rating</th><th>Admin ID</th></tr>
          </thead>
          <tbody>
            {restaurants.map(rest => (
              <tr key={rest.restaurant_id}>
                <td>{rest.restaurant_id}</td><td>{rest.name}</td><td>{rest.location}</td><td>{rest.rating}</td><td>{rest.admin_id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* FOOD ITEM SECTION */}
      <div className="card">
        <h2>Add Menu Item</h2>
        <form onSubmit={handleFoodSubmit} className="form-grid">
          <input type="number" placeholder="Food ID" value={foodForm.id} onChange={e => setFoodForm({...foodForm, id: e.target.value})} required />
          <input type="text" placeholder="Food Name" value={foodForm.name} onChange={e => setFoodForm({...foodForm, name: e.target.value})} required />
          <input type="number" step="0.01" placeholder="Price" value={foodForm.price} onChange={e => setFoodForm({...foodForm, price: e.target.value})} required />
          <input type="text" placeholder="Category" value={foodForm.category} onChange={e => setFoodForm({...foodForm, category: e.target.value})} required />
          <input type="number" placeholder="Restaurant ID" value={foodForm.restaurantId} onChange={e => setFoodForm({...foodForm, restaurantId: e.target.value})} required />
          <button type="submit" style={{backgroundColor: '#27ae60'}}>Insert Food Item</button>
        </form>

        <h3>Current Menu Items</h3>
        <table>
          <thead>
            <tr><th>Food ID</th><th>Name</th><th>Price</th><th>Category</th><th>Restaurant ID</th></tr>
          </thead>
          <tbody>
            {foodItems.map(food => (
              <tr key={food.food_id}>
                <td>{food.food_id}</td><td>{food.name}</td><td>₹{food.price}</td><td>{food.category}</td><td>{food.restaurant_id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}

export default App;