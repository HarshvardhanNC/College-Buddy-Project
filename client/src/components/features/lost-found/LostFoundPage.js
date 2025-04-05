import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './LostFound.css';
import LostFoundForm from './LostFoundForm';

const LostFoundPage = () => {
    const [items, setItems] = useState([]);
    const [filter, setFilter] = useState('all'); // 'all', 'lost', 'found'
    const [showAddForm, setShowAddForm] = useState(false);
    const currentUser = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/lost-found/items');
            console.log('Fetched items:', response.data); // Debug log
            setItems(response.data);
        } catch (error) {
            console.error('Error fetching items:', error);
        }
    };

    const handleAddItem = async (itemData) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('No authentication token found');
                return;
            }
            const response = await axios.post('http://localhost:5000/api/lost-found/items', itemData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log('Item added successfully:', response.data);
            fetchItems();
            setShowAddForm(false);
        } catch (error) {
            console.error('Error adding item:', error.response?.data || error.message);
            alert('Failed to add item. Please try again.');
        }
    };

    const handleMarkAsClaimed = async (itemId) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('No authentication token found');
                return;
            }
            console.log('Marking item as claimed:', itemId);
            const response = await axios.post(`http://localhost:5000/api/lost-found/items/${itemId}/mark-claimed`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log('Item marked as claimed successfully:', response.data);
            fetchItems();
        } catch (error) {
            console.error('Error marking item as claimed:', error.response?.data || error.message);
            alert('Failed to mark item as claimed. Please try again.');
        }
    };

    const filteredItems = items.filter(item => {
        if (filter === 'all') return true;
        return item.type === filter;
    });

    // Debug log
    console.log('Current user:', currentUser);

    return (
        <div className="lost-found-container">
            <div className="lost-found-header">
                <h1>Lost & Found</h1>
                <div className="filter-buttons">
                    <button 
                        className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                        onClick={() => setFilter('all')}
                    >
                        All Items
                    </button>
                    <button 
                        className={`filter-btn ${filter === 'lost' ? 'active' : ''}`}
                        onClick={() => setFilter('lost')}
                    >
                        Lost Items
                    </button>
                    <button 
                        className={`filter-btn ${filter === 'found' ? 'active' : ''}`}
                        onClick={() => setFilter('found')}
                    >
                        Found Items
                    </button>
                </div>
                <button 
                    className="add-item-btn"
                    onClick={() => setShowAddForm(true)}
                >
                    Report Item
                </button>
            </div>

            <div className="items-grid">
                {filteredItems.map(item => {
                    // Debug log for each item
                    console.log('Item:', item);
                    console.log('Item reportedBy:', item.reportedBy);
                    console.log('Current user id:', currentUser?.id);
                    
                    return (
                        <div key={item._id} className={`item-card ${item.type}`}>
                            {item.imageUrl && (
                                <img src={item.imageUrl} alt={item.title} className="item-image" />
                            )}
                            <div className="item-content">
                                <h3>{item.title}</h3>
                                <p className="item-description">{item.description}</p>
                                <div className="item-details">
                                    <span>Location: {item.location}</span>
                                    <span>Date: {new Date(item.date).toLocaleDateString()}</span>
                                </div>
                                <p className="item-contact">
                                    Contact: {item.contact}
                                </p>
                                {/* Show Mark as Claimed button only to the poster of found items */}
                                {item.reportedBy && 
                                 item.reportedBy.toString() === currentUser?.id && 
                                 item.type === 'found' && 
                                 !item.claimed && (
                                    <button 
                                        className="mark-claimed-btn"
                                        onClick={() => handleMarkAsClaimed(item._id)}
                                    >
                                        ✅ Mark as Claimed
                                    </button>
                                )}
                                {/* Show Claimed badge for claimed items */}
                                {item.claimed && (
                                    <div className="claimed-badge">
                                        <span>✅ Claimed</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {showAddForm && (
                <LostFoundForm 
                    onSubmit={handleAddItem}
                    onClose={() => setShowAddForm(false)}
                />
            )}
        </div>
    );
};

export default LostFoundPage; 