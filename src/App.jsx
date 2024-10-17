import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Main from "./pages/Main";
import Closet from "./pages/Closet";
import Header from "./components/Header";
import EditForm from "./components/EditForm";

function App() {
  return (
    <Router>
      <div className="flex flex-col h-screen">
        <Header />
        <main className="flex-grow mt-16">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/closet" element={<Closet />} />
            <Route path="/add-clothes" element={<EditForm />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
