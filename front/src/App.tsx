import React from 'react';
import { useState } from 'react';
import logo from './logo.svg';
import './App.css';

type Token={
  token:string;
}
function App() {
  const [token,setToken]=useState("");
  // setToken(window.token);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        {/* <p> MyToken={window.token}</p> */}
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
