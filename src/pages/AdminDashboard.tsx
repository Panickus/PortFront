import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import AdminSkills from '../components/AdminSkills';
import AdminProjects from '../components/AdminProjects';
import AdminTestimonials from '../components/AdminTestimonials';
import AdminCertifications from '../components/AdminCertifications';
import AdminBlogs from '../components/AdminBlogs';

const AdminDashboard: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text">
      <Sidebar />
      <div className="flex-1 p-4">
        <Routes>
          <Route path="skills" element={<AdminSkills />} />
          <Route path="projects" element={<AdminProjects />} />
          <Route path="testimonials" element={<AdminTestimonials />} />
          <Route path="certifications" element={<AdminCertifications />} />
          <Route path="blogs" element={<AdminBlogs />} />
        </Routes>
      </div>
    </div>
  );
};

const Sidebar: React.FC = () => {
  return (
    <div className="w-64 bg-gray-500 text-white dark:bg-gray-900 p-4">
      <h2 className="text-2xl mb-4">Admin Dashboard</h2>
      <ul>
        <li className="mb-2"><Link to="skills" className="hover:text-gray-400">Skills</Link></li>
        <li className="mb-2"><Link to="projects" className="hover:text-gray-400">Projects</Link></li>
        <li className="mb-2"><Link to="testimonials" className="hover:text-gray-400">Testimonials</Link></li>
        <li className="mb-2"><Link to="certifications" className="hover:text-gray-400">Certifications</Link></li>
        <li className="mb-2"><Link to="blogs" className="hover:text-gray-400">Blogs</Link></li>
      </ul>
    </div>
  );
};

export default AdminDashboard;
