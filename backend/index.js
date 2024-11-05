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
    name:string,
    email:string,
    password:string
})

const User = new mongoose.model("User",userSchema)


// Routes
app.post("/login", (req, res) => {
  res.send("My API Login");
});

app.post("/register", (req, res) => {
    res.send("My API Register");
  });

app.listen(9002, () => {
  console.log("BE started at port 9002");
});

