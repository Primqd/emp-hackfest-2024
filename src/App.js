import React, { useState, useEffect } from 'react';
import './App.css';

async function fetchData(start, end) {
  if (!end){
    end = start
  }
  const response = await fetch(`/api/asteroids/${start}/${end}`);
  const json = await response.json();
  return json;
}



function App() {
  const [data, setData] = useState(null); // Holds asteroid data
  const [searchInput, setSearchInput] = useState(""); // Holds search input
  const [loading, setLoading] = useState(true); // Tracks loading state
  const date = new Date();
  const today = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`

  const handleKeyPress = React.useCallback((e) => {
    if (e.key === 'Enter') {
      setLoading(true); // Set loading to true before making API call
      const jsonPromise = fetchData(searchInput);
      jsonPromise.then((json) => {
        setData(json);
        setLoading(false); // Set loading to false after data is fetched
      })
    }
    
  }, [searchInput]);

  const handleSearch = React.useCallback(async (search) => {
    setLoading(true); // Set loading to true before making API call  T1
    const newSearchDate = search.target.value
    setSearchInput(newSearchDate);  // notify render next time to update search nput

    const json = await fetchData(newSearchDate); // T1

    console.log(`/api/asteroids/${newSearchDate}/${newSearchDate}`) //T2
    
    setData(json);
    setLoading(false); // Set loading to false after data is fetched
  }, [searchInput]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading to true before making API call
      
      const response = await fetch(`/api/asteroids/${today}/${today}`);
      console.log(`/api/asteroids/${today}/${today}`)
      const json = await response.json();
      
      setData(json);
      setLoading(false); // Set loading to false after data is fetched
    };

    fetchData();
  }, []);

  return (
    <>
      <div className='header'>
        <header className="Title">Asteroid Viewer by Franklin</header>
        <input
          className="search-bar"
          type="date"
          placeholder={today}
          onChange={handleSearch}
          value={searchInput}
          onKeyUp={handleKeyPress}
        />
      </div>
      
      {loading ? (
        <p className = "loading">Loading data, please wait...</p> // Render this while loading
      ) : (
        <table>
          <tbody>
            <tr key="table-header">
              <th>Name</th>
              <th>ID</th>
              <th>Diameter (meters)</th>
              <th>Hazardous</th>
              <th>Orbiting Body</th>
              <th>Distance to Earth (km)</th>
              <th>Close Approach Date</th>
            </tr>
            {data.asteroid_info.map((asteroid) => (
              <tr key={asteroid.id}>
                <td>{asteroid.name}</td>
                <td>{asteroid.id}</td>
                <td>{asteroid.diameter}</td>
                <td>{asteroid.hazardous ? 'true' : 'false'}</td>
                <td>{asteroid.orbiting_body}</td>
                <td>{asteroid.distance}</td>
                <td>{asteroid.close_approach}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}

export default App;
