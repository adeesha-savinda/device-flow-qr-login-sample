import React from 'react';
import './App.css';

import QR from './components/QR';
import Token from './components/Token';

import LoginInstructions from './components/LoginInstructions';
import LoginButton from './components/LoginButton';

const App = () => {

  return (
    // The background
    <div
      className="bg-gradient-to-l to-red-50 from-rose-50
      md:flex md:flex-col md:items-center md:justify-center md:h-screen">

      {/* Main Container */}
      <div
        className="bg-slate-50 flex flex-col items-center justify-center p-6 h-screen 
        md:flex-row md:w-4/5 md:max-w-4xl md:h-2/5 md:shadow-lg md:rounded-md md:pl-10 md:p-10">

        {/* Heading, Content, and button Container */}
        <div
          className="flex flex-col flex-auto justify-start h-1/2
          md:h-full md:pr-5 md:w-4/6">

          <div
            className="flex flex-col flex-non
            max-md:justify-center max-md:items-center max-md:p-5">
            <h1 className="text-4xl font-bold uppercase">
              QR Code
            </h1>
            <h1 className="text-2xl font-bold">
              Login Sample
            </h1>
          </div>
          <div
            className="flex flex-col items-center text-center justify-center flex-1 pt-4 
            md:items-start md:text-start">
            <LoginInstructions />
          </div>
          <div
            className="flex flex-none max-md:justify-center max-md:items-center max-md:mb-8
            max-md:fixed max-md:bottom-0 max-md:left-0 max-md:z-50 max-md:w-full max-md:h-10">
            <LoginButton />
          </div>

        </div>

        <div
          className="flex items-center justify-center h-1/2
          md:p-5 md:w-2/6">
          <QR />
        </div>

      </div>
      <Token />
    </div>
  )
}

export default App;
