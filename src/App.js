import { useState, useEffect } from 'react';
import {supabase} from './supabaseClient';

import './App.css';


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
      no better way to stay on track with my goals & remember to live life to the fullest this summer
    </div>
  );
};

const NarrowRow2 = () => {
  return (
    <div className="w-full bg-topPurple rounded-xl p-6 mt-1 text-center">
      each note is editable with the purpose to keep updating my progress on my goals throughout the summer
    </div>
  );
};

const Note = ({ title, storageKey }) => {
  const [content, setContent] = useState('');

  useEffect(() => {
    const storedContent = localStorage.getItem(storageKey);
    if (storedContent) {
      setContent(storedContent);
    } else {
      setContent('write whatever you want! have anything fun happened lately? how have you been feeling?');
    }
  }, [storageKey]);

  const handleContentChange = (event) => {
    const newContent = event.target.value;
    setContent(newContent);
    localStorage.setItem(storageKey, newContent);
  };

  return (
    <div className="w-full sm:w-1/2 md:w-1/3 p-1">
      <div className="bg-blue-100 rounded-lg shadow-md p-6 h-full hover:bg-green-200 transition duration-300 transform hover:-translate-y-2">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <textarea
          value={content}
          onChange={handleContentChange}
          className="border rounded-md p-2 mb-4 w-full h-24"
        />
      </div>
    </div>
  );
};



  const GoalCard = ({ goal, onUpdateDescription }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedDescription, setEditedDescription] = useState(goal.description);
    
    const handleDescriptionChange = (event) => {
      setEditedDescription(event.target.value);
    };
  
    const handleToggleEditing = () => {
      setIsEditing(!isEditing);
    };
  
    const handleUpdateDescription = () => {
      onUpdateDescription(goal.id, editedDescription);
      setIsEditing(false);
    };

  return (
    <div className="w-full sm:w-1/2 md:w-1/3 p-1">
      <div className="bg-blue-100 rounded-lg shadow-md p-6 h-full hover:bg-green-200 transition duration-300 transform hover:-translate-y-2">
        <h3 className="text-lg font-semibold mb-2">{goal.goal}</h3>

        {isEditing ? (
          <>
            <input
              type="text"
              value={editedDescription}
              onChange={handleDescriptionChange}
              className="border rounded-md p-2 mb-4"
            />
            <button onClick={handleUpdateDescription} className="bg-black text-white px-4 py-2 rounded-md">update description</button>
          </>
        ) : (
          <>
            <p className="text-gray-600 mb-4">{goal.description}</p>
            <button onClick={handleToggleEditing} className="text-gray-500 hover:text-blue-500">Edit Description</button>
          </>
        )}


        <p className="text-sm text-gray-500">{goal.is_completed}</p>
      </div>
    </div>
  );
};

const PictureCard = ({ pictureUrl }) => {
  return (
    <div className="w-full sm:w-1/2 md:w-1/3 p-1">
      <div className="bg-blue-100 rounded-lg shadow-md p-6 h-full flex justify-center items-center hover:bg-green-200 transition duration-300 transform hover:-translate-y-2">
        <img src={pictureUrl} alt="Icon" />
      </div>
    </div>
  );
};




function App() {

  const [myGoals, setMyGoals] = useState([]);
  const [weatherForecastLA, setWeatherForecastLA] = useState(null);
  const [weatherForecastChicago, setWeatherForecastChicago] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const { data: goals, error } = await supabase.from('summer-goals').select('*');
      if (error) {
        console.error('Error fetching goals:', error.message);
      } else {
        setMyGoals(goals);
      }
      // Fetch weather forecast for Los Angeles
      const responseLA = await fetch('https://api.weather.gov/points/34.0522,-118.2437');
      const dataLA = await responseLA.json();
      const forecastUrlLA = dataLA.properties.forecast;

      const forecastResponseLA = await fetch(forecastUrlLA);
      const forecastDataLA = await forecastResponseLA.json();
      setWeatherForecastLA(forecastDataLA.properties.periods.filter((period, index) => index % 2 === 0 && index < 3));

      // Fetch weather forecast for Chicago
      const responseChicago = await fetch('https://api.weather.gov/points/41.8781,-87.6298');
      const dataChicago = await responseChicago.json();
      const forecastUrlChicago = dataChicago.properties.forecast;

      const forecastResponseChicago = await fetch(forecastUrlChicago);
      const forecastDataChicago = await forecastResponseChicago.json();
      setWeatherForecastChicago(forecastDataChicago.properties.periods.filter((period, index) => index % 2 === 0 && index < 3));

    }

    fetchData();
  },[]);

    
  const onUpdateDescription = async (goalId, newDescription) => {
    try {
      const { error } = await supabase
        .from('summer-goals')
        .update({ description: newDescription })
        .eq('id', goalId);

      if (error) {
        console.error('Error updating description:', error.message);
      } else {
        // Update the local state to reflect the changes
        setMyGoals(myGoals.map(goal => goal.id === goalId ? { ...goal, description: newDescription } : goal));
      }
    } catch (error) {
      console.error('Error updating description:', error.message);
    }
  };


  return (
    <div className="App">
      <header className="App-header">
      <FirstRow />
      <NarrowRow />
      <NarrowRow2 />

      <div className="flex flex-wrap justify-center">
          {myGoals.map((goal, index) => (
            <GoalCard key={index} goal={goal} onUpdateDescription={onUpdateDescription} />
          ))}
      <PictureCard pictureUrl={require('./java.png')} />

      <PictureCard pictureUrl={require('./california.png')} />
          
      <div className="w-full sm:w-1/2 md:w-1/3 p-1">
            <div className="bg-green-100 rounded-lg shadow-md p-6 h-full hover:bg-green-200 transition duration-300 transform hover:-translate-y-2">
              <h3 className="text-lg font-semibold mb-2">Weather Forecast for Los Angeles</h3>
              {weatherForecastLA && (
                <ul>
                  {weatherForecastLA.map((forecast, index) => (
                    <li key={index}>
                      {forecast.name}: {forecast.detailedForecast}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <PictureCard pictureUrl={require('./liberty.png')} />

          <div className="w-full sm:w-1/2 md:w-1/3 p-1">
            <div className="bg-green-100 rounded-lg shadow-md p-6 h-full hover:bg-green-200 transition duration-300 transform hover:-translate-y-2">
              <h3 className="text-lg font-semibold mb-2">Weather Forecast for Chicago</h3>
              {weatherForecastChicago && (
                <ul>
                  {weatherForecastChicago.map((forecast, index) => (
                    <li key={index}>
                      {forecast.name}: {forecast.detailedForecast}
                    </li>
                  ))}
                </ul>
              )}

          
            </div>
          
          </div>

          <Note title="what have you been up to?" storageKey="note1" />
          <Note title="how are you feeling right now?" storageKey="note2" />

          
          
          
        </div>
        

      </header>
    </div>
  );
}

//Icons created by Freepik - Flaticon

export default App;