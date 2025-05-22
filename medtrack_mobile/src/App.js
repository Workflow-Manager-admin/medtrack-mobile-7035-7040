import React from 'react';
import './App.css';
import MedTrackContainer from './components/container/MedTrackContainer';

function App() {
  return (
    <div className="app">
      <nav className="navbar">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <div className="logo">
              <span className="logo-symbol">💊</span> MedTrack
            </div>
          </div>
        </div>
      </nav>

      <main>
        <MedTrackContainer />
      </main>
    </div>
  );
}

export default App;