import React, { useEffect, useState } from 'react';
import axios from 'axios';

type Blog = {
  _id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  tags: string[];
  image: string;
  authorAvatar: string;
};

const Blogs: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/blogs');
        setBlogs(response.data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="bg-light-background text-light-text dark:bg-dark-background dark:text-dark-text min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-4">Artículos</h1>
      <ul>
        {blogs.map((blog) => (
          <li key={blog._id}>
            <h2>{blog.title}</h2>
            <p>{blog.content}</p>
            <p>By {blog.author}</p>
            <p>{blog.date}</p>
            <img src={blog.image} alt={blog.title} />
            <img src={blog.authorAvatar} alt={blog.author} />
            <p>Tags: {blog.tags.join(', ')}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Blogs;
