import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GenrePage from './components/GenrePage';
import ArtistDisplayPage from './components/ArtistDisplayPage';
import AIChatPage from './components/AIChatPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GenrePage />} />
        <Route path="/artists/:genre" element={<ArtistDisplayPage />} />
        <Route path="/chat/:artistId" element={<AIChatPage />} />
      </Routes>
    </Router>
  );
}

export default App;
