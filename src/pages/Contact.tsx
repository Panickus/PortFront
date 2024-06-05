import React from 'react';

const Contact: React.FC = () => {
  return (
    <div className="bg-light-background text-light-text dark:bg-dark-background dark:text-dark-text min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-6">Contact</h1>
      <form action="https://formspree.io/YOUR_EMAIL" method="POST">
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-semibold mb-2">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full p-2 border border-gray-300 rounded dark:bg-dark-background dark:text-dark-text"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-semibold mb-2">Email:</label>
          <input
            type="email"
            id="email"
            name="_replyto"
            required
            className="w-full p-2 border border-gray-300 rounded dark:bg-dark-background dark:text-dark-text"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="message" className="block text-sm font-semibold mb-2">Message:</label>
          <textarea
            id="message"
            name="message"
            required
            className="w-full p-2 border border-gray-300 rounded dark:bg-dark-background dark:text-dark-text"
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-light-primary text-light-text py-2 px-4 rounded hover:bg-light-accent dark:bg-dark-primary dark:text-dark-text dark:hover:bg-dark-accent"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Contact;
