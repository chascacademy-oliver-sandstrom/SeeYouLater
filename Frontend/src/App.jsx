import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Register';
import ResultPage from './components/ResultPage'; // Importera ResultPage-komponenten

function App() {
  return (
    <Router>
      <div>
        {/* Ta bort <resultPage/> här */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          {/* Lägg till Route för ResultPage */}
          <Route path="/resultPage" element={<ResultPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


