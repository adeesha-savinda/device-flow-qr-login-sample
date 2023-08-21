import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getCurrentAuthResponse, requestAuth } from '../store/features/authResponseSlice';

const LoginButton = () => {
    const authResponse = useSelector(getCurrentAuthResponse);
    const dispatch = useDispatch();

    return (
        <button
            className="hover:bg-slate-300 text-slate-500 font-bold py-2 px-8 rounded mt-4 border-2 border-slate-500"
            onClick={() => dispatch(requestAuth())}>
            {authResponse?.device_code ? 'Refresh' : 'Login'}
        </button>
    )
}

export default LoginButton