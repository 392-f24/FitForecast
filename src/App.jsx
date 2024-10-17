import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
import Main from "./pages/Main";
import Closet from "./pages/Closet";
import Header from "./components/Header";
import Login from "./pages/Login";
import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function App() {
  const [user, setUser] = useState(null);
  const auth = getAuth();
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user); 
      } else {
        setUser(null); 
      }
    });

    return () => unsubscribe();
  }, [auth]);
  
  return (
    <Router>
      <div className="flex flex-col h-screen">
        <Header />
        <main className="flex-grow mt-16">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/closet" element={<Closet />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
