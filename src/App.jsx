import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
import Main from "./pages/Main";
import Closet from "./pages/Closet";
import Header from "./components/Header";
import Login from "./pages/Login";
import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, setPersistence, browserLocalPersistence } from "firebase/auth";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();
  
  useEffect(() => {

    setPersistence(auth, browserLocalPersistence)
    .then(() => {

      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          setUser(user); 
        } else {
          setUser(null); 
        }
        setLoading(false); // Authentication check is complete
      });

      return () => unsubscribe();

    })
    .catch((error) => {
      console.error("Failed to set persistence:", error);
    });
  }, [auth]);

  if (loading) {
    // Show a loading spinner or message while the auth state is being checked
    return <div>Loading...</div>;
  }
  
  return (
    <Router>
      <div className="flex flex-col h-screen">
        <Header />
        <main className="flex-grow mt-16">
          <Routes>
          <Route path="/" element={user ? <Main /> : <Navigate to="/login"/>} />
            <Route path="/closet" element={user ? <Closet /> : <Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
