import React from 'react';
import './App.css';

import LoginButton from './components/LoginButton';
import QR from './components/QR';
import Token from './components/Token';

const App = () => {

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 w-full">
      <div className="bg-slate-100 p-10 rounded shadow flex flex-col justify-center text-center">
        <h1 className="text-3xl font-bold">
          QR Code Login Sample
        </h1>
        <p className="text-xl mt-4">
          Click the Button below to initiate Login
        </p>
        <LoginButton />
        <QR />
        <Token/>
      </div>
    </div>
  )
}

export default App
