import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminProjects: React.FC = () => {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({ name: '', description: '', image: '', link: '' });

  useEffect(() => {
    axios.get('http://localhost:3000/api/projects')
      .then(response => setProjects(response.data))
      .catch(error => console.error('Error fetching projects:', error));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios.post('http://localhost:3000/api/projects', form)
      .then(response => setProjects([...projects, response.data]))
      .catch(error => console.error('Error adding project:', error));
  };

  const handleDelete = (id: string) => {
    axios.delete(`http://localhost:3000/api/projects/${id}`)
      .then(() => setProjects(projects.filter(project => project._id !== id)))
      .catch(error => console.error('Error deleting project:', error));
  };

  return (
    <div>
      <h2 className="text-2xl mb-4">Manage Projects</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <input type="text" name="name" placeholder="Project Name" value={form.name} onChange={handleChange} className="p-2 border" required />
        <textarea name="description" placeholder="Project Description" value={form.description} onChange={handleChange} className="p-2 border" required />
        <input type="text" name="image" placeholder="Image URL" value={form.image} onChange={handleChange} className="p-2 border" required />
        <input type="text" name="link" placeholder="Project Link" value={form.link} onChange={handleChange} className="p-2 border" required />
        <button type="submit" className="bg-blue-500 text-white p-2">Add Project</button>
      </form>
      <ul>
        {projects.map(project => (
          <li key={project._id} className="flex justify-between items-center">
            <span>{project.name}</span>
            <button onClick={() => handleDelete(project._id)} className="bg-red-500 text-white p-2">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminProjects;
