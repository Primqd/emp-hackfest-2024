import React, {useState, useEffect} from 'react';
import './App.css';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // const fetchData = () => {
    const data = fetch('/api/asteroids');
    const json = data.json();

    setData(json);
    // }

    // fetchData();
    // fetch('/api/asteroids').then(res => res.json()).then(k => {
    //   setData(k);
    // });
  }, [])


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
          <th>Close Approach Date</th>
        </tr>
        {
          data.asteroid_info.map((asteroid) => (
            <tr>
              <th>{asteroid.name}</th>
              <th>{asteroid.id}</th>
              <th>{asteroid.diameter}</th>
              <th>{asteroid.hazardous ? "true" : "false"}</th>
              <th>{asteroid.orbiting_body}</th>
              <th>{asteroid.close_approach}</th>
            </tr>
          ))
        }
      </table>
    </>
  );
}

export default App;
