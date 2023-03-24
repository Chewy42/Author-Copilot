import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import SupervisedWriting from './SupervisedWriting';

const Dashboard = () => {
  const [currentView, setCurrentView] = useState('dashboard');

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return (
          <>
            <h2 className="text-3xl font-bold text-blue-600 mb-6">
              Dashboard
            </h2>
            {/* Add the rest of the dashboard content */}
          </>
        );
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
