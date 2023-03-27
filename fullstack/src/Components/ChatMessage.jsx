import React from 'react';

const ChatMessage = ({ message }) => {
  const { sender, content } = message;
  const isUser = sender === 'user';

  return (
    <div
      className={`${
        isUser ? 'text-right' : ''
      } mb-4 break-words w-full sm:w-3/4 mx-auto sm:mx-0 sm:max-w-md`}
    >
      <div
        className={`${
          isUser ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
        } inline-block py-2 px-4 rounded-lg`}
      >
        {content}
      </div>
    </div>
  );
};

export default ChatMessage;
