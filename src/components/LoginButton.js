import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { IDP_DEVICE_AUTH_URL, CLIENT_ID } from '../config';
import { setAuthResponse, getCurrentAuthResponse } from '../store/features/authResponseSlice';

const LoginButton = () => {
    const authResponse = useSelector(getCurrentAuthResponse);
    const dispatch = useDispatch();

    const initLogin = async () => {

        const PARAMS = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Accept: 'application/json',
            },
            body: `client_id=${CLIENT_ID}`,
        };

        try {
            const response = await fetch(IDP_DEVICE_AUTH_URL, PARAMS);
            const data = await response.json();

            if (data?.device_code) {
                dispatch(setAuthResponse(data));
            }

            if (data?.error) {
                //
            }

            console.log(data);

        } catch (error) {
            console.log(error);
        }

    };

    const logout = async () => {
    }

    return authResponse?.device_code ? (
        <button
            className="bg-slate-500 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded mt-4"
            onClick={() => logout()}>
            Logout
        </button>
    ) : (
        <button
            className="bg-slate-500 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded mt-4"
            onClick={() => initLogin()}>
            Login
        </button>
    );

}

export default LoginButton