import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminSkills: React.FC = () => {
  const [skills, setSkills] = useState([]);
  const [form, setForm] = useState({ name: '', image: '' });

  useEffect(() => {
    axios.get('http://localhost:3000/api/skills')
      .then(response => setSkills(response.data))
      .catch(error => console.error('Error fetching skills:', error));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios.post('http://localhost:3000/api/skills', form)
      .then(response => setSkills([...skills, response.data]))
      .catch(error => console.error('Error adding skill:', error));
  };

  const handleDelete = (id: string) => {
    axios.delete(`http://localhost:3000/api/skills/${id}`)
      .then(() => setSkills(skills.filter(skill => skill._id !== id)))
      .catch(error => console.error('Error deleting skill:', error));
  };

  return (
    <div>
      <h2 className="text-2xl mb-4">Manage Skills</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <input 
          type="text" 
          name="name" 
          placeholder="Skill Name" 
          value={form.name} 
          onChange={handleChange} 
          className="p-2 border bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text"
          required 
        />
        <input 
          type="text" 
          name="image" 
          placeholder="Image URL" 
          value={form.image} 
          onChange={handleChange} 
          className="p-2 border bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text"
          required 
        />
        <button type="submit" className="bg-blue-500 text-white p-2">Add Skill</button>
      </form>
      <ul>
        {skills.map(skill => (
          <li key={skill._id} className="flex justify-between items-center">
            <span>{skill.name}</span>
            <button onClick={() => handleDelete(skill._id)} className="bg-red-500 text-white p-2">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminSkills;
