import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getCurrentAuthResponse, requestAuth } from '../store/features/authResponseSlice';

const LoginButton = () => {
    const authResponse = useSelector(getCurrentAuthResponse);
    const dispatch = useDispatch();

    return authResponse?.device_code ? (
        <button
            className="bg-slate-500 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded mt-4"
            onClick={() => dispatch(requestAuth())}>
            Logout
        </button>
    ) : (
        <button
            className="bg-slate-500 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded mt-4"
            onClick={() => dispatch(requestAuth())}>
            Login
        </button>
    );

}

export default LoginButton