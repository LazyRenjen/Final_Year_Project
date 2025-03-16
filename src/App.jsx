import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from './components/Headers/Header';
import Login from './pages/login/Login';
import SignUp from './pages/signup/SignUp';
import Home from './pages/home';
import Provinces from './pages/provinces/provinces';
import './App.css';
import MountainTrails from './pages/mountaintrails/MountainTrails';
import TrekkingPage from './pages/trekking-gears/trekking-gears';
import TripbyDays from './pages/TripbyDays/TripbyDays';
import CommunityHub from './pages/community-hub/communityhub';
import Sustainability from './pages/Sustainability/Sustinability.jsx';
import TravelNotices from './pages/Travel/TravelNotices';
import destinationsData from './more/more.json';
import DestinationPage from './more/DestinationPage.jsx';

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
        <Route path="/" element={<Home />} />
        <Route path="/provinces" element={<Provinces />} />
        <Route path="/mountain-trails" element={<MountainTrails />} />
        <Route path="/trekking-gears" element={<TrekkingPage />} />
        <Route path="/trip-by-days" element={<TripbyDays />} />
        <Route path="/community" element={<CommunityHub />} />
        <Route path="/Travel" element={<TravelNotices />} />
        <Route path="/Sustainability" element={<Sustainability />} />
        <Route path="/destination/:name" element={<DestinationPage />} />
        <Route path="/login" element={
          <div className="auth-page-wrapper">
            <div className="auth-page">
              <Login />
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
      </Routes>
    </div>
  );
};

export default App;