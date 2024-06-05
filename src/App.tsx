import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/NavBar';
import Home from './pages/Home';
import AdminDashboard from './pages/AdminDashboard';
import Projects from './pages/Projects';
import Testimonials from './pages/Testimonials';
import Certifications from './pages/Certifications';
import Skills from './pages/Skills';
import Blogs from './pages/Blogs';
import Contact from './pages/Contact';
import Profile from './pages/Profile';
import { ThemeProvider } from './context/ThemeContext';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Router>
        <Navbar />
        <div className="mt-16 container mx-auto p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/certifications" element={<Certifications />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin/*" element={<AdminDashboard />} />
            <Route path="/profile/:id" element={<Profile />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
