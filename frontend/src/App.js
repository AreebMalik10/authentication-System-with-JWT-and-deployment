import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from "./components/register";
import Login from "./components/login";
import Homepage from "./components/homepage";


function App() {

  const[user, setLoginUser] = useState({})
  return (
    <Router>
    <div className="App">
    
      <Routes>

        <Route path="/" element={<Homepage/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/register" element={<Register/>}></Route>
     </Routes>
    </div>
    </Router>
  );
}

export default App;
