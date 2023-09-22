import React, { useContext } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import AuthContext from "./contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const data = [
  { name: "Week 1", words: 4000 },
  { name: "Week 2", words: 3000 },
  { name: "Week 3", words: 2000 },
  { name: "Week 4", words: 2780 },
  { name: "Week 5", words: 1890 },
  { name: "Week 6", words: 2390 },
  { name: "Week 7", words: 3490 },
];

const Analytics = () => {
  const { handleSignOut, user} = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignOutClick = () => {
    handleSignOut();
    navigate("/");
  };

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

  const firstName = user.name.split(" ")[0];

  return (
    <div className="flex flex-col justify-evenly">
      <div className="bg-white bg-opacity-[10%] p-6 rounded-xl flex justify-between mb-4">
      <h2 className="my-auto select-none text-[40px] text-center font-semibold text-white">
        {getTimeOfDayGreeting()}, {firstName}!
      </h2>
      <button
                onClick={handleSignOutClick}
                className="my-auto bg-red-600 hover:scale-[103%] transition-all ease-linear duration-200 text-white hover:bg-red-500 px-4 py-3 rounded-md shadow-md"
              >
                Logout
              </button>
      </div>


      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-3">
        <div className="flex flex-col rounded-md bg-white border-2 p-6 drop-shadow-xl">
          <h3 className="mb-4 flex-grow select-none text-2xl font-bold text-primary">
            Words Generated <br /> This Month
          </h3>
          <div className="select-none text-4xl font-bold text-accent">
            74,481
          </div>
          <p className="mt-2 select-none text-sm text-gray-500">
            Total words generated for eBooks
          </p>
        </div>

        <div className="flex flex-col rounded-md bg-white border-2 p-6 drop-shadow-xl">
          <h3 className="mb-4 flex-grow select-none text-2xl font-bold text-primary">
            eBooks Written <br /> This Month
          </h3>
          <div className="select-none text-4xl font-bold text-accent">4</div>
          <p className="mt-2 select-none text-sm text-gray-500">
            Total number of eBooks created
          </p>
        </div>

        <div className="flex flex-col rounded-md bg-white border-2 p-6 drop-shadow-xl">
          <h3 className="mb-4 flex-grow select-none text-2xl font-bold text-primary">
            Top Genre <br /> This Month
          </h3>
          <div className="select-none text-4xl font-bold text-accent">
            eCommerce
          </div>
          <p className="mt-2 select-none text-sm text-gray-500">
            Most popular genre this month
          </p>
        </div>
      </div>

      <div className="mt-8 rounded-md bg-white p-6 shadow-md">
        <h3 className="mb-4 text-xl font-bold text-primary">Word Usage</h3>

      <ResponsiveContainer width="100%" height={200}>
        <LineChart
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
            stroke="#7c3aed"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Analytics;
