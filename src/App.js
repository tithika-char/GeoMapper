import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import CurrentLocation from './Components/CurrentLocation';



function App() {
  return (
    <div className="App">
      <Routes>
         
          <Route path="/" element={<CurrentLocation/>} />
        
       </Routes>
       </div>
  );
}

export default App;
