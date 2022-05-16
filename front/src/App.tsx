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
      <MButton variant="contained">ボタン</MButton>
      <nav>
        <Link to="/invoices">Invoices</Link> |{" "}
        <Link to="/expenses">Expenses</Link>
      </nav>
    </div>
  );
}

export default App;
