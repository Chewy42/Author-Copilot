import React from 'react';
import ChatWindow from './ChatWindow';
import InputBar from './InputBar';

const SupervisedWriting = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl mb-6">Supervised Writing</h1>
      <div className="rounded-lg shadow-lg bg-white p-6">
        <ChatWindow />
        <InputBar />
      </div>
    </div>
  );
};

export default SupervisedWriting;
