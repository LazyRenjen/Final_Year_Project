import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import {auth} from './middleware/authMiddleware.js';
import noticeRoutes from './pages/Travel/routes/noticeRoutes.js';
import User from './pages/signup/User.js';
import LoginData from './pages/login/LoginData.js'
import Plan from './pages/Sustainability/routes/planRoutes.js'; 

// ✅ Configurations
dotenv.config();
const app = express();
const JWT_SECRET = process.env.JWT_SECRET;

// ✅ Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'], // Single declaration
  exposedHeaders: ['set-cookie']
}));

app.use(express.json( { limit: '50mb' } ));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/api/notices', noticeRoutes);
app.use('/api/plans', Plan);

// ✅ MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB successfully');
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

// Sustainability Plan Routes
app.get('/api/plans', auth, async (req, res) => {
  try {
    const plans = await Plan.find({ user: req.user._id }).sort('-createdAt');
    res.json(plans);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching plans' });
  }
});

app.post('/api/plans', auth, async (req, res) => {
  try {
    const { title, description, date } = req.body;
    const newPlan = new Plan({
      title,
      description,
      date,
      user: req.user._id
    });
    await newPlan.save();
    res.status(201).json(newPlan);
  } catch (error) {
    res.status(500).json({ message: 'Error creating plan' });
  }
});

app.put('/api/plans/:id', auth, async (req, res) => {
  try {
    const plan = await Plan.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true }
    );
    if (!plan) return res.status(404).json({ message: 'Plan not found' });
    res.json(plan);
  } catch (error) {
    res.status(500).json({ message: 'Error updating plan' });
  }
});

app.delete('/api/plans/:id', auth, async (req, res) => {
  try {
    const plan = await Plan.findOneAndDelete({ 
      _id: req.params.id, 
      user: req.user._id 
    });
    if (!plan) return res.status(404).json({ message: 'Plan not found' });
    res.json({ message: 'Plan deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting plan' });
  }
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
    if (!user || !(await bcrypt.compare(password, user.password))) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production',  sameSite: 'Lax', maxAge: 3600000 });

    const loginRecord = await LoginData.create({ userId: user._id,  username: user.username, email: user.email, loginTime: new Date() });
    console.log("Login record inserted:", loginRecord);

    res.json({ success: true, message: 'Login successful', user: { id: user._id, username: user.username, email: user.email, isAdmin: user.isAdmin } });

  }
  
  catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/user', auth, (req, res) => {
  res.json({ id: req.user._id, username: req.user.username, email: req.user.email });
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

connectDB().then(createDefaultAdmin);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));