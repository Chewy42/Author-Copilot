import React, { useState } from 'react';

const InputBar = () => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle message submission to AI assistant here
    console.log('User message:', inputValue);
    setInputValue('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="w-full border border-gray-300 rounded-l-lg px-4 py-2 mr-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text
        white py-2 px-6 rounded-r-lg focus:outline-none"
      >
        Send
      </button>
    </form>
  );
};

export default InputBar;
