//Server.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import LoginData from './pages/login/LoginData.js';
import authRoutes from './pages/login/routes/authRoutes.js';

import auth from './middleware/authMiddleware.js';
import noticeRoutes from './pages/Travel/routes/noticeRoutes.js';
import User from './pages/signup/User.js';
import sustainabilityPlanRoutes from './pages/Sustainability/routes/sustainabilityPlanRoutes.js';
import trailRoutes from './pages/mountaintrails/routes/trailRoutes.js';
import communityRoutes from './pages/community-hub/routes/communityRoutes.js';
import productRoutes from './pages/Gears/routes/productRoutes.js'; // Import the product routes

// ✅ Configurations
dotenv.config();
const app = express();
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

// ✅ Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['set-cookie']
}));

app.use(express.json( { limit: '50mb' } ));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/api/notices', noticeRoutes);
app.use('/api/sustainability', sustainabilityPlanRoutes);
app.use('/api/trails', trailRoutes);
app.use('/api/community', communityRoutes); // Add this line to use the community routes
app.use('/api/products', productRoutes); // Add this line to use the product routes
app.use('/api/auth', authRoutes); // Add this line to use the auth routes

// ✅ MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Relationship with #MongoDB ');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

const adminAuth = (req, res, next) => {
  if (!req.user?.isAdmin) return res.status(403).json({ message: 'Admin access required' });
  next();
};

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something broke!' });
});

// ✅ Routes
app.post('/signup', async (req, res) => {
  try {
    const { username, email, phone, password } = req.body;
    if (!username || !email || !phone || !password) return res.status(400).json({ message: 'All fields are required' });
    if (await User.findOne({ email })) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, await bcrypt.genSalt(10));
    const newUser = new User({ username, email, phone, password: hashedPassword });
    const savedUser = await newUser.save();
    res.status(201).json({ message: 'User registered successfully', userId: savedUser._id });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
});

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Create login record
    const loginRecord = new LoginData({
      userId: user._id,
      username: user.username,
      email: user.email
    });
    
    // Save and log the record
    await loginRecord.save();
    console.log('Login record saved:', loginRecord); // 👈 Add this line right here

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
    
    res.cookie('token', token, { 
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Lax', 
      maxAge: 3600000 
    });

    res.json({ 
      success: true, 
      user: { 
        id: user._id, 
        username: user.username, 
        email: user.email, 
        isAdmin: user.isAdmin 
      } 
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Server.js (add this route)
app.get('/user', auth, (req, res) => {
  res.json({ 
    id: req.user._id,
    username: req.user.username,
    email: req.user.email,
    isAdmin: req.user.isAdmin // Add this line
  });
});

app.post('/logout', (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Lax',
    path: '/'
  });
  res.json({ message: 'Logged out successfully' });
});

app.get('/admin/data', auth, adminAuth, (req, res) => {
  res.json({ message: 'Admin data accessed successfully.' });
});

const createDefaultAdmin = async () => {
  try {
    const adminEmail = 'Admin2025@gmail.com';
    if (!(await User.findOne({ email: adminEmail }))) {
      const hashedPassword = await bcrypt.hash('Admin@2025', await bcrypt.genSalt(10));
      await User.create({ username: 'Admin', email: adminEmail, phone: '0000000000', password: hashedPassword, isAdmin: true });
      console.log('Default admin account created');
    }
  } catch (error) {
    console.error('Error creating admin account:', error);
  }
};

// Admin routes for stats
app.get('/api/admin/user-stats', auth, adminAuth, async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    const recentUsers = await User.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('username email createdAt');
    
    res.json({
      totalUsers: userCount,
      recentUsers
    });
  } catch (error) {
    console.error('Error fetching user stats:', error);
    res.status(500).json({ message: 'Error fetching user statistics' });
  }
});

// Add this route in server.js after the user-stats route
app.delete('/api/admin/users/:userId', auth, adminAuth, async (req, res) => {
  try {
    const userId = req.params.userId;
    const deletedUser = await User.findByIdAndDelete(userId);
    
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json({ 
      message: 'User deleted successfully',
      deletedUserId: deletedUser._id 
    });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Error deleting user' });
  }
});

connectDB().then(createDefaultAdmin);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Damn Server ${PORT}`));
