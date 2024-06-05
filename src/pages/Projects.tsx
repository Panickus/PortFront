import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:3000/api/projects', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        setProjects(response.data);
      })
      .catch(error => {
        console.error('Error fetching projects:', error);
      });
  }, []);

  return (
    <div className="bg-light-background text-light-text dark:bg-dark-background dark:text-dark-text min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-4">Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map(project => (
          <div key={project._id} className="p-4 border border-gray-300 rounded dark:bg-dark-background dark:text-dark-text">
            <h2 className="text-xl font-bold mb-2">{project.name}</h2>
            <img src={project.image} alt={project.name} className="w-full mb-4" />
            <a href={project.link} className="text-light-primary dark:text-dark-primary">View on GitHub</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
