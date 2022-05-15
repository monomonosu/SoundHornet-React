import React from 'react';
import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import MButton from '@mui/material/Button';
import { Link } from "react-router-dom";

type Token = {
  token: string;
}
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <MButton variant="contained">ボタン</MButton>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <nav>
          <Link to="/invoices">Invoices</Link> |{" "}
          <Link to="/expenses">Expenses</Link>
        </nav>
      </header>
    </div>
  );
}

export default App;
