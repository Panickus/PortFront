import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminTestimonials: React.FC = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [form, setForm] = useState({ name: '', company: '', text: '', image: '' });

  useEffect(() => {
    axios.get('http://localhost:3000/api/testimonials')
      .then(response => setTestimonials(response.data))
      .catch(error => console.error('Error fetching testimonials:', error));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios.post('http://localhost:3000/api/testimonials', form)
      .then(response => setTestimonials([...testimonials, response.data]))
      .catch(error => console.error('Error adding testimonial:', error));
  };

  const handleDelete = (id: string) => {
    axios.delete(`http://localhost:3000/api/testimonials/${id}`)
      .then(() => setTestimonials(testimonials.filter(testimonial => testimonial._id !== id)))
      .catch(error => console.error('Error deleting testimonial:', error));
  };

  return (
    <div>
      <h2 className="text-2xl mb-4">Manage Testimonials</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} className="p-2 border" required />
        <input type="text" name="company" placeholder="Company" value={form.company} onChange={handleChange} className="p-2 border" required />
        <textarea name="text" placeholder="Testimonial Text" value={form.text} onChange={handleChange} className="p-2 border" required />
        <input type="text" name="image" placeholder="Image URL" value={form.image} onChange={handleChange} className="p-2 border" required />
        <button type="submit" className="bg-blue-500 text-white p-2">Add Testimonial</button>
      </form>
      <ul>
        {testimonials.map(testimonial => (
          <li key={testimonial._id} className="flex justify-between items-center">
            <span>{testimonial.name}</span>
            <button onClick={() => handleDelete(testimonial._id)} className="bg-red-500 text-white p-2">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminTestimonials;