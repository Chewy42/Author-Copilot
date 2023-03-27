import React, { useContext } from "react";
import { ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/solid";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import AuthContext from "./contexts/AuthContext";

const data = [
  { name: "Week 1", users: 4000 },
  { name: "Week 2", users: 3000 },
  { name: "Week 3", users: 2000 },
  { name: "Week 4", users: 2780 },
  { name: "Week 5", users: 1890 },
  { name: "Week 6", users: 2390 },
  { name: "Week 7", users: 3490 },
];

const Analytics = () => {
  const { userName } = useContext(AuthContext);

  const getTimeOfDayGreeting = () => {
    const currentHour = new Date().getHours();

    if (currentHour >= 5 && currentHour < 12) {
      return "Good morning";
    } else if (currentHour >= 12 && currentHour < 18) {
      return "Good afternoon";
    } else {
      return "Good evening";
    }
  };

  const firstName = userName.split(" ")[0];

  return (
    <div>
      <h2 className="text-3xl font-bold text-blue-600 mb-6 select-none">
        {getTimeOfDayGreeting()}, {firstName}!
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <div className="flex flex-col bg-white p-6 rounded-md shadow-md">
    <h3 className="flex-grow text-2xl font-bold text-blue-600 mb-4 select-none">
      Words Generated <br /> This Month
    </h3>
    <div className="text-4xl font-bold select-none">74,481</div>
    <p className="mt-2 text-sm text-gray-500 select-none">
      Total words generated for eBooks
    </p>
  </div>

  <div className="flex flex-col bg-white p-6 rounded-md shadow-md">
    <h3 className="flex-grow text-2xl font-bold text-blue-600 mb-4 select-none">
      eBooks Written <br /> This Month
    </h3>
    <div className="text-4xl font-bold select-none">4</div>
    <p className="mt-2 text-sm text-gray-500 select-none">
      Total number of eBooks created
    </p>
  </div>

  <div className="flex flex-col bg-white p-6 rounded-md shadow-md">
    <h3 className="flex-grow text-2xl font-bold text-blue-600 mb-4 select-none">
      Top Genre <br /> This Month
    </h3>
    <div className="text-4xl font-bold select-none">eCommerce</div>
    <p className="mt-2 text-sm text-gray-500 select-none">
      Most popular genre this month
    </p>
  </div>
</div>


      <div className="mt-8 bg-white p-6 rounded-md shadow-md">
        <h3 className="text-xl font-bold text-blue-600 mb-4">Word Usage</h3>

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
          <Line
            type="monotone"
            dataKey="words"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </div>
    </div>
  );
};

export default Analytics;
