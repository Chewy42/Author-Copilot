import React from 'react';
import ChatWindow from './ChatWindow';
import InputBar from './InputBar';
import Sidebar from './Sidebar';
import Header from './Header';

const SupervisedWriting = () => {
  return (
        <section className="container mx-auto px-4 py-6 flex-grow bg-gray-100">
          <h1 className="text-3xl mb-6">Supervised Writing</h1>
          <div className="rounded-lg shadow-lg bg-white p-6">
            <ChatWindow />
            <InputBar />
          </div>
        </section>
  );
};

export default SupervisedWriting;
