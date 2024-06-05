import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faUserShield } from '@fortawesome/free-solid-svg-icons';
import Logo from './Logo';
import Login from './Login';
import ThemeToggle from './ThemeToggle';
import axios from 'axios';

const Navbar: React.FC = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const [user, setUser] = useState({ id: '', avatar: '', name: '' });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('http://localhost:3000/api/users/me', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        setUser(response.data);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUser({ id: '', avatar: '', name: '' });
  };

  return (
    <nav className="bg-light-background text-light-text p-4 fixed w-full top-0 z-50 dark:bg-dark-background dark:text-dark-text">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Logo />
        </div>
        <ul className="hidden md:flex space-x-4">
          <li><Link to="/" className="hover:text-light-primary dark:hover:text-dark-primary">Home</Link></li>
          <li><Link to="/projects" className="hover:text-light-primary dark:hover:text-dark-primary">Projects</Link></li>
          <li><Link to="/testimonials" className="hover:text-light-primary dark:hover:text-dark-primary">Testimonials</Link></li>
          <li><Link to="/certifications" className="hover:text-light-primary dark:hover:text-dark-primary">Certifications</Link></li>
          <li><Link to="/skills" className="hover:text-light-primary dark:hover:text-dark-primary">Skills</Link></li>
          <li><Link to="/blogs" className="hover:text-light-primary dark:hover:text-dark-primary">Blogs</Link></li>
          <li><Link to="/contact" className="hover:text-light-primary dark:hover:text-dark-primary">Contact</Link></li>
        </ul>
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          {isAuthenticated ? (
            <>
              <Link to="/admin">
                <FontAwesomeIcon icon={faUserShield} size="lg" className="hover:text-light-primary dark:hover:text-dark-primary" />
              </Link>
              <Link to={`/profile/${user.id}`}>
                <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full" />
              </Link>
              <button onClick={handleLogout} className="bg-light-secondary px-4 py-2 rounded hover:bg-light-accent dark:bg-dark-secondary dark:hover:bg-dark-accent">
                <FontAwesomeIcon icon={faSignOutAlt} />
                <span className="ml-2">Logout</span>
              </button>
            </>
          ) : (
            <button onClick={() => setShowLogin(true)} className="bg-light-primary px-4 py-2 rounded hover:bg-light-accent dark:bg-dark-primary dark:hover:bg-dark-accent">
              Login
            </button>
          )}
        </div>
      </div>
      {showLogin && <Login onClose={() => setShowLogin(false)} onLogin={() => setIsAuthenticated(true)} />}
    </nav>
  );
};

export default Navbar;
