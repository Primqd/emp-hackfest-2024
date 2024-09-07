import React, {useState, useEffect} from 'react';
import './App.css';

function App() {
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    fetch('/api/time').then(res => res.json()).then(k => {
      setCurrentTime(k.time);
    });
  }, []);

  async function get() {
    let obj = await (await fetch('/api/asteroids')).json();
    
    console.log(obj);
    return obj;
  };

  let data = get();

  console.log(data);

  return (
    <>
      <header className = "Title">Franklin's EMP Hackfest 2024 Website</header>
      <table>
        <tr key = 'table-header'>
          <th>Name</th>
          <th>ID </th>
          <th>Diameter (meters)</th>
          <th>Hazardous </th>
          <th>Orbiting Body </th>
        </tr>
        {
          data.near_earth_objects["2021-09-08"].map((asteroid) => (
            <tr>
              <th>{asteroid.name}</th>
              <th>{asteroid.id}</th>
              <th>{(asteroid.estimated_diameter.meters.estimated_diameter_max + asteroid.estimated_diameter.meters.estimated_diameter_min) / 2}</th>
              <th>{asteroid.is_potentially_hazardous_asteroid}</th>
              <th>{asteroid.close_approach_data[0].orbiting_body}</th>
            </tr>
          ))
        }
      </table>
    </>
  );
}

export default App;
