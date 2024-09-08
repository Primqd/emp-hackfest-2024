import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import './orbit.css'

// function randint(min, max) {
//     return Math.floor(Math.random() * (max - min)) + min;
// }

const Orbit = ({
    data
}) => {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const width = 1600;
    const height = 800;

    const earthRadius = 50;
    const data_asteroids = data.asteroid_info;
    const numAsteroids = data_asteroids.length;

    // Add Earth image to the center
    svg.append('image')
      .attr('xlink:href', 'earth.png') // Earth image URL
      .attr('class', 'earth')
      .attr('x', width / 2 - earthRadius)
      .attr('y', height * 0.8 - earthRadius)
      .attr('width', earthRadius * 2)
      .attr('height', earthRadius * 2);

    // Function to calculate asteroid position based on angle
    const getPosition = (angle, radius) => {
      return {
        x: radius * Math.max(Math.random() * 5, 2) * Math.cos(angle) + width / 2 - earthRadius,
        y: radius * Math.max(Math.random() * 5, 2) * Math.sin(angle) + height * 0.75 - earthRadius,
      };
    };

    const handleClick = (d) => {
        console.log(d);
    }
    
    for(let i = 0; i < numAsteroids; ++i) {
        svg
        .append('image')
        .attr('xlink:href', 'asteroid.png') // asteroid image
        .attr('class', 'asteroid')
        .attr('width', Math.max(20, 10 * Math.log(data_asteroids[i].diameter)))
        .attr('height', Math.max(20, 10 * Math.log(data_asteroids[i].diameter)))
        .on('click', handleClick)
        .attr(
            'x',
            (d, i) => getPosition(-Math.PI * Math.random(), 10 * Math.log(data_asteroids[i].distance)).x - 25
          ) // -25 to center the image
          .attr(
            'y',
            (d, i) => getPosition(-Math.PI * Math.random(), 10 * Math.log(data_asteroids[i].distance)).y - 25
          );
    }

    return () => {
      svg.selectAll('*').remove(); // Cleanup on component unmount
    };
  }, []);

  return <svg ref={svgRef} width={window.innerWidth - 25} height={window.innerHeight - 25}></svg>;
};

export default Orbit;
