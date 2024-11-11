import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';  //  Import dotenv

//  Load environment variables from .env file
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

//  Use environment variables
async function connectDB() {
  try {
    await mongoose.connect(process.env.DATABASE_URL, {  // Use DATABASE_URL from .env
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('DB connected');
  } catch (error) {
    console.error('DB connection error:', error);
  }
}

connectDB();

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

//  Use JWT secret from .env
const jwtSecret = process.env.JWT_SECRET;

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).send({ message: 'Email and password are required.' });

  try {
    const user = await User.findOne({ email });
    if (user && password === user.password) {
      const token = jwt.sign({ id: user._id }, jwtSecret, { expiresIn: '10s' });
      res.status(200).send({ message: 'Login Successful', token });
    } else {
      res.status(400).send({ message: 'Incorrect email or password' });
    }
  } catch (err) {
    res.status(500).send({ message: 'Internal server error' });
  }
});

// New route to get user data by verifying token
app.get('/getUser', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).send({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, jwtSecret);
    const user = await User.findById(decoded.id);
    if (user) {
      res.status(200).send({ user });
    } else {
      res.status(404).send({ message: 'User not found' });
    }
  } catch (err) {
    res.status(401).send({ message: 'Invalid or expired token' });
  }
});

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  console.log("Received registration data:", req.body);

  try {
    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      return res.status(400).send({ message: "User already registered" });
    }

    const newUser = new User({ name, email, password });
    await newUser.save(); 

    return res.status(201).send({ message: "Successfully registered" });
  } catch (err) {
    console.error("Error during registration:", err);
    return res.status(500).send({ message: "Error during registration", error: err.message });
  }
});

app.listen(process.env.PORT || 9002, () => {  // Use PORT from .env, or default to 9002
  console.log("BE started at port", process.env.PORT || 9002);
});
