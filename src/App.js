import React, {useState, useEffect} from 'react';
import './App.css';

function App() {
  const [data, setData] = useState(null);
  const [searchInput, setSearchInput] = useState("");

  const handleKeyPress = async (e) => {
    if(e.key == 'Enter') {
      const data = await fetch(`/api/asteroids/${searchInput}/${searchInput}`);
      const json = await data.json();

      console.log(searchInput)
      
      setData(json);
    }
  }

  const handleSearch = async (search) => {
    // search.preventDefault();
    setSearchInput(search.target.value);

    console.log(searchInput);

    const data = await fetch(`/api/asteroids/${searchInput}/${searchInput}`);
    const json = await data.json();

    setData(json);
  }

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch('/api/asteroids/2015-9-2/2015-9-2');
      const json = await data.json();

      setData(json);
    }

    fetchData();

    // console.log(data);
    // fetch('/api/asteroids').then(res => res.json()).then(k => {
    //   setData(k);
    // });
  }, [])



  try{ return (
    <>
      <header className = "Title">Franklin's EMP Hackfest 2024 Website</header>
      <input className='search-bar' type='date' placeholder='2015-9-2' onChange={handleSearch} value ={searchInput} onKeyUp={handleKeyPress}></input>
      <table>
        <tbody>
        <tr key = 'table-header'>
          <th>Name</th>
          <th>ID </th>
          <th>Diameter (meters)</th>
          <th>Hazardous </th>
          <th>Orbiting Body </th>
          <th>Distance to Earth (km)</th>
          <th>Close Approach Date</th>
        </tr>
        {
          data.asteroid_info.map((asteroid) => (
            <tr>
              <th key = {asteroid.name}>{asteroid.name}</th>
              <th key = {asteroid.id}>{asteroid.id}</th>
              <th key = {asteroid.diameter}>{asteroid.diameter}</th>
              <th key = {asteroid.hazardous}>{asteroid.hazardous ? "true" : "false"}</th>
              <th key = {asteroid.orbiting_body}>{asteroid.orbiting_body}</th>
              <th key = {asteroid.distance}>{asteroid.distance}</th>
              <th key = {asteroid.close_approach}>{asteroid.close_approach}</th>
            </tr>
          ))
        }
        </tbody>
      </table>
    </>
  );
  } catch(e) {
    console.log(e)
  }
}

export default App;
