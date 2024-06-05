import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminCertifications: React.FC = () => {
  const [certifications, setCertifications] = useState([]);
  const [form, setForm] = useState({ name: '', issuingOrganization: '', date: '', image: '' });

  useEffect(() => {
    axios.get('http://localhost:3000/api/certifications')
      .then(response => setCertifications(response.data))
      .catch(error => console.error('Error fetching certifications:', error));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios.post('http://localhost:3000/api/certifications', form)
      .then(response => setCertifications([...certifications, response.data]))
      .catch(error => console.error('Error adding certification:', error));
  };

  const handleDelete = (id: string) => {
    axios.delete(`http://localhost:3000/api/certifications/${id}`)
      .then(() => setCertifications(certifications.filter(certification => certification._id !== id)))
      .catch(error => console.error('Error deleting certification:', error));
  };

  return (
    <div>
      <h2 className="text-2xl mb-4">Manage Certifications</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <input type="text" name="name" placeholder="Certification Name" value={form.name} onChange={handleChange} className="p-2 border" required />
        <input type="text" name="issuingOrganization" placeholder="Issuing Organization" value={form.issuingOrganization} onChange={handleChange} className="p-2 border" required />
        <input type="date" name="date" placeholder="Date" value={form.date} onChange={handleChange} className="p-2 border" required />
        <input type="text" name="image" placeholder="Image URL" value={form.image} onChange={handleChange} className="p-2 border" required />
        <button type="submit" className="bg-blue-500 text-white p-2">Add Certification</button>
      </form>
      <ul>
        {certifications.map(certification => (
          <li key={certification._id} className="flex justify-between items-center">
            <span>{certification.name}</span>
            <button onClick={() => handleDelete(certification._id)} className="bg-red-500 text-white p-2">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminCertifications;
