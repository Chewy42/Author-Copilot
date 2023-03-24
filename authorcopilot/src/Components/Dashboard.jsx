import React, { useState, useEffect, useContext} from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import SupervisedWriting from './SupervisedWriting';
import Analytics from './Analytics';

const Dashboard = () => {
  const [currentView, setCurrentView] = useState('dashboard');

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Analytics />;
      case 'supervised-writing':
        return <SupervisedWriting />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow flex">
        <Sidebar onMenuItemClick={setCurrentView} />

        <section className="flex-grow bg-gray-100 p-6">
          {renderCurrentView()}
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
