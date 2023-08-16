import React, { useState } from 'react';
import './App.css';

import QRCode from 'react-qr-code';
import { IDP_BASE_URL, IDP_DEVICE_AUTH_EP, CLIENT_ID } from './config';

const App = () => {

  const [response, setResponse] = useState(null);

  const initLogin = async () => {

    const URL = `${IDP_BASE_URL}${IDP_DEVICE_AUTH_EP}`;
    const PARAMS = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      },
      body: `client_id=${CLIENT_ID}&scope=openid`,
    };

    const response = await fetch(URL,PARAMS);
    const data = await response.json();
    setResponse(data);

  };

return (
  <div className="flex flex-col items-center justify-center min-h-screen py-2 w-full">
    <div className="bg-slate-100 p-10 rounded shadow flex flex-col justify-center text-center">
      <h1 className="text-3xl font-bold">
        QR Code Login Sample
      </h1>
      <p className="text-xl mt-4">
        Click the Button below to initiate Login
      </p>
      <button
        className="bg-slate-500 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded mt-4"
        onClick={initLogin}>Login</button>
      {
        response?.verification_uri_complete ? (
          <div className="p-10"><QRCode value={response.verification_uri_complete} /></div>
        ) : <></>
      }

    </div>
  </div>
)
}

export default App
