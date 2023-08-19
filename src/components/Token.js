import React, { useCallback, useEffect } from 'react';
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

    const startPolling = useCallback(() => {
        if (authResponse?.device_code) {
            if (lastIntervalId) {
                clearInterval(lastIntervalId);
            }
            if (lastTimeoutId) {
                clearTimeout(lastTimeoutId);
            }
            const interval = setInterval(() => dispatch(requestToken(authResponse)), authResponse.interval ? authResponse.interval * 1000 + 100 : 5000);
            console.log(`interval: ${authResponse.interval}  expires: ${authResponse.expires_in}`)
            const timeout = setTimeout(() => clearInterval(interval), authResponse.expires_in ? authResponse.expires_in * 1000 : 10 * 60 * 1000);

            dispatch(setLastIntervalId(interval));
            dispatch(setLastTimeoutId(timeout));
        }
    }, [authResponse, lastIntervalId, lastTimeoutId]);

    const stopPolling = useCallback(() => {
        console.log('Stop Polling!');
        if (tokenResponse?.access_token) {
            console.log('received access token!');
            clearInterval(lastIntervalId);
            clearTimeout(lastTimeoutId);
        }
    }, [tokenResponse, lastIntervalId, lastTimeoutId]);

    useEffect(startPolling, [authResponse]);
    useEffect(stopPolling, [tokenResponse]);

    return (
        <div>{
            tokenResponse?.access_token ? toString(jwtDecode(tokenResponse?.access_token)) : <></>
        }</div>
    )
}

export default Token;