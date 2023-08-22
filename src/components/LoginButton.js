import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getCurrentAuthResponse, requestAuth, resetAuthResponse } from '../store/features/authResponseSlice';
import { getCurrentTokenResponse, resetTokenResponse } from '../store/features/tokenResponseSlice';

const LoginButton = () => {
    const authResponse = useSelector(getCurrentAuthResponse);
    const tokenResponse = useSelector(getCurrentTokenResponse);

    const dispatch = useDispatch();

    const reset = () => {
        dispatch(resetAuthResponse());
        dispatch(resetTokenResponse());
    }

    return (
        <div>
            {
                tokenResponse?.access_token ? (
                    <button
                        className="bg-gradient-to-r from-rose-400 to-red-500 text-white font-semibold py-2 px-8 rounded shadow-md"
                        onClick={() => reset()}>
                        Reset
                    </button>
                ) : (

                    <button
                        className="bg-gradient-to-r from-rose-400 to-red-500 text-white font-semibold py-2 px-8 rounded shadow-md"
                        onClick={() => dispatch(requestAuth())}>
                        {authResponse?.device_code ? 'Renew' : 'Login'}
                    </button>
                )
            }

        </div>
    )
}

export default LoginButton