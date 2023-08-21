import React from 'react';
import './App.css';

import QR from './components/QR';

import LoginInstructions from './components/LoginInstructions';

const App = () => {

  return (
    <div className="bg-slate-200 flex flex-col p-10 rounded shadow items-center justify-center min-h-screen py-2 w-full">
      <div className="bg-slate-50 flex-col p-10 rounded shadow-lg w-[64rem] h-96">
        <h1 className="flex flex-col text-3xl font-bold text-slate-700">
          QR Code Login Sample
        </h1>
        <div className="flex">
          <div className="w-3/5">
            <LoginInstructions />
          </div>
          <div className="w-2/5">
            <QR />
          </div>
        </div>
      </div >
    </div >
  )
}

export default App;
