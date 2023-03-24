import React, { useContext } from 'react';
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/solid';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import AuthContext from './contexts/AuthContext';

const data = [
  { name: 'Week 1', users: 4000 },
  { name: 'Week 2', users: 3000 },
  { name: 'Week 3', users: 2000 },
  { name: 'Week 4', users: 2780 },
  { name: 'Week 5', users: 1890 },
  { name: 'Week 6', users: 2390 },
  { name: 'Week 7', users: 3490 },
];

const Analytics = () => {
  const { userName } = useContext(AuthContext);

  const getTimeOfDayGreeting = () => {
    const currentHour = new Date().getHours();

    if (currentHour >= 5 && currentHour < 12) {
      return 'Good morning';
    } else if (currentHour >= 12 && currentHour < 18) {
      return 'Good afternoon';
    } else {
      return 'Good evening';
    }
  };

  const firstName = userName.split(' ')[0];

  return (
    <div>
      <h2 className="text-3xl font-bold text-blue-600 mb-6">
        {getTimeOfDayGreeting()}, {firstName}!
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <div className="bg-white p-6 rounded-md shadow-md">
    <h3 className="text-xl font-bold text-blue-600 mb-4">Words Generated This Month</h3>
    <div className="text-4xl font-bold">1,250,000</div>
    <p className="mt-2 text-sm text-gray-500">Total words generated for eBooks</p>
  </div>

  <div className="bg-white p-6 rounded-md shadow-md">
    <h3 className="text-xl font-bold text-blue-600 mb-4">eBooks Written This Month</h3>
    <div className="text-4xl font-bold">32</div>
    <p className="mt-2 text-sm text-gray-500">Total number of eBooks created</p>
  </div>

  <div className="bg-white p-6 rounded-md shadow-md">
    <h3 className="text-xl font-bold text-blue-600 mb-4">Top Genre</h3>
    <div className="text-4xl font-bold">Mystery</div>
    <p className="mt-2 text-sm text-gray-500">Most popular genre this month</p>
  </div>
</div>


      <div className="mt-8 bg-white p-6 rounded-md shadow-md">
        <h3 className="text-xl font-bold text-blue-600 mb-4">User Growth</h3>

        <LineChart
          width={730}
          height={250}
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="users" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </div>
    </div>
  );
};

export default Analytics;

