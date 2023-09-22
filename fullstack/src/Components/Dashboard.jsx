import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import SupervisedWriting from './SupervisedWriting';
import Analytics from './Analytics';
import Unsupervised from './Unsupervised';
import MyEbooks from './MyEbooks';
import Settings from './Settings';

const Dashboard = () => {
  const [currentView, setCurrentView] = useState('dashboard');

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Analytics />;
      case 'supervised-writing':
        return <SupervisedWriting />;
      case 'unsupervised-writing':
        return <Unsupervised />;
      case 'my-ebook':
        return <MyEbooks />;
      case 'settings':
        return <Settings />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      

      <main className="flex-grow flex">
        <Sidebar onMenuItemClick={setCurrentView} />

        <section className="flex-grow bg-gradient-to-r to-purple-400 from-indigo-400 ease-linear transition-all duration-300 p-6">
          {renderCurrentView()}
        </section>
      </main>
    </div>
  );
};

export default Dashboard;