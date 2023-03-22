import React from "react";

import Header from "./Header";

import Sidebar from "./Sidebar";

const Panel = () => {



  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow flex">
        <Sidebar />

        <section className="flex-grow bg-gray-100 p-6">
          <h2 className="text-3xl font-bold text-blue-600 mb-6">Dashboard</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-md shadow-md">
              <h3 className="text-xl font-bold text-blue-600 mb-4">
                Monthly Word Usage
              </h3>

              {/* Replace with your chart component */}

              <div className="h-40 bg-gray-200 rounded-md" />
            </div>

            <div className="bg-white p-6 rounded-md shadow-md">
              <h3 className="text-xl font-bold text-blue-600 mb-4">
                Random Statistic #1
              </h3>

              {/* Replace with your chart component */}

              <div className="h-40 bg-gray-200 rounded-md" />
            </div>

            <div className="bg-white p-6 rounded-md shadow-md">
              <h3 className="text-xl font-bold text-blue-600 mb-4">
                Random Statistic #2
              </h3>

              {/* Replace with your chart component */}

              <div className="h-40 bg-gray-200 rounded-md" />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Panel;