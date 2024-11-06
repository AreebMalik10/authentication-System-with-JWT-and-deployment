import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Connect to MongoDB
async function connectDB() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/authsystem', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("DB connected");
  } catch (error) {
    console.error("DB connection error:", error);
  }
}
connectDB();

// User Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
});

const User = mongoose.model("User", userSchema);

// Routes

// Login route
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  
  // Corrected to use `User.findOne`
  User.findOne({ email: email }, (err, user) => {
    if (user) {
      if (password === user.password) {
        res.send({ message: "Login Successful", user: user });
      } else {
        res.send({ message: "Password didn't match" });
      }
    } else {
      res.send({ message: "User not registered" });
    }
  });
});

// Register route
app.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  
  // Check if the user already exists
  User.findOne({ email: email }, (err, existingUser) => {
    if (existingUser) {
      return res.send({ message: "User already registered" });
    }
    
    // If user does not exist, create and save a new user
    const newUser = new User({
      name,
      email,
      password
    });
    
    newUser.save(error => {
      if (error) {
        console.error("Error saving user:", error);
        return res.send({ message: "Error saving user" });
      } else {
        return res.send({ message: "Successfully registered" });
      }
    });
  });
});

app.listen(9002, () => {
  console.log("BE started at port 9002");
});
