import { useState, useEffect } from 'react';
import {supabase} from './supabaseClient';
import logo from './logo.svg';
import './App.css';
import { toBeEnabled } from '@testing-library/jest-dom/matchers';

const FirstRow = () => {
  return (
    <div className="flex">
    <div id="top-row" className="flex-1 bg-topPurple rounded-xl p-20 m-1 text-left">
      summer '24 goals
    </div>
    <div id="top-row" className="flex-1 bg-topPurple rounded-xl p-20 m-1 text-right">
      digital diary of my progress
    </div>
  </div>
);
};

const NarrowRow = () => {
  return (
    <div className="w-full bg-topPurple rounded-xl p-6 text-center">
      what's a better way to stay on track with my goals & remember to live life to the fullest this summer?
    </div>
  );
};

const GoalCard = ({ goal }) => {

  
  return (
    <div className="w-full sm:w-1/2 md:w-1/3 p-4">
      <div className="bg-white rounded-lg shadow-md p-6 h-full">
        <h3 className="text-lg font-semibold mb-2">{goal.goal}</h3>
        <p className="text-gray-600 mb-4">{goal.description}</p>
        <p className="text-sm text-gray-500">{goal.is_completed}</p>
      </div>
    </div>
  );
};

// 
function App() {

  const [myGoals, setMyGoals] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const { data: goals, error } = await supabase.from('summer-goals').select('*');
      if (error) {
        console.error('Error fetching goals:', error.message);
      } else {
        setMyGoals(goals);
      }
    }

    fetchData();
  },[]);
    
  return (
    <div className="App">
      <header className="App-header">
      <FirstRow />
      <NarrowRow />

      <div className="flex flex-wrap justify-center">
          {myGoals.map((goal, index) => (
            <GoalCard key={index} goal={goal} />
          ))}

        </div>

      </header>
    </div>
  );
}

export default App;

// function Goals() {
  //   const [myGoals, setMyGoals] = useState([]);
  //   async function getGoals() {
  //     let { data: goals, error } = await supabase
  //       .from('summer-goals')
  //       .select('*')
  //     setMyGoals(goals);
  //   }
  //   getGoals();
  //   return(
  //     <table>
  //       {
  //         myGoals.map(b => (
  //           <tr>
  //             <td>
  //               {b.goal}
  //             </td>
  //             <td>
  //               {b.is_completed}
  //             </td>
  //             <td>
  //               {b.description}
  //             </td>
  //           </tr>
  
  //         ))
  //       }
  //     </table>
  //   );
  // }
