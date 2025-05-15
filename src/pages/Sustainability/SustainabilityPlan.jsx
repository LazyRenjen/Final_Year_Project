// SustainabilityPlan.jsx
import React, { useState, useEffect } from 'react';
import './Sustinability.css'; // Import your CSS file for styling
import Footer from '../../components/Footer/footer';

const SustainabilityPlan = () => {
  const [plans, setPlans] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editPlan, setEditPlan] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [planToDelete, setPlanToDelete] = useState(null);
  const [formData, setFormData] = useState({
    destination: '',
    activities: '',
    planDate: ''
  });

  useEffect(() => {
    fetchPlans();
  }, []);

  useEffect(() => {
    // Add/remove dialog-open class to prevent background scrolling
    if (showConfirm || showForm) {
      document.body.classList.add('dialog-open');
    } else {
      document.body.classList.remove('dialog-open');
    }
    
    // Cleanup on unmount
    return () => {
      document.body.classList.remove('dialog-open');
    };
  }, [showConfirm, showForm]);

  const handleDeleteClick = (id, destination) => {
    setPlanToDelete({ id, destination });
    setShowConfirm(true);
  };
  
  const confirmDelete = async () => {
    if (planToDelete) {
      try {
        const response = await fetch(
          `http://localhost:5000/api/sustainability/${planToDelete.id}`, 
          {
            method: 'DELETE',
            credentials: 'include'
          }
        );
        
        if (!response.ok) {
          if (response.status === 401) {
            window.location.href = '/login';
            return;
          }
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to delete');
        }
        
        fetchPlans();
      } catch (error) {
        console.error('Delete failed:', error);
        // Add user feedback here (e.g., toast notification)
      } finally {
        setShowConfirm(false);
        setPlanToDelete(null);
      }
    }
  };

  const fetchPlans = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/sustainability', {
        credentials: 'include' // Include cookies
      });
  
      if (!response.ok) {
        if (response.status === 401) {
          window.location.href = '/login';
          return;
        }
        throw new Error(`Server error: ${response.status}`);
      }
  
      const data = await response.json();
      setPlans(data);
    } catch (error) {
      console.error('Failed to load plans:', error);
      setPlans([]);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = editPlan 
  ? `http://localhost:5000/api/sustainability/${editPlan._id}`
  : 'http://localhost:5000/api/sustainability';
      
    try {
      const response = await fetch(url, {
        method: editPlan ? 'PUT' : 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Send cookies
        body: JSON.stringify({
          ...formData,
          activities: formData.activities.split(',').map(activity => activity.trim())
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to save');
      }
      fetchPlans();
      resetForm();
    } catch (error) {
      console.error('Error saving plan:', error);
    }
  };

  const setupEditMode = (plan) => {
    setEditPlan(plan);
    setFormData({
      destination: plan.destination,
      activities: plan.activities.join(', '),
      planDate: new Date(plan.planDate).toISOString().split('T')[0]
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setShowForm(false);
    setEditPlan(null);
    setFormData({
      destination: '',
      activities: '',
      planDate: ''
    });
  };

  return (
    <div className="sustainability-container">
      <h1>Sustainable Travel Plans</h1>
      <button className="create-btn" onClick={() => setShowForm(true)}>Create New Plan</button>
  
      {/* Form Modal */}
      {showForm && (
        <div className="form-modal">
          <div className="form-content">
            <form onSubmit={handleSubmit}>
              <h2>{editPlan ? 'Edit Plan' : 'New Plan'}</h2>
              
              <label>
                Destination:
                <input
                  name="destination"
                  value={formData.destination}
                  onChange={handleInputChange}
                  required
                />
              </label>

              <label>
                Activities (comma separated):
                <input
                  name="activities"
                  value={formData.activities}
                  onChange={handleInputChange}
                  required
                />
              </label>

              <label>
                Plan Date:
                <input
                  type="date"
                  name="planDate"
                  value={formData.planDate}
                  onChange={handleInputChange}
                  required
                />
              </label>

              <div className="form-actions">
                <button type="submit" className="save-btn">Save</button>
                <button type="button" className="cancel-btn" onClick={resetForm}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confirmation Dialog - Now correctly placed outside the form modal */}
      {showConfirm && (
        <div className="confirmation-dialog">
          <div className="confirmation-content">
            <h3>Confirm Deletion</h3>
            <p>Are you sure you want to delete the plan for {planToDelete?.destination}?</p>
            <div className="confirmation-actions">
              <button onClick={confirmDelete}>Delete</button>
              <button className="cancel-btn" onClick={() => setShowConfirm(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Plans List */}
      <div className="plans-list">
        {Array.isArray(plans) && plans.length > 0 ? (
          plans.map(plan => (
            <div key={plan._id} className="plan-card">
              <h3>{plan.destination}</h3>
              <p>Date: {new Date(plan.planDate).toLocaleDateString()}</p>
              <ul>
                {plan.activities.map((activity, index) => (
                  <li key={index}>{activity.trim()}</li>
                ))}
              </ul>
              <div className="card-actions">
                <button className="edit-btn" onClick={() => setupEditMode(plan)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDeleteClick(plan._id, plan.destination)}>Delete</button>
              </div>
            </div>
          ))
        ) : (
          <p className="no-plans">No plans found. Create your first sustainable travel plan!</p>
        )}
      </div>
      <Footer />
    </div>
    
  );
};

export default SustainabilityPlan;