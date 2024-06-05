import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Profile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<any>({});
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get(`http://localhost:3000/api/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        setUser(response.data);
      })
      .catch(error => {
        setError('Error fetching user data');
        console.error('Error fetching user data:', error);
      });
    }
  }, [id]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.put(`http://localhost:3000/api/users/${id}`, user, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setError('');
    } catch (error) {
      setError('Error updating user data');
      console.error('Error updating user data:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-light-background text-light-text dark:bg-dark-background dark:text-dark-text min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-4">Profile</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleUpdate}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-semibold mb-2">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={user.name || ''}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded dark:bg-dark-background dark:text-dark-text"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-semibold mb-2">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={user.email || ''}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded dark:bg-dark-background dark:text-dark-text"
          />
        </div>
        <button
          type="submit"
          className="bg-light-primary text-light-text py-2 px-4 rounded hover:bg-light-accent dark:bg-dark-primary dark:text-dark-text dark:hover:bg-dark-accent"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default Profile;
