import React from 'react';
import ChatMessage from './ChatMessage';

const ChatWindow = () => {
  const messages = [
    {
      id: 1,
      sender: 'assistant',
      content: 'Hello! Let me guide you through the process of writing an eBook.',
    },
    {
      id: 2,
      sender: 'user',
      content: 'Great! What should I do first?',
    },
    // ... more sample messages
  ];

  return (
    <div className="chat-window overflow-y-auto w-ma h-96 mb-4">
      {messages.map((message) => (
        <ChatMessage key={message.id} message={message} />
      ))}
    </div>
  );
};

export default ChatWindow;
