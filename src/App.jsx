import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Headers/Header';
import Login from './pages/login/Login';
import SignUp from './pages/signup/SignUp';
import Home from './pages/home';
import Provinces from './pages/provinces/provinces';
import './App.css';
import MountainTrails from './pages/MountainTrails/MountainTrails';
import TrekkingPage from './pages/trekking-gears/trekking-gears';

const App = () => {
  return (
    <Router>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/provinces" element={<Provinces />} />
          <Route path="/mountain-trails" element={<MountainTrails />} />
          <Route path="/trekking-gears" element={<TrekkingPage />} />

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
    </Router>
  );
};

export default App;