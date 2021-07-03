import React from 'react';
import Card from '../../components/Card';
import './home.css';

const Home = () => {
  return (
    <div id="home-page">
      <div className="form">
        <select>
          <option>A</option>
          <option>B</option>
          <option>C</option>
          <option>D</option>
          <option>E</option>
        </select>
      </div>

      <div className="card-group">
        <Card 
          imageUrl="http://via.placeholder.com/500" 
          name="Lógica de programação" 
          start_date={new Date()}
          />
        
        <Card 
          imageUrl="http://via.placeholder.com/500" 
          name="Lógica de programação" 
          start_date={new Date()}
          />
          
        <Card 
          imageUrl="http://via.placeholder.com/500" 
          name="Lógica de programação" 
          start_date={new Date()}
          />
          <Card 
            imageUrl="http://via.placeholder.com/500" 
            name="Lógica de programação" 
            start_date={new Date()}
            />
          
          <Card 
            imageUrl="http://via.placeholder.com/500" 
            name="Lógica de programação" 
            start_date={new Date()}
            />
            
          <Card 
            imageUrl="http://via.placeholder.com/500" 
            name="Lógica de programação" 
            start_date={new Date()}
            />
        </div>
    </div>
  );
}

export default Home;