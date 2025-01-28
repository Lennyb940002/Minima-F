import React, { useState } from 'react';

function EmailForm() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/emails`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setMessage('Email saved successfully!');
      } else {
        setMessage('Failed to save email.');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <img 
        src="https://via.placeholder.com/150" 
        alt="Logo" 
        className="w-40 h-40 mb-8"
      />
      <form 
        className="flex flex-col items-center w-full max-w-sm p-6 bg-black border border-white rounded-lg shadow-md" 
        onSubmit={handleSubmit}
      >
        <input
          type="email"
          id="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Enter your email"
          required
          className="w-full p-2 mb-4 text-white bg-black border border-white rounded-md focus:outline-none focus:ring-2 focus:ring-white"
        />
        <button
          type="submit"
          className="w-full p-2 text-black bg-white border border-white rounded-md hover:bg-black hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
        >
          S'inscrire
        </button>
      </form>
      {message && <p className="mt-4 text-center text-green-600">{message}</p>}
    </div>
  );
}

export default EmailForm;
