import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import jwtDecode from 'jwt-decode';

import { getCurrentAuthResponse } from '../store/features/authResponseSlice';
import { getCurrentTokenResponse, getLastIntervalId, getLastTimeoutId, requestToken, setLastIntervalId, setLastTimeoutId } from '../store/features/tokenResponseSlice';

const Token = () => {

    const authResponse = useSelector(getCurrentAuthResponse);
    const tokenResponse = useSelector(getCurrentTokenResponse);
    const lastIntervalId = useSelector(getLastIntervalId);
    const lastTimeoutId = useSelector(getLastTimeoutId);
    const dispatch = useDispatch();

    const [decodedToken, setDecodedToken] = useState({});   // Decoded token is required to display once the user is authenticated

    // Poll for the token while the user gets authenticated by scanning the QR code
    const startPolling = useCallback(() => {
        if (authResponse?.device_code) {
            // if there is a previously created interval, clear it
            if (lastIntervalId) {
                clearInterval(lastIntervalId);
            }
            // if there is a previously created timeout, clear it
            if (lastTimeoutId) {
                clearTimeout(lastTimeoutId);
            }

            // use create interval to poll the token
            const interval = setInterval(
                () => dispatch(requestToken(authResponse)),
                authResponse.interval ? ((authResponse.interval + 0.5) * 1000) : (6000)); // Additional 500ms added as a guard
            const timeout = setTimeout(
                () => clearInterval(interval),
                authResponse.expires_in ? (authResponse.expires_in * 1000) : (10 * 60 * 1000)); // Clear out the interval once reaches expiry time

            dispatch(setLastIntervalId(interval));
            dispatch(setLastTimeoutId(timeout));
        }
    }, [authResponse, lastIntervalId, lastTimeoutId]);

    // Once acess token is obtained, the polling needs to be stopped
    const stopPolling = useCallback(() => {
        if (tokenResponse?.access_token) {
            setDecodedToken(jwtDecode(tokenResponse.access_token)); // Get the access token decoded

            // Once the token is received clear off the interval and timeout as they are no longer needed
            clearInterval(lastIntervalId);
            clearTimeout(lastTimeoutId);
        }
    }, [tokenResponse, lastIntervalId, lastTimeoutId]);

    useEffect(startPolling, [authResponse]);
    useEffect(stopPolling, [tokenResponse]);

    return (
        <div className="text-lg font-semibold">{
            /**
             * Should set the First Name (given name) as the Subject claim to display the name once user is logged in.
             * Find the instructions in the blog or the readme file for instructions setting it in WSO2 IS.
             */
            (decodedToken != {}) ? decodedToken.sub : <></>
        }</div>
    )
}

export default Token;