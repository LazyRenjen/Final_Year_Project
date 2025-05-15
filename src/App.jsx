import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import {useAuth} from './contexts/AuthContext';

import Header from './components/Headers/Header';
import Login from './pages/login/Login';
import ForgotPassword from './pages/login/ForgotPassword.jsx';
import ResetPassword from './pages/login/ResetPassword.jsx';

import SignUp from './pages/signup/SignUp';
import Home from './pages/home';
import Provinces from './pages/provinces/provinces';
import './App.css';

import TripbyDays from './pages/TripbyDays/TripbyDays';
import PaymentSuccess from './pages/TripbyDays/paymentmodal/PaymentSuccess.jsx';
import PaymentFailure from './pages/TripbyDays/paymentmodal/PaymentFailure.jsx';
import PaymentPending from './pages/TripbyDays/paymentmodal/PaymentPending.jsx';

import CommunityHub from './pages/community-hub/communityhub';
import PostDetail from './pages/community-hub/PostDetail.jsx';

import Sustainability from './pages/Sustainability/SustainabilityPlan.jsx';
import TravelNotices from './pages/Travel/travelnotices.jsx';
import destinationsData from './more/more.json';
import DestinationPage from './more/DestinationPage.jsx';


import AdminDashboard from './components/Admin/admin.jsx';
import UserStats from './components/Admin/UserStats.jsx';
import Gears from './pages/Gears/Gears_detail.jsx';
import SuccessPayment from "./pages/Gears/PaymentStatus/SuccessPayment.jsx"; 
import FailurePayment from "./pages/Gears/PaymentStatus/FailurePayment.jsx";

const App = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (destinationsData[query]) {
      navigate(`/destination/${encodeURIComponent(query)}`);
    }
  };


  return (
    <div className="app">
      <Header onSearch={handleSearch} destinations={destinationsData} />
      <Routes>
        <Route path="*" element={<Home />} />
        <Route path="/provinces" element={<Provinces />} />
        {/* <Route path="/mountain-trails" element={<MountainTrails />} /> */}


        <Route path="/trip-by-days" element={<TripbyDays />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/payment-failure" element={<PaymentFailure />} />
        <Route path="/payment-pending" element={<PaymentPending />} />


        <Route path="/community" element={<CommunityHub />} />
        // In your App.js/router configuration
        <Route path="/community/:postId" element={<PostDetail />} />

        <Route path="/Travel" element={<TravelNotices />} />
        <Route path="/SustainabilityPlan" element={<Sustainability />} />
        <Route path="/destination/:name" element={<DestinationPage />} />

        <Route path="/gears" element={<Gears />} />
        <Route path="/gears/payments/SuccessPayment" element={<SuccessPayment />} />
        <Route path="/gears/payments/FailurePayment" element={<FailurePayment />} />


        <Route path="/login" element={
          <div className="auth-page-wrapper">
            <div className="auth-page">
              <Login />
            </div>
          </div>
        } />
        <Route path="/forgot-password" element={
          <div className="auth-page-wrapper">
            <div className="auth-page">
              <ForgotPassword />
            </div>
          </div>
        } />
        <Route path="/reset-password" element={
          <div className="auth-page-wrapper">
            <div className="auth-page">
              <ResetPassword />
            </div>
          </div>
        } />

        <Route path="/signup" element={
          <div className="auth-page-wrapper">
            <div className="auth-page">
              <SignUp />
            </div>
          </div>
        } />
        
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />

        <Route path="/admin/user-stats" element={<UserStats />} />
      </Routes>
    </div>
  );
};

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && (!user || (requiredRole === 'admin' && !user.isAdmin))) {
      navigate('/login');
    }
  }, [user, loading, navigate, requiredRole]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return user && (!requiredRole || (requiredRole === 'admin' && user.isAdmin)) ? children : null;
};

export default App;