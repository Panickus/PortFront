import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminBlogs: React.FC = () => {
  const [blogs, setBlogs] = useState([]);
  const [form, setForm] = useState({ title: '', content: '', image: '' });

  useEffect(() => {
    axios.get('http://localhost:3000/api/blogs')
      .then(response => setBlogs(response.data))
      .catch(error => console.error('Error fetching blogs:', error));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios.post('http://localhost:3000/api/blogs', form)
      .then(response => setBlogs([...blogs, response.data]))
      .catch(error => console.error('Error adding blog:', error));
  };

  const handleDelete = (id: string) => {
    axios.delete(`http://localhost:3000/api/blogs/${id}`)
      .then(() => setBlogs(blogs.filter(blog => blog._id !== id)))
      .catch(error => console.error('Error deleting blog:', error));
  };

  return (
    <div>
  <h2 className="text-2xl mb-4 w-full">Manage Blogs</h2>
  <form onSubmit={handleSubmit} className="mb-4 flex flex-col space-y-4">
    <input
      type="text"
      name="title"
      placeholder="Blog Title"
      value={form.title}
      onChange={handleChange}
      className="p-2 border rounded-lg w-1/2"
      required
    />
    <textarea
      name="content"
      placeholder="Blog Content"
      value={form.content}
      onChange={handleChange}
      className="p-2 border rounded-lg w-full h-64"
      required
    />
    <input
      type="text"
      name="image"
      placeholder="Image URL"
      value={form.image}
      onChange={handleChange}
      className="p-2 border rounded-lg w-full"
      required
    />
    <button type="submit" className="bg-blue-500 text-white p-2 rounded-lg w-full">
      Add Blog
    </button>
  </form>
  <ul>
    {blogs.map(blog => (
      <li key={blog._id} className="flex justify-between items-center">
        <span>{blog.title}</span>
        <button onClick={() => handleDelete(blog._id)} className="bg-red-500 text-white p-2">
          Delete
        </button>
      </li>
    ))}
  </ul>
</div>

  );
};

export default AdminBlogs;
