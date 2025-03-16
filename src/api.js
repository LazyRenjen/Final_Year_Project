const API_BASE = 'http://localhost:5000/api';

export const fetchPlans = async (token) => {
  const response = await fetch(`${API_BASE}/plans`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return response.json();
};

export const createPlan = async (plan, token) => {
  const response = await fetch(`${API_BASE}/plans`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(plan)
  });
  return response.json();
};

export const updatePlan = async (id, plan, token) => {
  const response = await fetch(`${API_BASE}/plans/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(plan)
  });
  return response.json();
};

export const deletePlan = async (id, token) => {
  const response = await fetch(`${API_BASE}/plans/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return response.json();
};