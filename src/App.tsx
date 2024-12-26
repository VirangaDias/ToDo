import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from './components/Sidebar/Sidebar';
import Navbar from './components/Navbar/Navbar';
import './app.css';
import CardWindow from './components/CardWindow/CardWindow';
import Card from './components/History/Card';

export default function App() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <div className="content">
          <Navbar />
          <Routes>
            <Route path="/" element={<Navigate to="/today" />} />
            <Route path="/today" element={<CardWindow />} />
            <Route path="/history" element={<Card />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
