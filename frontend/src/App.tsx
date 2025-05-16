import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Login from './pages/Login';
import Signup from './pages/Signup';
import CoursesSection from './components/CoursesSection';
import Survey from "./pages/Survey"
import RoadmapFlow from './components/Roadmap/RoadmapFlow';
const Home = () => (
  <>
    <Navbar />
    <Hero />
    <CoursesSection />
  </>
);

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
                    <Route path="/survey" element={<Survey />} />
        </Routes>
      </div>
    </Router>
    // <RoadmapFlow />
  );
};

export default App;