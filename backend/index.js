import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());




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

// Call the function to connect to the database
connectDB();

// User Schema
 
const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String
})

const User = new mongoose.model("User",userSchema)


// Routes
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Ensure email and password are received
  if (!email || !password) {
    console.log('Email or password missing');
    return res.status(400).send({ message: "Email and password are required." });
  }

  try {
    // Find user by email
    const user = await User.findOne({ email: email });

    if (user) {
      if (password === user.password) {
        console.log("Login successful");
        return res.status(200).send({ message: "Login Successful", user: user });
      } else {
        console.log("Password mismatch");
        return res.status(400).send({ message: "Password didn't match" });
      }
    } else {
      console.log("User not found");
      return res.status(404).send({ message: "User not registered" });
    }
  } catch (err) {
    console.error("Database error:", err);  // Add detailed logging
    return res.status(500).send({ message: "Internal server error" });
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




app.listen(9002, () => {
  console.log("BE started at port 9002");
});

