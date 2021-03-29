import React, { useContext } from 'react';
import './App.css';
import Header  from './components/Header';
import Characters from './components/Characters';
import ThemeContext from './context/ThemeContext';

function App() {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={theme ? 'Dark App': 'App'}>
      <h1>Rick and Morty</h1>
      <Header/>
      <Characters/>
    </div>
  );
}

export default App;
