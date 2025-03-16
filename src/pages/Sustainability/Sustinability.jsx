import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { fetchPlans, createPlan, updatePlan, deletePlan } from '../../api.js';

const Sustainability = ({ token }) => {
  const [plans, setPlans] = useState([]);
  const [currentPlan, setCurrentPlan] = useState({ title: '', description: '', date: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadPlans = async () => {
      try {
        setLoading(true);
        const data = await fetchPlans(token);
        setPlans(data);
      } catch (err) {
        setError('Failed to load plans');
      } finally {
        setLoading(false);
      }
    };
    loadPlans();
  }, [token]);

  const handleInputChange = (e) => {
    setCurrentPlan({
      ...currentPlan,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let result;
      if (isEditing) {
        result = await updatePlan(currentPlan._id, currentPlan, token);
        setPlans(plans.map(p => p._id === currentPlan._id ? result : p));
      } else {
        result = await createPlan(currentPlan, token);
        setPlans([...plans, result]);
      }
      setSuccess(`Plan ${isEditing ? 'updated' : 'created'} successfully`);
      setIsEditing(false);
      setCurrentPlan({ title: '', description: '', date: '' });
    } catch (err) {
      setError(err.message || 'Operation failed');
    }
  };

  const handleEdit = (plan) => {
    setIsEditing(true);
    setCurrentPlan(plan);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this plan?')) {
      try {
        await deletePlan(id, token);
        setPlans(plans.filter(p => p._id !== id));
        setSuccess('Plan deleted successfully');
      } catch (err) {
        setError('Failed to delete plan');
      }
    }
  };

  return (
    <div className="container mt-4">
      {/* Alerts */}
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      {success && (
        <div className="alert alert-success" role="alert">
          {success}
        </div>
      )}

      {/* Plan Form */}
      <div className="card mb-4">
        <div className="card-header">
          {isEditing ? 'Edit Sustainability Plan' : 'Create Sustainability Plan'}
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                name="title"
                value={currentPlan.title}
                onChange={handleInputChange}
                placeholder="Plan Title"
                required
              />
            </div>
            <div className="mb-3">
              <textarea
                className="form-control"
                name="description"
                value={currentPlan.description}
                onChange={handleInputChange}
                placeholder="Describe your sustainability initiative"
                required
              ></textarea>
            </div>
            <div className="mb-3">
              <input
                type="date"
                className="form-control"
                name="date"
                value={currentPlan.date}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="d-flex gap-2">
              <button type="submit" className="btn btn-primary">
                {isEditing ? 'Update Plan' : 'Create Plan'}
              </button>
              {isEditing && (
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={() => {
                    setIsEditing(false);
                    setCurrentPlan({ title: '', description: '', date: '' });
                  }}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* Plans List */}
      <div className="card">
        <div className="card-header">My Sustainability Plans</div>
        <div className="card-body">
          {plans.length === 0 ? (
            <p className="text-center text-muted">No plans created yet</p>
          ) : (
            <div className="row g-3">
              {plans.map((plan) => (
                <div key={plan._id} className="col-12">
                  <div className="card">
                    <div className="card-body d-flex justify-content-between align-items-center">
                      <div>
                        <h5 className="card-title">{plan.title}</h5>
                        <p className="card-text text-muted">{plan.description}</p>
                        <p className="card-text">
                          <small className="text-muted">
                            Date: {new Date(plan.date).toLocaleDateString()}
                          </small>
                        </p>
                      </div>
                      <div className="d-flex gap-2">
                        <button 
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => handleEdit(plan)}
                        >
                          Edit
                        </button>
                        <button 
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDelete(plan._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sustainability;