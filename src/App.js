import React, { useState, useCallback } from 'react';

import './App.css';
import LoginButton from './components/LoginButton';
import QR from './components/QR';

import { CLIENT_ID, GRANT_TYPE, IDP_TOKEN_URL, POLLING_TIMEOUT } from './config';
import { statuses } from './constants';


const App = () => {

  const [deviceAuthResponse, setDeviceAuthResponse] = useState({});
  const [tokenResponse, setTokenResponse] = useState({});
  const [status, setStatus] = useState(statuses[0]);

  const pollToken = useCallback(() => {
    const interval = setInterval(async () => {

      const timeout = setTimeout(() => clearInterval(interval), POLLING_TIMEOUT * 60 * 1000); // Set timeout for polling. POLLING_TIMEOUT is in minutes 

      const formData = new URLSearchParams();

      formData.append('client_id', CLIENT_ID);
      formData.append('grant_type', GRANT_TYPE);
      formData.append('device_code', deviceAuthResponse.device_code);
      formData.append('scope', 'openid profile');

      const PARAMS = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/json',
        },
        body: formData.toString(),
      };

      try {
        const response = await fetch(IDP_TOKEN_URL, PARAMS);
        const data = await response.json();

        if (data?.access_token) {
          clearInterval(interval);
          clearTimeout(timeout);
          setStatus(statuses[2]);
          setTokenResponse(data.tokenResponse);
        }

        console.log(formData.toString());
        console.log(data);

      } catch (error) {
        console.log(error);
      }
    }, 6000);

  });

  const initLogin = async () => {



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
        <LoginButton />
        <QR/>
      </div>
    </div>
  )
}

export default App
